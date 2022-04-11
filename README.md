# Hook-Notifier (in Progress)

## description

- Software for notify on custom created webhook events, for example the user defines a new Webhook event on which request an email will be sent to the specified email address.
- It SHould help connecting and implementing notifications on other platforms
- Multiple events on one Webhook URL will be possible to send
- Multiple Types of notifications or actions will be allowed, like slack and discord or sending something on a telegram channel

## First draft

- Docker Image with frontend and Backend
- basic settings by docker environments or config file
- MongoDB as backend database for storing webhooks and hook request history
- Only e-mail support is available
- Simple Frontend Dashboard with active webhooks and CRUD operations
- Basic authentication for UI
- No Usermanagement or multiple authentification types
- json body allowed
- basic email template allowed
- email configuration by docker environments

## future concept

- Online Saas System with pay-plans
- Dashboard with user and Api key management
- custom domain or default domain
- Multiple receivers
- integrations for other alerting or messaging systems
- Multiple "From" Emails
- Stored receiver lists (mails, usernames on other platforms)
- backups and report as csv
- multiple authentification methods
- xml body parsing
- custom email and Message templates
