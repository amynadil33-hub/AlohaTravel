'use server'

export interface InquiryFormState {
  ok: boolean
  message: string
  emailHref?: string
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
  const property = String(formData.get('property') ?? '').trim()
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

  const subject = property
    ? `Stay enquiry — ${property}`
    : 'Maldives travel enquiry'
  const body = [
    'Hello Aloha Travels,',
    '',
    property ? `I would like to enquire about ${property}.` : 'I would like to plan a Maldives holiday.',
    '',
    `Name: ${name}`,
    `Email or phone: ${contact}`,
    `Travel dates: ${travelDates || 'Not specified'}`,
    `Guests: ${guests || 'Not specified'}`,
    '',
    'Trip details:',
    message,
  ].join('\n')

  return {
    ok: true,
    message: `Thanks, ${name.split(' ')[0]}. Your details have not been sent automatically. Use the email button below to review and send your enquiry to Aloha Travels.`,
    emailHref: `mailto:travels@alohamaldives.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  }
}
