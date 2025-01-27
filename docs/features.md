# Feature: User Authentication

## User Stories
1. As a user, I can sign up with email/password
   - Must validate email format
   - Password requires 8+ chars, 1 number, 1 special char
   - Send verification email

2. As a user, I can login with email/password
   - Lock account after 5 failed attempts
   - Support "Remember me" option
   - Show last login timestamp

## Implementation Notes

### Authentication Flow
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as Auth API
    participant DB as Database
    participant E as Email Service

    U->>F: Enter credentials
    F->>A: POST /auth/login
    A->>DB: Check credentials

    alt Valid credentials
        DB-->>A: User found
        A->>DB: Create session
        A-->>F: Return JWT
        F-->>U: Redirect to dashboard
    else Invalid credentials
        DB-->>A: No match
        A-->>F: Auth error
        F-->>U: Show error message
    end


### Technical Implementation

#### Database Schema
- Users table
  - id: uuid PRIMARY KEY
  - email: varchar(255) UNIQUE
  - password_hash: varchar(255)
  - failed_attempts: int
  - last_login: timestamp
  - created_at: timestamp

#### API Endpoints
POST /auth/signup
- Input: { email, password }
- Output: { user_id, token }
- Error cases:
  - 409: Email exists
  - 400: Invalid password

POST /auth/login
- Input: { email, password, remember_me? }
- Output: { token, expires_at }
- Error cases:
  - 401: Invalid credentials
  - 403: Account locked

### Security Considerations
- Store passwords using bcrypt (cost factor 12)
- JWT expires in 24h (or 30d with remember_me)
- Rate limit login attempts by IP

### Tasks & Status
- [x] Basic email/password authentication
- [ ] Email verification flow
- [ ] Password reset functionality
- [ ] Remember me feature
- [ ] Rate limiting implementation

### Testing Notes
- Test cases for email validation
- Test password strength requirements
- Test account locking after failed attempts
