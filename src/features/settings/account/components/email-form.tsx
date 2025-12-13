import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import useDialogState from '@/hooks/use-dialog-state'
import { ConfirmDialog } from '@/components/confirm-dialog'

const accountFormSchema = z.object({
  email: z.email('Please enter a valid email address.'),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

export function EmailForm({ email }: { email: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useDialogState()

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: { email },
  })

  function onSubmit() {
    setOpen(true)
  }

  function handleConfirm() {
    toast.promise(
      authClient.changeEmail(
        { newEmail: form.getValues('email'), callbackURL: '/settings/account' },
        {
          onRequest: () => {
            setIsLoading(true)
          },
          onResponse: () => {
            setIsLoading(false)
          },
          onError: (error) => {
            const message = error.error.message || error.error.statusText
            throw new Error(message)
          },
        },
      ),
      {
        loading: `Changing email...`,
        success: () => `Please check your email for confirmation!`,
        error: (err) => err.message || 'Something went wrong',
      },
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="border-b py-4">
              <FormLabel>Email</FormLabel>
              <div className="flex flex-row space-x-4 items-end">
                <div className="flex-1 space-y-1">
                  <FormControl>
                    <Input
                      placeholder="Your email"
                      {...field}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage className="pt-1 text-xs" />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="whitespace-nowrap"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Change'
                  )}
                </Button>
              </div>
              <FormDescription>
                This is the email that will be used for authentication and
                notifications.
              </FormDescription>
            </FormItem>
          )}
        />

        <ConfirmDialog
          isLoading={isLoading}
          open={!!open}
          onOpenChange={setOpen}
          title="Change Email"
          desc="By updating your email, you are changing your primary login credential. Your previous email will be immediately disabled for sign-in. For security and to maintain your current account permissions, you must **verify your new email address** immediately after saving."
          confirmText="Change"
          destructive
          handleConfirm={handleConfirm}
          className="sm:max-w-sm"
        />
      </form>
    </Form>
  )
}
