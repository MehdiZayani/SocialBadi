import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, company, service, message, budget } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send notification email to you
    const notificationEmail = await resend.emails.send({
      from: 'SocialBadi Contact Form <contact@socialbadi.com>',
      to: ['medmehdizayani1@gmail.com'], // Your email
      subject: `🚀 New Lead: ${firstName} ${lastName} - ${service || 'General Inquiry'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">✨ New Contact Form Submission</h1>
            </div>
            
            <!-- Content -->
            <div style="background-color: #0a0a0a; padding: 30px; border-left: 2px solid #3b82f6; border-right: 2px solid #8b5cf6;">
              <!-- Contact Info Cards -->
              <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h2 style="margin: 0 0 15px 0; color: #3b82f6; font-size: 18px; font-weight: 600;">👤 Contact Information</h2>
                <table style="width: 100%; color: #e5e7eb;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #9ca3af;">Name:</td>
                    <td style="padding: 8px 0; color: #ffffff;">${firstName} ${lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #9ca3af;">Email:</td>
                    <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #9ca3af;">Phone:</td>
                    <td style="padding: 8px 0; color: #ffffff;">${phone || '—'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #9ca3af;">Company:</td>
                    <td style="padding: 8px 0; color: #ffffff;">${company || '—'}</td>
                  </tr>
                </table>
              </div>
              
              <!-- Service & Budget -->
              <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h2 style="margin: 0 0 15px 0; color: #8b5cf6; font-size: 18px; font-weight: 600;">💼 Project Details</h2>
                <table style="width: 100%; color: #e5e7eb;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #9ca3af;">Service Interest:</td>
                    <td style="padding: 8px 0; color: #ffffff;">${service || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #9ca3af;">Budget Range:</td>
                    <td style="padding: 8px 0; color: #ffffff;">${budget || 'Not specified'}</td>
                  </tr>
                </table>
              </div>
              
              <!-- Message -->
              <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px; padding: 20px;">
                <h2 style="margin: 0 0 15px 0; color: #3b82f6; font-size: 18px; font-weight: 600;">💬 Message</h2>
                <p style="margin: 0; color: #e5e7eb; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #0a0a0a; padding: 20px 30px; border-radius: 0 0 16px 16px; border-left: 2px solid #3b82f6; border-right: 2px solid #8b5cf6; border-bottom: 2px solid #8b5cf6; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 13px;">Received from SocialBadi Contact Form</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Send confirmation email to the user
    const confirmationEmail = await resend.emails.send({
      from: 'SocialBadi <contact@socialbadi.com>',
      to: [email],
      subject: '✨ We received your message - SocialBadi Team',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <!-- Header with Gradient -->
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 40px 30px; border-radius: 16px 16px 0 0; text-align: center; position: relative; overflow: hidden;">
              <div style="position: relative; z-index: 1;">
                <h1 style="margin: 0 0 10px 0; color: #ffffff; font-size: 32px; font-weight: bold;">🚀 Thank You, ${firstName}!</h1>
                <p style="margin: 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">We've received your message</p>
              </div>
            </div>
            
            <!-- Main Content -->
            <div style="background-color: #0a0a0a; padding: 40px 30px; border-left: 2px solid #3b82f6; border-right: 2px solid #8b5cf6;">
              <div style="margin-bottom: 30px;">
                <p style="margin: 0 0 20px 0; color: #e5e7eb; font-size: 16px; line-height: 1.6;">
                  We appreciate you reaching out to <span style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 600;">SocialBadi</span>. Your inquiry is important to us, and our team is already reviewing your message.
                </p>
              </div>
              
              <!-- What's Next Section -->
              <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 15px 0; color: #3b82f6; font-size: 20px; font-weight: 600;">⚡ What happens next?</h2>
                <div style="display: flex; margin-bottom: 12px;">
                  <div style="color: #8b5cf6; font-weight: bold; margin-right: 10px;">1.</div>
                  <p style="margin: 0; color: #e5e7eb; line-height: 1.6;">Our AI-powered team analyzes your requirements</p>
                </div>
                <div style="display: flex; margin-bottom: 12px;">
                  <div style="color: #8b5cf6; font-weight: bold; margin-right: 10px;">2.</div>
                  <p style="margin: 0; color: #e5e7eb; line-height: 1.6;">We'll reach out within <strong style="color: #3b82f6;">24 hours</strong> with next steps</p>
                </div>
                <div style="display: flex;">
                  <div style="color: #8b5cf6; font-weight: bold; margin-right: 10px;">3.</div>
                  <p style="margin: 0; color: #e5e7eb; line-height: 1.6;">Together, we'll transform your vision into reality</p>
                </div>
              </div>
              
              <!-- Message Summary -->
              <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 15px 0; color: #8b5cf6; font-size: 18px; font-weight: 600;">📋 Your Submission Summary</h3>
                <table style="width: 100%;">
                  <tr>
                    <td style="padding: 8px 0; color: #9ca3af; font-weight: 600;">Service Interest:</td>
                    <td style="padding: 8px 0; color: #ffffff; text-align: right;">${service || 'General Inquiry'}</td>
                  </tr>
                  ${budget ? `<tr>
                    <td style="padding: 8px 0; color: #9ca3af; font-weight: 600;">Budget Range:</td>
                    <td style="padding: 8px 0; color: #ffffff; text-align: right;">${budget}</td>
                  </tr>` : ''}
                  <tr>
                    <td colspan="2" style="padding: 15px 0 8px 0; color: #9ca3af; font-weight: 600;">Your Message:</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding: 0; color: #e5e7eb; line-height: 1.6; font-style: italic;">${message.substring(0, 150)}${message.length > 150 ? '...' : ''}</td>
                  </tr>
                </table>
              </div>
              
              <!-- CTA Section -->
              <div style="text-align: center; margin: 30px 0;">
                <p style="margin: 0 0 20px 0; color: #9ca3af; font-size: 14px;">In the meantime, explore what we can do for you:</p>
                <a href="https://socialbadi.com" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 25px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);">Visit Our Website</a>
              </div>
              
              <div style="border-top: 1px solid rgba(59, 130, 246, 0.2); margin-top: 30px; padding-top: 25px;">
                <p style="margin: 0; color: #e5e7eb; font-size: 16px; line-height: 1.6;">
                  Best regards,<br>
                  <span style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 600; font-size: 18px;">The SocialBadi Team</span>
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #0a0a0a; padding: 25px 30px; border-radius: 0 0 16px 16px; border-left: 2px solid #3b82f6; border-right: 2px solid #8b5cf6; border-bottom: 2px solid #8b5cf6; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 13px;">
                This is an automated confirmation. Please do not reply to this email.
              </p>
              <p style="margin: 0; color: #4b5563; font-size: 12px;">
                © 2025 SocialBadi. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Emails sent successfully',
        notificationId: notificationEmail.data?.id,
        confirmationId: confirmationEmail.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json(
      { error: 'Failed to send emails', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
