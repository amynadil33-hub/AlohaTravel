'use server'

export interface InquiryFormState {
  ok: boolean
  message: string
  errors?: Record<string, string>
}

// This action validates the form before presenting direct contact options.
// It does not persist or deliver enquiry data.
export async function submitInquiry(
  _prev: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> {
  const name = String(formData.get('name') ?? '').trim()
  const contact = String(formData.get('contact') ?? '').trim()
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

  return {
    ok: true,
    message: `Thanks, ${name.split(' ')[0]}. Your details have not been sent automatically. Please contact Aloha Travels by email or WhatsApp to continue your enquiry.`,
  }
}
