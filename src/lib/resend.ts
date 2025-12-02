import { JSX } from 'react'
import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY
export const resend = resendApiKey ? new Resend(resendApiKey) : null

type Props = {
  html?: string
  text: string
  subject: string
  react?: JSX.Element
  to: string | string[]
}

export async function SendMail(props: Props) {
  if (resend && props.to) {
    const { data, error } = await resend.emails.send({
      from: `Admin Dashboard <onboarding@resend.dev>`,
      ...props,
    })

    if (error) {
      return console.error({ error })
    }

    console.info({ data })
  } else {
    console.error(
      'Skipping email send. RESEND_API_KEY or customer email missing.',
    )
  }
}
