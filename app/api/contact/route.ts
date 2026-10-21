import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const fullName = body.name || `${body.firstName || ''} ${body.lastName || ''}`.trim() || 'Client';
    const email = body.email;
    const phone = body.phone || '—';
    const company = body.company || '—';
    const service = body.service || 'Ingénierie Web & IA';
    const message = body.message;
    const budget = body.budget;

    // Validate required fields
    if (!email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send notification email to personal email
    const notificationEmail = await resend.emails.send({
      from: 'SocialBadi Contact Form <onboarding@resend.dev>',
      to: ['medmehdizayani1@gmail.com'], // Your personal email
      subject: `🚀 Nouveau Contact Lead: ${fullName} - ${service}`,
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
                    <td style="padding: 8px 0; color: #ffffff;">${fullName}</td>
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

    // Send confirmation email to the user (wrapped to avoid breaking lead notification if user email is rejected)
    let confirmationId: string | undefined = undefined;
    try {
      const confirmationEmail = await resend.emails.send({
        from: 'SocialBadi <onboarding@resend.dev>',
        to: [email],
        subject: '✨ Nous avons bien reçu votre message - Équipe SocialBadi',
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
                <h1 style="margin: 0 0 10px 0; color: #ffffff; font-size: 32px; font-weight: bold;">🚀 Merci, ${fullName} !</h1>
                <p style="margin: 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">Votre demande a bien été transmise à notre équipe d'ingénierie</p>
              </div>
            </div>
            
            <!-- Main Content -->
            <div style="background-color: #0a0a0a; padding: 40px 30px; border-left: 2px solid #3b82f6; border-right: 2px solid #8b5cf6;">
              <div style="margin-bottom: 30px;">
                <p style="margin: 0 0 20px 0; color: #e5e7eb; font-size: 16px; line-height: 1.6;">
                  Nous vous remercions de votre prise de contact avec <span style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 600;">SocialBadi</span>. Notre équipe technique analyse actuellement les spécifications de votre projet.
                </p>
              </div>
              
              <!-- What's Next Section -->
              <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <h2 style="margin: 0 0 15px 0; color: #3b82f6; font-size: 20px; font-weight: 600;">⚡ Prochaines étapes :</h2>
                <div style="display: flex; margin-bottom: 12px;">
                  <div style="color: #8b5cf6; font-weight: bold; margin-right: 10px;">1.</div>
                  <p style="margin: 0; color: #e5e7eb; line-height: 1.6;">Revue d'architecture et cadrage préliminaire de vos besoins</p>
                </div>
                <div style="display: flex; margin-bottom: 12px;">
                  <div style="color: #8b5cf6; font-weight: bold; margin-right: 10px;">2.</div>
                  <p style="margin: 0; color: #e5e7eb; line-height: 1.6;">Prise de contact directe sous <strong style="color: #3b82f6;">24 heures</strong></p>
                </div>
                <div style="display: flex;">
                  <div style="color: #8b5cf6; font-weight: bold; margin-right: 10px;">3.</div>
                  <p style="margin: 0; color: #e5e7eb; line-height: 1.6;">Proposition technique sur-mesure et plan de sprint</p>
                </div>
              </div>
              
              <!-- Message Summary -->
              <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 15px 0; color: #8b5cf6; font-size: 18px; font-weight: 600;">📋 Récapitulatif :</h3>
                <table style="width: 100%;">
                  <tr>
                    <td style="padding: 8px 0; color: #9ca3af; font-weight: 600;">Service sélectionné :</td>
                    <td style="padding: 8px 0; color: #ffffff; text-align: right;">${service || 'Ingénierie Web & IA'}</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding: 15px 0 8px 0; color: #9ca3af; font-weight: 600;">Votre message :</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding: 0; color: #e5e7eb; line-height: 1.6; font-style: italic;">${message.substring(0, 150)}${message.length > 150 ? '...' : ''}</td>
                  </tr>
                </table>
              </div>
              
              <div style="border-top: 1px solid rgba(59, 130, 246, 0.2); margin-top: 30px; padding-top: 25px;">
                <p style="margin: 0; color: #e5e7eb; font-size: 16px; line-height: 1.6;">
                  Bien cordialement,<br>
                  <span style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 600; font-size: 18px;">L'Équipe SocialBadi Studio</span>
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #0a0a0a; padding: 25px 30px; border-radius: 0 0 16px 16px; border-left: 2px solid #3b82f6; border-right: 2px solid #8b5cf6; border-bottom: 2px solid #8b5cf6; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 13px;">
                Ceci est une confirmation automatique. Pour toute urgence : contact@socialbadi.com
              </p>
              <p style="margin: 0; color: #4b5563; font-size: 12px;">
                © 2025 SocialBadi. Tous droits réservés.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      });
      confirmationId = confirmationEmail.data?.id;
    } catch (confError) {
      console.warn('Confirmation email skipped/failed:', confError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Notification lead transmise avec succès',
        notificationId: notificationEmail.data?.id,
        confirmationId,
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
