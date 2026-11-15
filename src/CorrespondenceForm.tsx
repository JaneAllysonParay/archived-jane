import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

type ContactField = 'name' | 'email' | 'topic' | 'message';
type FieldErrors = Partial<Record<ContactField, string>>;
type SubmissionStatus = 'idle' | 'sending' | 'success' | 'failure';

type FormspreeError = {
  field?: string;
  message?: string;
};

type FormspreeErrorResponse = {
  errors?: FormspreeError[];
  error?: string;
};

const maxNameLength = 100;
const maxMessageLength = 5000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;

function validateContactForm(form: HTMLFormElement): FieldErrors {
  const values = new FormData(form);
  const errors: FieldErrors = {};
  const name = String(values.get('name') ?? '').trim();
  const email = String(values.get('email') ?? '').trim();
  const message = String(values.get('message') ?? '').trim();
  const emailField = form.elements.namedItem('email');
  const emailHasTypeMismatch = emailField instanceof HTMLInputElement && emailField.validity.typeMismatch;

  if (name.length > maxNameLength) {
    errors.name = `Keep your name to ${maxNameLength} characters or fewer.`;
  }

  if (!email) {
    errors.email = 'Enter your email address so I can reply.';
  } else if (emailHasTypeMismatch || !emailPattern.test(email)) {
    errors.email = 'Enter an email address in a valid format.';
  } else if (email.length > 254) {
    errors.email = 'Email addresses must be 254 characters or fewer.';
  }

  if (!message) {
    errors.message = 'Write a message before sending your note.';
  } else if (message.length > maxMessageLength) {
    errors.message = `Keep your message to ${maxMessageLength} characters or fewer.`;
  }

  return errors;
}

function readFormspreeErrors(payload: unknown): { fieldErrors: FieldErrors; message: string } {
  if (!payload || typeof payload !== 'object') {
    return { fieldErrors: {}, message: '' };
  }

  const response = payload as FormspreeErrorResponse;
  const fieldErrors: FieldErrors = {};
  let message = typeof response.error === 'string' ? response.error : '';

  if (Array.isArray(response.errors)) {
    for (const error of response.errors) {
      if (typeof error.message !== 'string' || !error.message) continue;

      if (error.field === 'name' || error.field === 'email' || error.field === 'topic' || error.field === 'message') {
        fieldErrors[error.field] = fieldErrors[error.field]
          ? `${fieldErrors[error.field]} ${error.message}`
          : error.message;
      } else if (!message) {
        message = error.message;
      }
    }
  }

  return { fieldErrors, message };
}

export default function CorrespondenceForm({ endpoint }: { endpoint: string }) {
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [providerFieldErrors, setProviderFieldErrors] = useState<FieldErrors>({});
  const [validationSummary, setValidationSummary] = useState('');
  const [submissionError, setSubmissionError] = useState('');

  function clearFieldError(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const field = event.currentTarget.name as ContactField;
    setClientErrors((previous) => {
      if (!previous[field]) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
    setProviderFieldErrors((previous) => {
      if (!previous[field]) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
    setValidationSummary('');

    if (status === 'failure') {
      setStatus('idle');
      setSubmissionError('');
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;

    const form = event.currentTarget;
    const errors = validateContactForm(form);
    const invalidFields = Object.keys(errors) as ContactField[];

    setProviderFieldErrors({});
    setSubmissionError('');

    if (invalidFields.length > 0) {
      setClientErrors(errors);
      setValidationSummary(`Please correct ${invalidFields.length === 1 ? 'the highlighted field' : 'the highlighted fields'} before sending your note.`);
      setStatus('idle');
      form.querySelector<HTMLElement>(`[name="${invalidFields[0]}"]`)?.focus();
      return;
    }

    setClientErrors({});
    setValidationSummary('');
    setStatus('sending');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.status === 429) {
        setSubmissionError('Formspree is receiving requests too quickly. Please wait a little while, then try again.');
        setStatus('failure');
        return;
      }

      let payload: unknown = null;
      try {
        payload = await response.json();
      } catch {
        // Some provider or network errors do not include a JSON response body.
      }

      if (!response.ok) {
        const providerErrors = readFormspreeErrors(payload);
        setProviderFieldErrors(providerErrors.fieldErrors);
        setSubmissionError(providerErrors.message || 'Formspree could not accept your note. Please check the fields and try again.');
        setStatus('failure');
        return;
      }

      form.reset();
      setStatus('success');
    } catch {
      setSubmissionError('The note could not reach Formspree. Check your connection and try again. Your message is still here.');
      setStatus('failure');
    }
  }

  if (status === 'success') {
    return (
      <div className="submission-confirmation" role="status" aria-live="polite" aria-atomic="true">
        <h3>Thank you for writing</h3>
        <p>Formspree confirmed that your note was submitted successfully.</p>
      </div>
    );
  }

  function fieldError(field: ContactField) {
    return clientErrors[field] ?? providerFieldErrors[field];
  }

  return (
    <div className="correspondence-card">
      <form className="correspondence-form" onSubmit={handleSubmit} noValidate>
        {validationSummary && <p className="form-feedback form-feedback-error" role="alert">{validationSummary}</p>}
        {status === 'sending' && <p className="form-feedback form-feedback-sending" role="status" aria-live="polite">Sending your note…</p>}
        {status === 'failure' && <p className="form-feedback form-feedback-error" role="alert">{submissionError}</p>}

        <fieldset className="correspondence-fields" disabled={status === 'sending'}>
          <legend className="visually-hidden">Your note</legend>
          <div className="correspondence-field">
            <label htmlFor="correspondence-name">Name <span>(optional)</span></label>
            <input
              id="correspondence-name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={maxNameLength}
              aria-invalid={fieldError('name') ? 'true' : undefined}
              aria-describedby={fieldError('name') ? 'correspondence-name-hint correspondence-name-error' : 'correspondence-name-hint'}
              onChange={clearFieldError}
            />
            <p className="field-hint" id="correspondence-name-hint">A name is optional; include one if you’d like me to address you by it.</p>
            {fieldError('name') && <p className="form-field-error" id="correspondence-name-error">{fieldError('name')}</p>}
          </div>

          <div className="correspondence-field">
            <label htmlFor="correspondence-email">Email address <span>(required)</span></label>
            <input
              id="correspondence-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              aria-invalid={fieldError('email') ? 'true' : undefined}
              aria-describedby={fieldError('email') ? 'correspondence-email-hint correspondence-email-error' : 'correspondence-email-hint'}
              onChange={clearFieldError}
            />
            <p className="field-hint" id="correspondence-email-hint">Used as the reply-to address so I can respond.</p>
            {fieldError('email') && <p className="form-field-error" id="correspondence-email-error">{fieldError('email')}</p>}
          </div>

          <div className="correspondence-field">
            <label htmlFor="correspondence-topic">Topic <span>(optional)</span></label>
            <select
              id="correspondence-topic"
              name="topic"
              aria-invalid={fieldError('topic') ? 'true' : undefined}
              aria-describedby={fieldError('topic') ? 'correspondence-topic-error' : undefined}
              onChange={clearFieldError}
            >
              <option value="">Choose a topic (optional)</option>
              <option value="Just saying hello">Just saying hello</option>
              <option value="Internship or career opportunity">Internship or career opportunity</option>
              <option value="Project feedback">Project feedback</option>
              <option value="Question">Question</option>
              <option value="Other">Other</option>
            </select>
            {fieldError('topic') && <p className="form-field-error" id="correspondence-topic-error">{fieldError('topic')}</p>}
          </div>

          <div className="correspondence-field">
            <label htmlFor="correspondence-message">Message <span>(required)</span></label>
            <textarea
              id="correspondence-message"
              name="message"
              required
              maxLength={maxMessageLength}
              aria-invalid={fieldError('message') ? 'true' : undefined}
              aria-describedby={fieldError('message') ? 'correspondence-message-hint correspondence-message-error' : 'correspondence-message-hint'}
              onChange={clearFieldError}
            />
            <p className="field-hint" id="correspondence-message-hint">Up to {maxMessageLength.toLocaleString()} characters.</p>
            {fieldError('message') && <p className="form-field-error" id="correspondence-message-error">{fieldError('message')}</p>}
          </div>
        </fieldset>

        <div className="honeypot-field" aria-hidden="true">
          <label htmlFor="correspondence-gotcha">Leave this field empty</label>
          <input id="correspondence-gotcha" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </div>

        <button className="correspondence-submit" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : status === 'failure' ? 'Try again' : 'Send note'}
        </button>
        <p className="privacy-note">Formspree processes the information you submit and forwards it to my inbox. Messages are not displayed on this site. Please avoid including sensitive personal information.</p>
      </form>
    </div>
  );
}
