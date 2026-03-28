export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '*';
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
          'Access-Control-Allow-Headers': 'Content-Type, X-Disrupt-Token, Accept, Origin, Cache-Control',
          'Access-Control-Max-Age': '86400',
          'Access-Control-Allow-Credentials': 'false',
        },
      });
    }
    if (request.method !== 'POST') { return jsonError(405, 'Method not allowed', origin); }
    const incomingToken = request.headers.get('X-Disrupt-Token');
    if (!env.DISRUPT_TOKEN || incomingToken !== env.DISRUPT_TOKEN) { return jsonError(401, 'Unauthorized', origin); }
    let body;
    try { body = await request.json(); }
    catch { return jsonError(400, 'Invalid JSON body', origin); }
    const url = new URL(request.url);
    if (url.pathname === '/ai' || url.pathname === '/') { return handleAI(body, env, origin); }
    if (url.pathname === '/deliver') { return handleDeliver(body, env, origin); }
    return jsonError(404, 'Not found', origin);
  },
};
async function handleAI(body, env, origin) {
  const model = body.model || 'claude-sonnet-4-5';
  const maxTok = Math.min(body.max_tokens || 4000, 4000);
  const system = body.system || '';
  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) { return jsonError(400, 'messages array required', origin); }
  const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model, max_tokens: maxTok, system, messages }),
  });
  const data = await anthropicRes.json();
  if (!anthropicRes.ok) { return new Response(JSON.stringify(data), { status: anthropicRes.status, headers: corsHeaders(origin) }); }
  return new Response(JSON.stringify(data), { status: 200, headers: corsHeaders(origin) });
}
async function handleDeliver(body, env, origin) {
  const { businessName, answers, output } = body;
  const name = businessName || 'Unknown Business';
  const ts = new Date().toISOString();
  const subject = 'DISRUPT New Strategy Package: ' + name;
  const jobs = [];
  if (env.RESEND_API_KEY && env.NOTIFY_EMAIL) { jobs.push(sendEmail(env, subject, name, ts, answers, output)); }
  if (env.SHEETS_WEBHOOK_URL) { jobs.push(logToSheets(env, name, ts, answers, output)); }
  const results = await Promise.allSettled(jobs);
  const errors = results.filter(r => r.status === 'rejected').map(r => r.reason?.message);
  return new Response(JSON.stringify({ ok: true, delivered: jobs.length, errors }), { status: 200, headers: corsHeaders(origin) });
}
async function buildEmailHtml(name, ts, answers, output) {
  const rows = Object.entries(answers).map(function(entry) {
    const k = entry[0]; const v = entry[1]; let val;
    if (Array.isArray(v)) { val = v.join(', '); }
    else if (v && typeof v === 'object') { val = Object.entries(v).map(function(e) { return e[0] + ': ' + e[1] + '/5'; }).join(' | '); }
    else { val = v || ''; }
    return '<tr><td style="padding:6px 10px;border-bottom:1px solid #eee;color:#888;font-size:12px;width:30%;vertical-align:top">' + k + '</td><td style="padding:6px 10px;border-bottom:1px solid #eee;font-size:12px;vertical-align:top">' + val + '</td></tr>';
  }).join('');
  const brand = (output.brand || '').substring(0, 2000);
  const personas = (output.personas || '').substring(0, 2000);
  const roadmap = (output.roadmap || '').substring(0, 2000);
  return ['<html><body style="font-family:Arial,sans-serif;margin:0;padding:0;background:#f5f5f5">',
    '<div style="max-width:680px;margin:0 auto;background:#fff">',
    '<div style="background:#0A0A0A;padding:20px 28px;border-bottom:3px solid #7DC422"><span style="font-size:22px;color:#fff;font-weight:900;letter-spacing:2px">DISRUPT</span><span style="color:#7DC422;font-size:22px;font-weight:900">.</span></div>',
    '<div style="padding:20px 28px;border-bottom:1px solid #eee"><h2 style="margin:0 0 4px;font-size:20px;color:#1A1A1A">' + name + '</h2><p style="margin:0;color:#888;font-size:12px">' + ts + '</p></div>',
    '<div style="padding:20px 28px"><table style="width:100%;border-collapse:collapse;background:#fafafa">' + rows + '</table></div>',
    '<div style="padding:0 28px 28px">',
    '<p style="font-size:13px;font-weight:700;color:#7DC422;margin:20px 0 8px">BRAND GUIDELINES</p><pre style="background:#f9f9f9;padding:14px;font-size:11px;white-space:pre-wrap;border-left:3px solid #7DC422;margin:0">' + brand + '</pre>',
    '<p style="font-size:13px;font-weight:700;color:#7DC422;margin:20px 0 8px">CUSTOMER PERSONAS</p><pre style="background:#f9f9f9;padding:14px;font-size:11px;white-space:pre-wrap;border-left:3px solid #7DC422;margin:0">' + personas + '</pre>',
    '<p style="font-size:13px;font-weight:700;color:#7DC422;margin:20px 0 8px">90-DAY ROADMAP</p><pre style="background:#f9f9f9;padding:14px;font-size:11px;white-space:pre-wrap;border-left:3px solid #7DC422;margin:0">' + roadmap + '</pre>',
    '</div><div style="background:#0A0A0A;padding:14px 28px;text-align:center"><span style="font-size:10px;color:#555">DISRUPT MEDIA AUTOMATED DELIVERY</span></div>',
    '</div></body></html>'].join('');
}
async function sendEmail(env, subject, name, ts, answers, output) {
  const html = await buildEmailHtml(name, ts, answers, output);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + env.RESEND_API_KEY },
    body: JSON.stringify({ from: 'DISRUPT Media <onboarding@resend.dev>', to: [env.NOTIFY_EMAIL], subject: subject, html: html }),
  });
  if (!res.ok) { const err = await res.json(); throw new Error('Resend error: ' + JSON.stringify(err)); }
}
async function logToSheets(env, name, ts, answers, output) {
  const flatAnswers = Object.fromEntries(Object.entries(answers).map(function(entry) {
    const k = entry[0]; const v = entry[1]; let val;
    if (Array.isArray(v)) { val = v.join(', '); }
    else if (v && typeof v === 'object') { val = Object.entries(v).map(function(e) { return e[0] + ':' + e[1]; }).join('|'); }
    else { val = v || ''; }
    return [k, val];
  }));
  const res = await fetch(env.SHEETS_WEBHOOK_URL, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ timestamp: ts, businessName: name, answers: flatAnswers, brandLength: (output.brand||'').length, personasLength: (output.personas||'').length, roadmapLength: (output.roadmap||'').length, brandPreview: (output.brand||'').substring(0,500), roadmapPreview: (output.roadmap||'').substring(0,500) }),
  });
  if (!res.ok) throw new Error('Sheets webhook error: ' + res.status);
}
function corsHeaders(origin) {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
    'Access-Control-Allow-Headers': 'Content-Type, X-Disrupt-Token, Accept, Origin, Cache-Control',
    'Access-Control-Max-Age': '86400',
    'Access-Control-Allow-Credentials': 'false',
    'Vary': 'Origin',
  };
}
function jsonError(status, message, origin) {
  return new Response(JSON.stringify({ error: message }), { status, headers: corsHeaders(origin || '*') });
}
