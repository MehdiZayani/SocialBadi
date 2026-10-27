import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const cleanApiKey = process.env.RESEND_API_KEY?.replace(/['"]/g, '').trim();
const resend = new Resend(cleanApiKey || 're_placeholder');

// Notification recipients: Mehdi Zayani (CEO), Yassine Rassas (Head of AI), Sales & Contact inboxes
const ADMIN_EMAILS = [
  'medmehdizayani1@gmail.com',
  'yassinerassas777@gmail.com',
  'sales@socialbadi.com',
  'contact@socialbadi.com'
];

/**
 * Builds the notification email sent to the internal SocialBadi team
 */
function buildAdminNotificationHtml({
  fullName,
  email,
  phone,
  company,
  service,
  message,
}: {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau Contact Lead | SocialBadi Studio</title>
</head>
<body style="margin:0; padding:0; background-color:#f1f5f9; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f1f5f9; padding:40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width:620px; background-color:#ffffff; border:1px solid #e2e8f0; border-radius:24px; box-shadow:0 10px 30px -5px rgba(15, 23, 42, 0.08); overflow:hidden;" cellspacing="0" cellpadding="0">
          
          <!-- Brand Header -->
          <tr>
            <td style="padding:32px 36px 24px; border-bottom:1px solid #f1f5f9; background:linear-gradient(180deg, #ffffff 0%, #fafafa 100%);">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <!-- Logo Mark -->
                        <td style="vertical-align:middle; width:44px;">
                          <div style="width:42px; height:42px; border-radius:12px; background:linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); padding:2px; box-shadow:0 4px 12px rgba(37, 99, 235, 0.25);">
                            <div style="width:38px; height:38px; background-color:#ffffff; border-radius:10px; text-align:center; line-height:38px;">
                              <span style="font-family:'Courier New', monospace; font-size:20px; font-weight:800; color:#2563eb; letter-spacing:-1px;">&gt;_</span>
                            </div>
                          </div>
                        </td>
                        <!-- Logo Typography -->
                        <td style="vertical-align:middle; padding-left:14px;">
                          <div style="font-size:20px; font-weight:800; letter-spacing:-0.5px; color:#0f172a; line-height:1.2;">
                            SocialBadi<span style="color:#2563eb;">.studio</span>
                          </div>
                          <div style="font-size:10px; font-family:monospace; text-transform:uppercase; letter-spacing:1.5px; color:#64748b; font-weight:600; margin-top:2px;">
                            Software Engineering &amp; AI
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="display:inline-block; padding:5px 12px; border-radius:9999px; background-color:#ecfdf5; border:1px solid #a7f3d0; color:#047857; font-family:monospace; font-size:11px; font-weight:700;">
                      NOUVEAU LEAD
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Banner Title -->
          <tr>
            <td style="padding:28px 36px 12px;">
              <h1 style="margin:0 0 8px; font-size:24px; font-weight:800; color:#0f172a; letter-spacing:-0.5px;">
                🚀 Nouvelle prise de contact sur le site
              </h1>
              <p style="margin:0; font-size:14px; color:#64748b; line-height:1.5;">
                Un prospect vient de soumettre une demande via le formulaire officiel SocialBadi.
              </p>
            </td>
          </tr>

          <!-- Prospect Information Card -->
          <tr>
            <td style="padding:16px 36px 0;">
              <table role="presentation" width="100%" style="background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:16px; padding:20px;" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom:12px;">
                    <span style="font-size:11px; font-family:monospace; text-transform:uppercase; color:#2563eb; font-weight:700; letter-spacing:1px;">
                      COORDONNÉES CLIENT
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="6">
                      <tr>
                        <td width="35%" style="font-size:13px; color:#64748b; font-weight:500;">Nom complet :</td>
                        <td style="font-size:14px; color:#0f172a; font-weight:700;">${fullName}</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px; color:#64748b; font-weight:500;">Email :</td>
                        <td style="font-size:14px; color:#2563eb; font-weight:600;">
                          <a href="mailto:${email}" style="color:#2563eb; text-decoration:none;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size:13px; color:#64748b; font-weight:500;">Téléphone :</td>
                        <td style="font-size:14px; color:#0f172a; font-weight:600;">
                          ${phone !== '—' ? `<a href="tel:${phone}" style="color:#0f172a; text-decoration:none;">${phone}</a>` : '—'}
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size:13px; color:#64748b; font-weight:500;">Entreprise / Marque :</td>
                        <td style="font-size:14px; color:#0f172a; font-weight:600;">${company}</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px; color:#64748b; font-weight:500;">Service sollicité :</td>
                        <td style="font-size:14px; color:#047857; font-weight:700;">
                          <span style="display:inline-block; padding:2px 8px; border-radius:6px; background-color:#ecfdf5; border:1px solid #d1fae5;">
                            ${service}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Card -->
          <tr>
            <td style="padding:16px 36px 0;">
              <table role="presentation" width="100%" style="background-color:#ffffff; border:1px solid #e2e8f0; border-left:4px solid #2563eb; border-radius:12px; padding:20px;" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom:10px;">
                    <span style="font-size:11px; font-family:monospace; text-transform:uppercase; color:#64748b; font-weight:700; letter-spacing:1px;">
                      MESSAGE DU PROSPECT
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="font-size:14px; color:#1e293b; line-height:1.6; white-space:pre-wrap;">${message}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Action Button -->
          <tr>
            <td align="center" style="padding:28px 36px;">
              <a href="mailto:${email}?subject=Suite%20%C3%A0%20votre%20demande%20SocialBadi%20Studio" style="display:inline-block; padding:14px 32px; background:linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); color:#ffffff; font-size:14px; font-weight:700; text-decoration:none; border-radius:9999px; box-shadow:0 6px 18px rgba(37, 99, 235, 0.3);">
                ✉️ Répondre directement au prospect
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 36px; background-color:#f8fafc; border-top:1px solid #e2e8f0; text-align:center;">
              <p style="margin:0 0 6px; font-size:12px; color:#64748b; font-weight:600;">
                SocialBadi Studio • Notification transmise à Mehdi Zayani &amp; Yassine Rassas
              </p>
              <p style="margin:0; font-size:11px; color:#94a3b8;">
                Ce message provient du formulaire de contact de <a href="https://socialbadi.com" style="color:#2563eb; text-decoration:none;">socialbadi.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Builds the confirmation email sent to the prospect who filled out the form
 */
function buildClientConfirmationHtml({
  fullName,
  service,
  message,
}: {
  fullName: string;
  service: string;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Demande bien reçue | SocialBadi Studio</title>
</head>
<body style="margin:0; padding:0; background-color:#f1f5f9; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f1f5f9; padding:40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width:620px; background-color:#ffffff; border:1px solid #e2e8f0; border-radius:24px; box-shadow:0 10px 30px -5px rgba(15, 23, 42, 0.08); overflow:hidden;" cellspacing="0" cellpadding="0">
          
          <!-- Brand Header -->
          <tr>
            <td style="padding:32px 36px 24px; border-bottom:1px solid #f1f5f9; background:linear-gradient(180deg, #ffffff 0%, #fafafa 100%);">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <!-- Logo Mark -->
                        <td style="vertical-align:middle; width:44px;">
                          <div style="width:42px; height:42px; border-radius:12px; background:linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); padding:2px; box-shadow:0 4px 12px rgba(37, 99, 235, 0.25);">
                            <div style="width:38px; height:38px; background-color:#ffffff; border-radius:10px; text-align:center; line-height:38px;">
                              <span style="font-family:'Courier New', monospace; font-size:20px; font-weight:800; color:#2563eb; letter-spacing:-1px;">&gt;_</span>
                            </div>
                          </div>
                        </td>
                        <!-- Logo Typography -->
                        <td style="vertical-align:middle; padding-left:14px;">
                          <div style="font-size:20px; font-weight:800; letter-spacing:-0.5px; color:#0f172a; line-height:1.2;">
                            SocialBadi<span style="color:#2563eb;">.studio</span>
                          </div>
                          <div style="font-size:10px; font-family:monospace; text-transform:uppercase; letter-spacing:1.5px; color:#64748b; font-weight:600; margin-top:2px;">
                            Software Engineering &amp; AI
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="display:inline-block; padding:5px 12px; border-radius:9999px; background-color:#eff6ff; border:1px solid #bfdbfe; color:#1d4ed8; font-family:monospace; font-size:11px; font-weight:700;">
                      CONFIRMATION
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Salutation & Welcome -->
          <tr>
            <td style="padding:32px 36px 12px;">
              <h1 style="margin:0 0 12px; font-size:24px; font-weight:800; color:#0f172a; letter-spacing:-0.5px;">
                Merci pour votre message, ${fullName} !
              </h1>
              <p style="margin:0; font-size:15px; color:#475569; line-height:1.6;">
                Nous avons bien enregistré votre prise de contact avec le studio <strong style="color:#0f172a;">SocialBadi</strong>. Notre équipe d'ingénierie et intelligence artificielle examine vos spécifications.
              </p>
            </td>
          </tr>

          <!-- Next Steps Card -->
          <tr>
            <td style="padding:16px 36px 0;">
              <table role="presentation" width="100%" style="background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:16px; padding:22px;" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom:14px;">
                    <span style="font-size:11px; font-family:monospace; text-transform:uppercase; color:#2563eb; font-weight:700; letter-spacing:1px;">
                      ⚡ DÉROULEMENT DES PROCHAINES ÉTAPES
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="6">
                      <tr>
                        <td width="28" style="vertical-align:top; font-size:14px; font-weight:800; color:#2563eb;">1.</td>
                        <td style="font-size:14px; color:#334155; line-height:1.5;">
                          <strong>Revue technique :</strong> Évaluation de l'architecture, faisabilité et dimensionnement.
                        </td>
                      </tr>
                      <tr>
                        <td style="vertical-align:top; font-size:14px; font-weight:800; color:#2563eb;">2.</td>
                        <td style="font-size:14px; color:#334155; line-height:1.5;">
                          <strong>Retour sous 24h :</strong> Prise de contact par un lead engineer pour affiner vos besoins.
                        </td>
                      </tr>
                      <tr>
                        <td style="vertical-align:top; font-size:14px; font-weight:800; color:#2563eb;">3.</td>
                        <td style="font-size:14px; color:#334155; line-height:1.5;">
                          <strong>Plan de sprint :</strong> Proposition claire, calendrier de livraison et estimation budgétaire.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Summary Card -->
          <tr>
            <td style="padding:16px 36px 0;">
              <table role="presentation" width="100%" style="background-color:#ffffff; border:1px solid #e2e8f0; border-radius:16px; padding:20px;" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding-bottom:10px;">
                    <span style="font-size:11px; font-family:monospace; text-transform:uppercase; color:#64748b; font-weight:700; letter-spacing:1px;">
                      RÉCAPITULATIF DE VOTRE DEMANDE
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="margin:0 0 8px; font-size:13px; color:#64748b;">
                      Service demandé : <strong style="color:#0f172a;">${service}</strong>
                    </p>
                    <div style="background-color:#f8fafc; border-left:3px solid #cbd5e1; padding:12px 14px; border-radius:8px; font-size:13px; color:#475569; font-style:italic; line-height:1.5;">
                      « ${message.length > 200 ? message.substring(0, 200) + '...' : message} »
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Studio CTA Button -->
          <tr>
            <td align="center" style="padding:28px 36px;">
              <a href="https://socialbadi.com/fr/projects" style="display:inline-block; padding:14px 32px; background:linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); color:#ffffff; font-size:14px; font-weight:700; text-decoration:none; border-radius:9999px; box-shadow:0 6px 18px rgba(37, 99, 235, 0.3);">
                Consulter nos dernières réalisations studio →
              </a>
            </td>
          </tr>

          <!-- Signoff & Footer -->
          <tr>
            <td style="padding:24px 36px; background-color:#f8fafc; border-top:1px solid #e2e8f0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="font-size:13px; color:#475569; line-height:1.6;">
                    Bien cordialement,<br>
                    <strong style="color:#0f172a;">Mehdi Zayani</strong> (Fondateur &amp; CEO)<br>
                    <strong style="color:#0f172a;">Sarra Ben Salem</strong> (Head of Sales)<br>
                    <strong style="color:#0f172a;">Yassine Rassas</strong> (Head of AI)<br>
                    <span style="font-size:12px; color:#64748b;">SocialBadi Studio • Paris &amp; International</span><br>
                    <span style="font-size:11px; color:#94a3b8;">
                      Commercial : <a href="mailto:sales@socialbadi.com" style="color:#2563eb; text-decoration:none;">sales@socialbadi.com</a> | 
                      Contact : <a href="mailto:contact@socialbadi.com" style="color:#2563eb; text-decoration:none;">contact@socialbadi.com</a>
                    </span>
                  </td>
                  <td align="right" style="vertical-align:bottom; font-size:11px; color:#94a3b8;">
                    <a href="https://socialbadi.com" style="color:#2563eb; text-decoration:none; font-weight:600;">socialbadi.com</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const fullName = body.name || `${body.firstName || ''} ${body.lastName || ''}`.trim() || 'Client';
    const email = body.email;
    const phone = body.phone || '—';
    const company = body.company || '—';
    const service = body.service || 'Ingénierie Web & IA';
    const message = body.message;

    // Validate required fields
    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message fields are required' },
        { status: 400 }
      );
    }

    const adminHtml = buildAdminNotificationHtml({
      fullName,
      email,
      phone,
      company,
      service,
      message,
    });

    const clientHtml = buildClientConfirmationHtml({
      fullName,
      service,
      message,
    });

    // Distinct verified sender addresses
    const adminFromAddress = 'SocialBadi Studio <notif@socialbadi.com>';
    const clientFromAddress = 'SocialBadi Studio <noreply@socialbadi.com>';

    // 1. Dispatch notification email to internal team (Mehdi & Yassine) from notif@socialbadi.com
    const adminDeliveryResults = await Promise.allSettled(
      ADMIN_EMAILS.map((recipient) =>
        resend.emails.send({
          from: adminFromAddress,
          to: [recipient],
          subject: `🚀 Nouveau Lead: ${fullName} - ${service}`,
          html: adminHtml,
        })
      )
    );

    // 2. Dispatch automated confirmation email to the client from noreply@socialbadi.com
    let confirmationId: string | undefined = undefined;
    try {
      const clientEmailResult = await resend.emails.send({
        from: clientFromAddress,
        to: [email],
        replyTo: 'sales@socialbadi.com',
        subject: `✨ Confirmation : Votre projet avec SocialBadi Studio`,
        html: clientHtml,
      });
      confirmationId = clientEmailResult.data?.id;
    } catch (confError) {
      console.warn('Client confirmation email failed or skipped:', confError);
    }

    const successfulAdminDeliveries = adminDeliveryResults.filter(
      (r) => r.status === 'fulfilled' && (r as PromiseFulfilledResult<any>).value?.data?.id
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Notification transmise à Mehdi Zayani et Yassine Rassas',
        adminDeliveriesCount: successfulAdminDeliveries.length,
        confirmationId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      {
        error: 'Échec de traitement du formulaire de contact',
        details: error instanceof Error ? error.message : 'Erreur inconnue',
      },
      { status: 500 }
    );
  }
}
