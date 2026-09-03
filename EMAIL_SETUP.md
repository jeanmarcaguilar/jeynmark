# Contact Form Email Setup

Your portfolio contact form is now ready to send emails! Here's how to configure it:

## Step 1: Configure Gmail SMTP (Recommended)

1. **Enable 2-Step Verification** on your Google Account:
   - Go to https://myaccount.google.com/signinoptions/two-step-verification
   - Follow the prompts to enable 2FA

2. **Generate an App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "Portfolio Contact"
   - Click "Generate"
   - Copy the 16-character password (it will look like: `xxxx xxxx xxxx xxxx`)

3. **Update your `.env` file**:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=xxxx_xxxx_xxxx_xxxx  # Your app password (no spaces)
   EMAIL_TO=your_destination_email@gmail.com  # Where to receive messages
   ```

## Step 2: Test the Contact Form

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Contact section on your portfolio

3. Fill out the form with test information and submit

4. Check your email (the one set in `EMAIL_TO`) for the message

## Alternative Email Services

If you prefer not to use Gmail, you can use other SMTP services:

### Outlook/Hotmail
```env
EMAIL_SERVICE=hotmail
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_app_password
EMAIL_TO=your_destination_email@email.com
```

### Custom SMTP
```env
EMAIL_SERVICE=smtp  # Use 'smtp' for custom servers
EMAIL_HOST=smtp.your-provider.com
EMAIL_PORT=587
EMAIL_SECURE=true
EMAIL_USER=your_username
EMAIL_PASS=your_password
EMAIL_TO=your_destination_email@email.com
```

## Troubleshooting

**Issue**: "Email service not configured"
- **Solution**: Make sure you've added the EMAIL_USER and EMAIL_PASS to your `.env` file

**Issue**: "Failed to send email"
- **Solution**: 
  - Check that your app password is correct (no spaces)
  - Ensure 2-step verification is enabled on your Google account
  - Try regenerating the app password

**Issue**: Emails not arriving
- **Solution**: 
  - Check your spam folder
  - Verify the EMAIL_TO address is correct
  - Check your email provider's delivery logs

## Security Notes

- Never commit your `.env` file to version control
- The `.env.example` file shows the required format but contains placeholder values
- App passwords are more secure than using your regular password
- Consider using a dedicated email address for portfolio contacts

## Production Deployment

When deploying to Vercel or other platforms:

1. Add the same environment variables in your deployment platform's settings
2. Make sure to include all EMAIL_* variables
3. The API endpoint `/api/send-email` will work automatically in production

The contact form is now fully functional and will send beautifully formatted emails directly to your inbox!