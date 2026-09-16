'use server'

export interface InquiryFormState {
  ok: boolean
  message: string
  errors?: Record<string, string>
}

// In production this would persist to the database (see lib/types.ts Inquiry)
// and/or notify the team. Here we validate and simulate a successful capture.
export async function submitInquiry(
  _prev: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> {
  const name = String(formData.get('name') ?? '').trim()
  const contact = String(formData.get('contact') ?? '').trim()
  const travelDates = String(formData.get('travelDates') ?? '').trim()
  const guests = String(formData.get('guests') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  const errors: Record<string, string> = {}
  if (name.length < 2) errors.name = 'Please tell us your name.'
  if (!contact.match(/.+@.+\..+/) && contact.replace(/\D/g, '').length < 7) {
    errors.contact = 'Enter a valid email or phone number.'
  }
  if (message.length < 5) errors.message = 'Tell us a little about your trip.'

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: 'Please fix the highlighted fields.', errors }
  }

  // Simulate network / persistence latency.
  await new Promise((r) => setTimeout(r, 700))

  console.log('[v0] New inquiry captured:', {
    name,
    contact,
    travelDates,
    guests,
  })

  return {
    ok: true,
    message: `Thank you, ${name.split(' ')[0]}! Our team will be in touch within 24 hours to start planning your Maldives.`,
  }
}
