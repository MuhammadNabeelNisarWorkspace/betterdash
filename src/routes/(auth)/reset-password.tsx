import { ResetPassword } from '@/features/auth/reset-password'
import { getSession } from '@/server-fn/get-session'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'

const SearchSchema = z.object({
  token: z.string().optional().catch(''),
})

export const Route = createFileRoute('/(auth)/reset-password')({
  validateSearch: SearchSchema,
  component: MainComponent,
  beforeLoad: async () => {
    const session = await getSession()
    return { session }
  },
  loader: ({ context }) => {
    if (context.session) {
      throw redirect({ to: '/' })
    }
    return context
  },
})

function MainComponent() {
  const searchParams = Route.useSearch()
  const token = searchParams.token as string

  return <ResetPassword token={token} />
}
