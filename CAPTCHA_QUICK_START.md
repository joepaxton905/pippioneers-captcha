# reCAPTCHA Quick Start Guide

## Quick Setup (3 Steps)

### 1. Install Package
```bash
npm install react-google-recaptcha
```

### 2. Get Your Keys
Visit: https://www.google.com/recaptcha/admin
- Choose **reCAPTCHA v2** (checkbox)
- Add domains: `localhost` (for dev) and your production domain
- Copy both keys (Site Key and Secret Key)

### 3. Add Environment Variables
Add to your `.env` or `.env.local` file:
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

**Done!** The CAPTCHA is now active on your signup form.

## What Was Changed

✅ **Frontend** (`src/app/signup/signup.js`)
- Added reCAPTCHA component above the submit button
- Added validation to ensure CAPTCHA is completed
- Auto-resets CAPTCHA on form errors

✅ **Backend** (`src/app/actions/signup.js`)
- Added server-side verification with Google's API
- Validates CAPTCHA token before user registration

✅ **Styling** (`src/app/signup/signup.module.css`)
- Centered CAPTCHA widget with clean styling

## Test It

1. Start your development server: `npm run dev`
2. Go to the signup page
3. Fill out the form
4. Check the "I'm not a robot" box
5. Submit the form

If CAPTCHA isn't completed, you'll see: "Please complete the CAPTCHA verification"

## Need Help?

See `CAPTCHA_SETUP.md` for detailed documentation and troubleshooting.

