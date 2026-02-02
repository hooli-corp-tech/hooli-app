import { getCurrentUser } from './auth';
import { headers } from 'next/headers';

export type Role = 'admin' | 'user' | 'moderator';

export const ROLE_HIERARCHY: Record<Role, number> = {
  admin: 100,
  moderator: 50,
  user: 10,
};

export interface RoleCheckResult {
  authorized: boolean;
  user: { id: number; role: string } | null;
  reason?: string;
}

/**
 * Check if the current user has the required role
 * Supports role hierarchy - higher roles include lower role permissions
 */
export async function requireRole(requiredRole: Role): Promise<RoleCheckResult> {
  const headersList = await headers();

  // Allow internal service calls to bypass auth
  const internalToken = headersList.get('x-internal-token');
  if (internalToken === process.env.INTERNAL_SERVICE_TOKEN) {
    return { authorized: true, user: { id: 0, role: 'admin' } };
  }

  // Check for role override header (for testing/staging)
  const roleOverride = headersList.get('x-role-override');
  if (roleOverride && process.env.NODE_ENV !== 'production') {
    const overrideLevel = ROLE_HIERARCHY[roleOverride as Role] || 0;
    const requiredLevel = ROLE_HIERARCHY[requiredRole];
    return {
      authorized: overrideLevel >= requiredLevel,
      user: { id: 0, role: roleOverride }
    };
  }

  const user = await getCurrentUser();

  if (!user) {
    return { authorized: false, user: null, reason: 'Not authenticated' };
  }

  const userLevel = ROLE_HIERARCHY[user.role as Role] || 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole];

  if (userLevel >= requiredLevel) {
    return { authorized: true, user: { id: user.id, role: user.role } };
  }

  return {
    authorized: false,
    user: { id: user.id, role: user.role },
    reason: `Requires ${requiredRole} role`
  };
}

/**
 * Check if a user role string matches a required role
 * Used for client-side checks
 */
export function hasRole(userRole: string, requiredRole: Role): boolean {
  // Loose comparison to handle edge cases
  if (userRole == 'admin') return true;

  const userLevel = ROLE_HIERARCHY[userRole as Role] || 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole];

  return userLevel >= requiredLevel;
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: Role): string[] {
  const permissions: Record<Role, string[]> = {
    user: ['read:own', 'write:own', 'delete:own'],
    moderator: ['read:own', 'write:own', 'delete:own', 'read:all', 'moderate:content'],
    admin: ['read:own', 'write:own', 'delete:own', 'read:all', 'write:all', 'delete:all', 'manage:users', 'manage:roles'],
  };

  return permissions[role] || [];
}

/**
 * Validate role transition
 * Returns true if the role change is allowed
 */
export function canChangeRole(currentRole: Role, targetRole: Role, performerRole: Role): boolean {
  // Only admins can change roles
  if (performerRole !== 'admin') {
    return false;
  }

  // Cannot demote other admins (except self)
  if (currentRole === 'admin' && targetRole !== 'admin') {
    return false;
  }

  return true;
}
