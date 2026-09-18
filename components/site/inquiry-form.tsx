'use client'

import { useActionState } from 'react'
import { submitInquiry, type InquiryFormState } from '@/app/actions/inquiry'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Mail, MessageCircle, Send } from 'lucide-react'
import { WHATSAPP_URL } from '@/components/site/nav-links'

const initialState: InquiryFormState = { ok: false, message: '' }

export function InquiryForm({
  propertyName,
  compact = false,
}: {
  propertyName?: string
  compact?: boolean
}) {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState)

  if (state.ok) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-primary/15 bg-secondary/60 px-6 py-12 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MessageCircle className="size-6" aria-hidden="true" />
        </span>
        <div className="space-y-1.5">
          <h3 className="font-serif text-2xl text-foreground">Contact Aloha Travels</h3>
          <p className="mx-auto max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
            {state.message}
          </p>
        </div>
        <div className="mt-2 flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            size="pill"
            variant="ocean"
            render={<a href="mailto:travels@alohamaldives.com" />}
          >
            <Mail className="size-4" data-icon="inline-start" aria-hidden="true" />
            Email us
          </Button>
          <Button
            size="pill"
            variant="ocean-outline"
            render={<a href={WHATSAPP_URL} target="_blank" rel="noreferrer" />}
          >
            <MessageCircle className="size-4" data-icon="inline-start" aria-hidden="true" />
            WhatsApp us
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-5">
      {propertyName ? (
        <input type="hidden" name="property" value={propertyName} />
      ) : null}

      <div className={compact ? 'space-y-5' : 'grid gap-5 sm:grid-cols-2'}>
        <Field label="Full name" htmlFor="name" error={state.errors?.name}>
          <Input
            id="name"
            name="name"
            placeholder="Jane Traveller"
            autoComplete="name"
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={state.errors?.name ? 'name-error' : undefined}
          />
        </Field>
        <Field
          label="Email or phone"
          htmlFor="contact"
          error={state.errors?.contact}
        >
          <Input
            id="contact"
            name="contact"
            placeholder="jane@email.com"
            autoComplete="email"
            aria-invalid={Boolean(state.errors?.contact)}
            aria-describedby={state.errors?.contact ? 'contact-error' : undefined}
          />
        </Field>
      </div>

      <div className={compact ? 'space-y-5' : 'grid gap-5 sm:grid-cols-2'}>
        <Field label="Travel dates" htmlFor="travelDates" hint="Optional">
          <Input
            id="travelDates"
            name="travelDates"
            placeholder="e.g. 12–19 March"
          />
        </Field>
        <Field label="Guests" htmlFor="guests" hint="Optional">
          <Input id="guests" name="guests" placeholder="2 adults" />
        </Field>
      </div>

      <Field
        label="Tell us about your trip"
        htmlFor="message"
        error={state.errors?.message}
      >
        <Textarea
          id="message"
          name="message"
          rows={compact ? 4 : 5}
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={state.errors?.message ? 'message-error' : undefined}
          placeholder={
            propertyName
              ? `I'd love to know more about staying at ${propertyName}...`
              : 'Share what you dream of — barefoot luxury, a diving trip, a family escape...'
          }
        />
      </Field>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-end">
        <Button type="submit" size="pill" variant="ocean" disabled={pending}>
          {pending ? 'Checking…' : 'Continue to contact options'}
          {!pending ? (
            <Send className="size-4" data-icon="inline-end" aria-hidden="true" />
          ) : null}
        </Button>
      </div>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string
  htmlFor: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <Label htmlFor={htmlFor}>{label}</Label>
        {hint ? (
          <span className="text-xs text-muted-foreground">{hint}</span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
