# Formspree setup for Jane’s Archive

The Contact page shows the Correspondence Corner form only when `VITE_FORMSPREE_FORM_ID` is set. Until then, visitors see Jane’s existing verified email, LinkedIn, and GitHub links.

## Connect the form to an inbox

1. Create a Formspree account and a new form for Jane’s Archive.
2. In the form’s workflow/settings, add or confirm an email notification action to the inbox where Jane wants to receive notes. Verify that inbox with Formspree.
3. Copy the form ID from Formspree’s Integration page. The ID is a public form identifier; do not use an account API key or any secret in the website.
4. For local development, copy `.env.example` to `.env.local` and set `VITE_FORMSPREE_FORM_ID` to the Formspree ID. Restart Vite after changing it. `.env.local` is git-ignored.
5. For a Vercel build, add the same `VITE_FORMSPREE_FORM_ID` value in the project’s Environment Variables for the environments you use, then rebuild. No email-service secrets are needed in the frontend.
6. Keep the Formspree email notification action enabled. The form’s required field is named `email`, which Formspree uses as the Reply-To address for notification emails, so Jane can reply to the sender.

If the ID is blank, the site deliberately does not render an active form. The Contact page shows the verified contact links instead.

## Spam protection and privacy settings

- The form includes Formspree’s `_gotcha` honeypot field. Leave Formspree’s automatic spam filtering on, check the Spam folder periodically, and mark missed spam submissions so Formspree can learn from them. The honeypot is supported on all plans and submissions that fill it are silently ignored ([Formspree honeypot documentation](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering); [spam prevention guidance](https://help.formspree.io/articles/troubleshooting/how-to-prevent-spam/)).
- Once the production hostname is known, set **Restrict to Domain** to the portfolio’s domain, without `https://` or a path. If the site is reachable with and without `www`, use the bare domain. Formspree recommends domain restriction with its spam filtering and honeypot ([domain restriction](https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain)). This setting depends on the browser sending a referrer, so keep the site’s referrer policy at `strict-origin-when-cross-origin` or less strict.
- The current form sends JSON AJAX requests and does not include a CAPTCHA widget or response token. Keep CAPTCHA challenges disabled for this integration unless you add the matching client-side widget and send its response token with the form. Formspree documents that custom CAPTCHA integrations need a token in the AJAX request ([CAPTCHA setup](https://help.formspree.io/articles/form-and-project-settings/recaptcha-settings); [AJAX submissions](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax)). Do not add provider secret keys to this frontend.
- The form’s privacy note tells visitors that Formspree processes the submitted details and forwards them to Jane’s inbox. Do not describe the form as anonymous or end-to-end encrypted. Avoid asking visitors to send sensitive personal information.

## Test after configuration

Submit one real test note from the production site, confirm it appears in the Formspree submissions inbox and arrives at the configured email inbox, and reply to it to verify the Reply-To field. No actual delivery is verified until this manual check is completed. Do not load-test the Formspree endpoint; for UI-only tests, mock the request rather than sending repeated submissions to the provider.
