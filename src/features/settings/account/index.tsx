import { SessionProps } from '@/lib/props'

import { ContentSection } from '../components/content-section'
import { EmailForm } from './components/email-form'
import { NameForm } from './components/name-form'
import { PasskeySettings } from './components/passkey-settings'
import { PasswordForm } from './components/password-form'
import { SessionsList } from './components/sessions-list'
import { TwoFactorSwitch } from './components/two-factor-switch'

export function SettingsAccount({ session }: SessionProps) {
  return (
    <ContentSection
      title="Account"
      desc="Update your account settings. Set your preferred language and
          timezone."
    >
      <div className="space-y-6">
        <NameForm name={session?.user.name || ''} />
        <EmailForm email={session?.user.email || ''} />
        <PasswordForm />
        <TwoFactorSwitch session={session} />
        <PasskeySettings session={session} />
        <SessionsList session={session} />
      </div>
    </ContentSection>
  )
}
