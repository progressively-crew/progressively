# Customization

Progressively is self-hosted. In order to match your specific customization needs, you can override the following environment variables.

## Frontend (dashboard)

You can modify these values at the [root of the frontend (dashboard) project](https://github.com/progressively-crew/progressively/tree/master/packages/frontend) (`./packages/frontend/.env`).

```sh
# The backend API URL
BACKEND_URL=http://localhost:4000

# The secret key to generate the session token for Remix
SESSION_SECRET=abcd

# Do you allow people to create accounts from the registration page? Even when false, you can add people through the "Add member" feature
ALLOW_REGISTRATION=true

# If you want to connect to Progressively using your Okta instance, fill this environment variable and a button will appear on the signin page.
OKTA_ISSUER="YOUR_OKTA_ISSUER"
OKTA_CLIENT_ID="YOUR_OKTA_CLIENT_ID"
```

## Backend

You can modify these values at the [root of the backend project](https://github.com/progressively-crew/progressively/tree/master/packages/backend) (`./packages/backend/.env`).

```sh
# The Postgres database string
DATABASE_URL=postgresql://admin:admin@localhost:5432/progressively

# The Redis database string
REDIS_URL=redis://localhost:6379

# The secret necessary to generate JWT tokens for authentication
ACCESS_TOKEN_SECRET=abcd

# The secret necessary to re-generate JWT tokens for authentication (refresh tokens)
REFRESH_TOKEN_SECRET=efgh

# The number of seconds before an access token expires (default to one day)
REFRESH_TOKEN_EXPIRES=84600

# The SMTP server host for sending email for account creation, adding members, etc...
SMTP_HOST=smtp.ethereal.email

# The SMTP server port
SMTP_PORT=587

# The SMTP user email
SMTP_USER=

# The SMTP user password
SMTP_PASSWORD=

# The frontend URL for redirection (registration by email for example)
FRONTEND_URL=http://localhost:3000

# The backend URL for redirection (used inside the email, might change in the future)
BACKEND_URL=http://localhost:4000

# The socket heartbeat timeout
SOCKET_TIMEOUT=10000

# Do you allow people to create account from the registration page? Even when false, you can add people through the "Add member" feature
ALLOW_REGISTRATION=true

# Throttling TTL in Nestjs
THROTTLING_TTL=60

# Throttling Limit in Nestjs
THROTTLING_LIMIT=10000

# Fill these two in addition to the one set in the frontend to activate Okta authentication in Progressively
OKTA_ISSUER="YOUR_OKTA_ISSUER"
OKTA_CLIENT_ID="YOUR_OKTA_CLIENT_ID"
```
