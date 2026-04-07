import { supabase } from "@/integrations/supabase/client";

const LOGO_URL = "https://npyygvuhmxrvccaczifw.supabase.co/storage/v1/object/public/media/logo-zapper-verde.svg";

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  sector?: string;
  message?: string;
  source: string;
  extra?: Record<string, string>;
}

function buildWelcomeEmailHtml(data: ContactData): string {
  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:30px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;max-width:100%;">
  <!-- Header -->
  <tr><td style="background-color:#1c1e1c;padding:30px 40px;text-align:center;">
    <img src="${LOGO_URL}" alt="ZAPPER®" width="160" style="display:block;margin:0 auto;" />
  </td></tr>
  <!-- Body -->
  <tr><td style="padding:40px;">
    <h1 style="color:#1c1e1c;font-size:24px;margin:0 0 20px;font-weight:bold;">
      Grazie per averci contattato${data.name ? `, ${data.name}` : ''}!
    </h1>
    <p style="color:#555;font-size:16px;line-height:1.6;margin:0 0 20px;">
      Abbiamo ricevuto la tua richiesta e il nostro team tecnico la sta già analizzando.
    </p>
    <p style="color:#555;font-size:16px;line-height:1.6;margin:0 0 20px;">
      Ti ricontatteremo entro <strong>24-48 ore lavorative</strong> con una proposta personalizzata per la tua situazione.
    </p>
    <!-- CTA -->
    <table cellpadding="0" cellspacing="0" style="margin:30px 0;">
    <tr><td style="background-color:#59d153;border-radius:8px;padding:14px 32px;">
      <a href="https://www.smokezapper.it" style="color:#ffffff;font-size:16px;font-weight:bold;text-decoration:none;display:inline-block;">
        Scopri le nostre soluzioni
      </a>
    </td></tr>
    </table>
    <!-- Info Box -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f8f6;border-radius:8px;margin:20px 0;">
    <tr><td style="padding:20px;">
      <p style="color:#1c1e1c;font-size:14px;font-weight:bold;margin:0 0 10px;">Hai bisogno di assistenza immediata?</p>
      <p style="color:#555;font-size:14px;line-height:1.8;margin:0;">
        📞 <a href="tel:+3908119968436" style="color:#59d153;text-decoration:none;">+39 081 199 68 436</a><br/>
        📱 <a href="tel:+393248996189" style="color:#59d153;text-decoration:none;">+39 324 899 6189</a><br/>
        ✉️ <a href="mailto:info@smokezapper.it" style="color:#59d153;text-decoration:none;">info@smokezapper.it</a>
      </p>
    </td></tr>
    </table>
  </td></tr>
  <!-- Footer -->
  <tr><td style="background-color:#1c1e1c;padding:25px 40px;text-align:center;">
    <p style="color:#8c8c8c;font-size:12px;line-height:1.6;margin:0;">
      ZAPPER® — Via Galileo Ferraris 24, Scafati (SA) 84018 - Italy<br/>
      <a href="https://www.smokezapper.it" style="color:#59d153;text-decoration:none;">www.smokezapper.it</a>
    </p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function buildNotificationEmailHtml(data: ContactData): string {
  const extraRows = data.extra
    ? Object.entries(data.extra)
        .map(([k, v]) => `<tr><td style="padding:8px 12px;font-weight:bold;color:#1c1e1c;border-bottom:1px solid #eee;width:140px;">${k}</td><td style="padding:8px 12px;color:#555;border-bottom:1px solid #eee;">${v}</td></tr>`)
        .join('')
    : '';

  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:30px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;max-width:100%;">
  <tr><td style="background-color:#59d153;padding:20px 40px;">
    <h1 style="color:#ffffff;font-size:20px;margin:0;">📩 Nuovo contatto da ${data.source}</h1>
  </td></tr>
  <tr><td style="padding:30px 40px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:8px;overflow:hidden;">
      <tr><td style="padding:8px 12px;font-weight:bold;color:#1c1e1c;border-bottom:1px solid #eee;width:140px;">Nome</td><td style="padding:8px 12px;color:#555;border-bottom:1px solid #eee;">${data.name || '—'}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;color:#1c1e1c;border-bottom:1px solid #eee;">Email</td><td style="padding:8px 12px;color:#555;border-bottom:1px solid #eee;"><a href="mailto:${data.email}" style="color:#59d153;">${data.email}</a></td></tr>
      <tr><td style="padding:8px 12px;font-weight:bold;color:#1c1e1c;border-bottom:1px solid #eee;">Telefono</td><td style="padding:8px 12px;color:#555;border-bottom:1px solid #eee;">${data.phone || '—'}</td></tr>
      ${data.sector ? `<tr><td style="padding:8px 12px;font-weight:bold;color:#1c1e1c;border-bottom:1px solid #eee;">Settore</td><td style="padding:8px 12px;color:#555;border-bottom:1px solid #eee;">${data.sector}</td></tr>` : ''}
      ${extraRows}
      ${data.message ? `<tr><td style="padding:8px 12px;font-weight:bold;color:#1c1e1c;vertical-align:top;">Messaggio</td><td style="padding:8px 12px;color:#555;">${data.message}</td></tr>` : ''}
    </table>
    <p style="color:#8c8c8c;font-size:12px;margin:20px 0 0;">Inviato il ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}</p>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

export async function sendContactEmails(data: ContactData): Promise<{ success: boolean }> {
  try {
    // Send welcome email to client
    const welcomePromise = supabase.functions.invoke('send-email', {
      body: {
        to: data.email,
        subject: 'Grazie per averci contattato — ZAPPER®',
        html: buildWelcomeEmailHtml(data),
        from: 'ZAPPER® <info@mail.smokezapper.it>',
        replyTo: 'info@smokezapper.it',
      },
    });

    // Send notification to company
    const notifyPromise = supabase.functions.invoke('send-email', {
      body: {
        to: 'info@smokezapper.it',
        subject: `Nuovo contatto: ${data.name || data.email} — ${data.source}`,
        html: buildNotificationEmailHtml(data),
        from: 'ZAPPER® <info@mail.smokezapper.it>',
        replyTo: 'info@smokezapper.it',
      },
    });

    const [welcomeRes, notifyRes] = await Promise.all([welcomePromise, notifyPromise]);

    if (welcomeRes.error) console.error('Welcome email error:', welcomeRes.error);
    if (notifyRes.error) console.error('Notification email error:', notifyRes.error);

    return { success: !welcomeRes.error && !notifyRes.error };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false };
  }
}
