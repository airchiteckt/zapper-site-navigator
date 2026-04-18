const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend'
const PDF_URL = 'https://npyygvuhmxrvccaczifw.supabase.co/storage/v1/object/public/media/guides/zapper-guida-tecnica-abbattimento-fumi.pdf'
const LOGO_URL = 'https://npyygvuhmxrvccaczifw.supabase.co/storage/v1/object/public/media/logo-zapper-verde.svg'

const Schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(40),
  source: z.string().max(120).optional(),
  page_url: z.string().max(500).optional(),
})

function buildEmailHtml(name: string): string {
  return `<!DOCTYPE html>
<html lang="it"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:30px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:100%;">
  <tr><td style="background:#1c1e1c;padding:30px 40px;text-align:center;">
    <img src="${LOGO_URL}" alt="ZAPPER®" width="160" style="display:block;margin:0 auto;" />
  </td></tr>
  <tr><td style="padding:40px;">
    <h1 style="color:#1c1e1c;font-size:24px;margin:0 0 16px;">Ecco la tua guida tecnica${name ? `, ${name}` : ''}!</h1>
    <p style="color:#555;font-size:16px;line-height:1.6;margin:0 0 16px;">
      Grazie per il tuo interesse. Come promesso, in allegato trovi la <strong>Guida tecnica all'abbattimento fumi</strong>:
    </p>
    <ul style="color:#555;font-size:15px;line-height:1.8;margin:0 0 20px;padding-left:20px;">
      <li>I 7 errori più costosi che vediamo sul campo</li>
      <li>Checklist normativa aggiornata (D.Lgs. 152/2006, ARPA, Comuni)</li>
      <li>Tabella diagnostica: dal sintomo alla soluzione</li>
      <li>Case study reale di una pizzeria a Napoli</li>
    </ul>
    <table cellpadding="0" cellspacing="0" style="margin:24px 0;"><tr>
      <td style="background:#59d153;border-radius:8px;padding:14px 28px;">
        <a href="${PDF_URL}" style="color:#ffffff;font-size:16px;font-weight:bold;text-decoration:none;">📄 Scarica la guida (PDF)</a>
      </td>
    </tr></table>
    <p style="color:#555;font-size:15px;line-height:1.6;margin:20px 0 16px;">
      Vuoi una <strong>valutazione tecnica gratuita</strong> sul tuo caso specifico? Un nostro tecnico ti ricontatterà entro 24-48 ore lavorative al numero che hai indicato.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f6;border-radius:8px;margin:20px 0;">
    <tr><td style="padding:18px;">
      <p style="color:#1c1e1c;font-size:14px;font-weight:bold;margin:0 0 8px;">Hai bisogno subito di assistenza?</p>
      <p style="color:#555;font-size:14px;line-height:1.8;margin:0;">
        📞 <a href="tel:+3908119968436" style="color:#59d153;text-decoration:none;">+39 081 199 68 436</a> &nbsp;•&nbsp;
        ✉️ <a href="mailto:info@smokezapper.it" style="color:#59d153;text-decoration:none;">info@smokezapper.it</a>
      </p>
    </td></tr></table>
  </td></tr>
  <tr><td style="background:#1c1e1c;padding:20px 40px;text-align:center;">
    <p style="color:#8c8c8c;font-size:12px;line-height:1.6;margin:0;">
      ZAPPER® — Via Galileo Ferraris 24, Scafati (SA) 84018<br/>
      <a href="https://www.smokezapper.it" style="color:#59d153;text-decoration:none;">www.smokezapper.it</a>
    </p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`
}

function buildNotificationHtml(name: string, email: string, phone: string, source: string, pageUrl: string): string {
  return `<!DOCTYPE html><html lang="it"><body style="font-family:Arial;margin:0;padding:30px;background:#f4f4f4;">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;margin:0 auto;">
  <tr><td style="background:#59d153;padding:20px 30px;"><h1 style="color:#fff;font-size:20px;margin:0;">📥 Lead magnet scaricato</h1></td></tr>
  <tr><td style="padding:24px 30px;">
    <p style="color:#555;font-size:14px;margin:0 0 16px;">Un nuovo utente ha richiesto la guida PDF.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:8px;">
      <tr><td style="padding:10px 14px;font-weight:bold;width:140px;border-bottom:1px solid #eee;">Nome</td><td style="padding:10px 14px;border-bottom:1px solid #eee;">${name}</td></tr>
      <tr><td style="padding:10px 14px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:10px 14px;border-bottom:1px solid #eee;"><a href="mailto:${email}" style="color:#59d153;">${email}</a></td></tr>
      <tr><td style="padding:10px 14px;font-weight:bold;border-bottom:1px solid #eee;">Telefono</td><td style="padding:10px 14px;border-bottom:1px solid #eee;"><a href="tel:${phone}" style="color:#59d153;">${phone}</a></td></tr>
      <tr><td style="padding:10px 14px;font-weight:bold;border-bottom:1px solid #eee;">Sorgente</td><td style="padding:10px 14px;border-bottom:1px solid #eee;">${source}</td></tr>
      <tr><td style="padding:10px 14px;font-weight:bold;">Pagina</td><td style="padding:10px 14px;font-size:12px;color:#888;">${pageUrl}</td></tr>
    </table>
    <p style="color:#888;font-size:12px;margin:16px 0 0;">Inviato il ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}</p>
  </td></tr>
</table></body></html>`
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY_1') || Deno.env.get('RESEND_API_KEY')
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) throw new Error('Missing email API keys')

    const body = await req.json()
    const parsed = Schema.safeParse(body)
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    const { name, email, phone, source = 'lead_magnet_guida', page_url = '' } = parsed.data

    // Save to DB
    const supabase = createClient(SUPABASE_URL, SERVICE_KEY)
    await supabase.from('form_submissions').insert({
      source, name, email, phone, page_url,
      message: 'Download lead magnet: Guida tecnica abbattimento fumi',
      extra: { lead_magnet: 'guida-tecnica-abbattimento-fumi' },
      email_sent: false,
    })

    // Send emails in parallel
    const sendEmail = (to: string, subject: string, html: string) =>
      fetch(`${GATEWAY_URL}/emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'X-Connection-Api-Key': RESEND_API_KEY,
        },
        body: JSON.stringify({
          from: 'ZAPPER® <info@email.smokezapper.it>',
          to: [to],
          subject,
          html,
          reply_to: 'info@smokezapper.it',
        }),
      })

    const [userRes, notifRes] = await Promise.all([
      sendEmail(email, '📄 La tua guida tecnica ZAPPER® è qui', buildEmailHtml(name)),
      sendEmail('info@smokezapper.it', `📥 Lead magnet — ${name} (${phone})`, buildNotificationHtml(name, email, phone, source, page_url)),
    ])

    const ok = userRes.ok && notifRes.ok
    if (!ok) {
      const errorText = await Promise.all([userRes.text(), notifRes.text()])
      console.error('Email error:', errorText)
    }

    return new Response(JSON.stringify({ success: true, pdf_url: PDF_URL }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  } catch (error) {
    console.error('Lead magnet error:', error)
    const msg = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ success: false, error: msg }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
