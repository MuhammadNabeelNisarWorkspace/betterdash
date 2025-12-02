import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { getSession } from '@/server-fn/get-session'

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
  beforeLoad: async () => {
    const session = await getSession()
    return { session }
  },
  loader: ({ context }) => {
    if (!context.session) {
      throw redirect({ to: '/sign-in' })
    }

    // if (!context.session.user?.emailVerified) {
    //   debugLog('loader', 'Email not verified, redirecting to /email-verified')
    //   throw redirect({ to: '/email-verified' })
    // }

    return context
  },
})
