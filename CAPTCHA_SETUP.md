# Google reCAPTCHA Setup Instructions

## Overview
Google reCAPTCHA has been added to the signup form to prevent bot registrations and enhance security.

## Installation

1. Install the required package:
```bash
npm install react-google-recaptcha
```

## Getting Your reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click on the **+** button to register a new site
3. Fill in the form:
   - **Label**: Your application name (e.g., "My App Signup")
   - **reCAPTCHA type**: Select **reCAPTCHA v2** → "I'm not a robot" Checkbox
   - **Domains**: Add your domains:
     - For development: `localhost`
     - For production: your actual domain (e.g., `yourapp.com`)
   - Accept the reCAPTCHA Terms of Service
4. Click **Submit**
5. You'll receive two keys:
   - **Site Key** (for frontend)
   - **Secret Key** (for backend)

## Environment Variables Setup

Add the following environment variables to your `.env` or `.env.local` file:

```env
# Google reCAPTCHA Keys
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

**Important Notes:**
- The `NEXT_PUBLIC_` prefix is required for the site key to be accessible in the browser
- The secret key should NOT have the `NEXT_PUBLIC_` prefix (it's only used server-side)
- Never commit your `.env` file to version control
- Keep your secret key confidential

## Testing

### Development Testing
- During development, you can test with localhost
- The reCAPTCHA will work on `localhost` or `127.0.0.1`

### Production Testing
- Make sure to add your production domain in the reCAPTCHA admin console
- Test the signup flow thoroughly before going live

## Features Implemented

1. **Frontend Validation**: CAPTCHA must be completed before form submission
2. **Backend Verification**: Server-side verification of CAPTCHA token with Google's API
3. **Error Handling**: Clear error messages if CAPTCHA verification fails
4. **Auto-Reset**: CAPTCHA resets automatically on form submission errors
5. **User Experience**: Centered CAPTCHA widget with clean styling

## Troubleshooting

### "Please complete the CAPTCHA verification" error
- This appears when trying to submit the form without completing the CAPTCHA
- Simply check the "I'm not a robot" box before submitting

### "CAPTCHA verification failed" error
- Check that your environment variables are correctly set
- Verify that your domain is registered in the reCAPTCHA admin console
- Check the browser console and server logs for detailed error messages

### CAPTCHA not showing
- Verify that `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set correctly
- Check that `react-google-recaptcha` package is installed
- Make sure there are no ad blockers or privacy extensions blocking Google scripts

## Files Modified

1. **src/app/signup/signup.js** - Added reCAPTCHA component and validation logic
2. **src/app/signup/signup.module.css** - Added styling for CAPTCHA container
3. **src/app/actions/signup.js** - Added server-side CAPTCHA verification
4. **package.json** - Added `react-google-recaptcha` dependency

## Security Considerations

- The secret key is only used on the server side and never exposed to the client
- CAPTCHA tokens are single-use and expire after a short time
- Failed verification attempts are logged for monitoring
- The implementation follows Google's best practices for reCAPTCHA v2

## Support

For more information, visit:
- [reCAPTCHA Documentation](https://developers.google.com/recaptcha/docs/display)
- [react-google-recaptcha GitHub](https://github.com/dozoisch/react-google-recaptcha)

