interface EmailTemplateProps {
  title: string
  username?: string | null
  body: string
  buttonText: string
  link: string
}

export const getMinimalEmailHtml = ({
  title,
  username,
  body,
  buttonText,
  link,
}: EmailTemplateProps): string => {
  return `
  <!DOCTYPE html>
  <html>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 20px 0; margin: 0; color: #374151;">
    <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 40px 32px;">
      
      <div style="margin-bottom: 24px; font-weight: 700; color: #111827; font-size: 20px;">Star Register ✨</div>
      
      <h1 style="margin: 0 0 16px; font-size: 22px; font-weight: 600; color: #111827;">${title}</h1>
      
      <p style="margin: 0 0 24px; font-size: 16px; line-height: 24px; color: #4b5563;">
        Hello ${username || 'there'},<br><br>
        ${body}
      </p>
      
      <div style="margin-bottom: 24px;">
        <a href="${link}" style="display: inline-block; background-color: #111827; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 15px; text-align: center;">
          ${buttonText}
        </a>
      </div>

      <p style="margin: 0; font-size: 13px; color: #9ca3af;">
        If you didn't request this, you can safely ignore this email. The link is valid for 60 minutes.
      </p>
    </div>
    
    <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #9ca3af;">
      &copy; ${new Date().getFullYear()} Star Register. All rights reserved.
    </div>
  </body>
  </html>
  `
}
