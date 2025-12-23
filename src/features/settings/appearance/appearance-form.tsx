import { useTheme } from '@/context/theme-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const appearanceFormSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

export function AppearanceForm() {
  const { theme, setTheme } = useTheme()

  // This can come from your database or API.
  const defaultValues: Partial<AppearanceFormValues> = {
    theme: theme as 'light' | 'dark' | 'system',
  }

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  })

  return (
    <Form {...form}>
      <div className="space-y-8">
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theme</FormLabel>
              <FormDescription>
                Select the theme for the dashboard.
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={(val) => {
                  field.onChange(val)
                  if (val !== theme) {
                    setTheme(val)
                    toast.success('Appearance updated successfully.')
                  }
                }}
                defaultValue={field.value}
                className="grid max-w-2xl grid-cols-3 gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary cursor-pointer flex flex-col items-center gap-2">
                    <FormControl>
                      <RadioGroupItem value="light" className="sr-only" />
                    </FormControl>
                    <div className="border-muted hover:border-accent w-full rounded-md border-2 p-1 transition-all">
                      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                        <div className="space-y-2 rounded-md bg-white p-2 shadow-xs">
                          <div className="h-2 w-full rounded-lg bg-[#ecedef]" />
                          <div className="h-2 w-full rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-full rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs">
                          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          <div className="h-2 w-full rounded-lg bg-[#ecedef]" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full text-center font-normal">
                      Light
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary cursor-pointer flex flex-col items-center gap-2">
                    <FormControl>
                      <RadioGroupItem value="dark" className="sr-only" />
                    </FormControl>
                    <div className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground w-full rounded-md border-2 p-1 transition-all">
                      <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-xs">
                          <div className="h-2 w-full rounded-lg bg-slate-400" />
                          <div className="h-2 w-full rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-full rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs">
                          <div className="h-4 w-4 rounded-full bg-slate-400" />
                          <div className="h-2 w-full rounded-lg bg-slate-400" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full text-center font-normal">
                      Dark
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary cursor-pointer flex flex-col items-center gap-2">
                    <FormControl>
                      <RadioGroupItem value="system" className="sr-only" />
                    </FormControl>
                    <div className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground w-full rounded-md border-2 p-1 transition-all">
                      <div className="flex gap-1">
                        <div className="flex-1 space-y-2 rounded-sm bg-[#ecedef] p-2">
                          <div className="space-y-2 rounded-md bg-white p-2 shadow-xs">
                            <div className="h-2 w-full rounded-lg bg-[#ecedef]" />
                            <div className="h-2 w-full rounded-lg bg-[#ecedef]" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs">
                            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs">
                            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                          </div>
                        </div>
                        <div className="flex-1 space-y-2 rounded-sm bg-slate-950 p-2">
                          <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-xs">
                            <div className="h-2 w-full rounded-lg bg-slate-400" />
                            <div className="h-2 w-full rounded-lg bg-slate-400" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs">
                            <div className="h-4 w-4 rounded-full bg-slate-400" />
                          </div>
                          <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs">
                            <div className="h-4 w-4 rounded-full bg-slate-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="block w-full text-center font-normal">
                      System
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />
      </div>
    </Form>
  )
}
