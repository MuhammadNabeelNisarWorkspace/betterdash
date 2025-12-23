import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { authClient } from '@/lib/auth-client'
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

const usernameFormSchema = z.object({
  username: z
    .string()
    .min(1, 'Please enter your name.')
    .min(2, 'Name must be at least 2 characters.')
    .max(30, 'Name must not be longer than 30 characters.'),
})

type UsernameFormValues = z.infer<typeof usernameFormSchema>

export function UsernameForm({ username }: { username: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<UsernameFormValues>({
    resolver: zodResolver(usernameFormSchema),
    defaultValues: { username },
  })

  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null)

  const usernameValue = form.watch('username')

  useEffect(() => {
    const checkUsername = async () => {
      if (!usernameValue || usernameValue.length < 3) {
        setIsUsernameAvailable(null)
        return
      }

      setIsCheckingUsername(true)
      try {
        const { data, error } = await authClient.isUsernameAvailable({
          username: usernameValue,
        })
        if (error) {
          setIsUsernameAvailable(false)
          return
        }
        setIsUsernameAvailable(data?.available ?? false)
      } catch (error) {
        console.error('Error checking username:', error)
        setIsUsernameAvailable(false)
      } finally {
        setIsCheckingUsername(false)
      }
    }

    const timer = setTimeout(checkUsername, 500)
    return () => clearTimeout(timer)
  }, [usernameValue])

  const areFieldsDisabled =
    isLoading || !isUsernameAvailable || isCheckingUsername

  function onSubmit(data: UsernameFormValues) {
    toast.promise(
      authClient.updateUser(
        { username: data.username },
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
        loading: `Updating username...`,
        success: () => `Username updated successfully!`,
        error: (err) => err.message || 'Something went wrong',
      },
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="border-b py-4">
              <FormLabel>Username</FormLabel>
              <div className="flex flex-row space-x-4 items-end">
                <div className="flex-1 space-y-1">
                  <FormControl>
                    <Input
                      disabled={areFieldsDisabled}
                      placeholder="Your username"
                      autoComplete="username"
                      {...field}
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
                    'Save'
                  )}
                </Button>
              </div>
              <FormDescription>
                This is the username that will be displayed on your profile and
                in emails.
              </FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
