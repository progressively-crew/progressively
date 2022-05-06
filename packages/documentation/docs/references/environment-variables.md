# Environment variables

In order to customize the service to your needs, you can adjust environments variables. In the repository, there are `.env.example` file that can modify and rename `.env` in order to modify their values.

## Backend

On the backend, you can customize the following ones:

```bash
# the postgres database string
DATABASE_URL=postgresql://admin:admin@localhost:5432/progressively

# the redis database string
REDIS_URL=redis://localhost:6379

# the secret necessary to generate JWT tokens for authentication
ACCESS_TOKEN_SECRET=abcd

# the secret necessary to re-generate JWT tokens for authentication (refresh tokens)
REFRESH_TOKEN_SECRET=efgh

# the number of seconds before an access token expires (default to one day)
REFRESH_TOKEN_EXPIRES=84600

# the SMTP server host for sending email for account creating, add members etc...
SMTP_HOST=smtp.ethereal.email

# the SMTP server port
SMTP_PORT=587

# is the SMTP server secured?
SMTP_SECURE=

# the SMTP user email
SMTP_USER=

# the SMTP user password
SMTP_PASSWORD=

# the frontend URL for redirection
FRONTEND_URL=http://localhost:3000

# the backend URL for redirection (used inside the email, might change in the future)
BACKEND_URL=http://localhost:4000

# the socket heartbeat timeout
SOCKET_TIMEOUT=10000

# Do you allow people to create account from the registration page? Even when false, you can add people through the "Add member" feature
ALLOW_REGISTRATION=true
```

## Frontend

On the frontend, you can customize the following ones:

```bash
# the backend API url
BACKEND_URL="http://localhost:4000"

# the secret key to generate the session token for Remix
SESSION_SECRET="abcd"

# Do you allow people to create account from the registration page? Even when false, you can add people through the "Add member" feature
ALLOW_REGISTRATION=true
```
