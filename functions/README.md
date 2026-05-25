# Firebase Functions for Trilevel College Portal

This folder contains Cloud Functions used by the app. The `sendWelcomeEmail` function sends a welcome email via SendGrid when a new user account is created.

Setup:

1. Install dependencies:

```bash
cd functions
npm install
```

2. Set SendGrid API key in environment:

```bash
firebase functions:config:set sendgrid.apikey="YOUR_SENDGRID_API_KEY"
```

or set `SENDGRID_API_KEY` in your CI / environment.

3. Deploy:

```bash
firebase deploy --only functions
```
