import { createClient } from '@sanity/client';
import { NextResponse } from 'next/server';

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST(req) {
  try {
    const form = await req.formData();
    const name = (form.get('name') || '').toString().trim();
    const company = (form.get('company') || '').toString().trim();
    const phone = (form.get('phone') || '').toString().trim();
    const email = (form.get('email') || '').toString().trim();
    const message = (form.get('message') || '').toString().trim();
    const file = form.get('file');

    if (!name || !message || (!phone && !email)) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
    }

    let attachment;
    if (file && typeof file === 'object' && file.size > 0) {
      const buf = Buffer.from(await file.arrayBuffer());
      const asset = await writeClient.assets.upload('file', buf, { filename: file.name });
      attachment = { _type: 'file', asset: { _type: 'reference', _ref: asset._id } };
    }

    await writeClient.create({
      _type: 'inquiry',
      name,
      company,
      phone,
      email,
      message,
      attachment,
      createdAt: new Date().toISOString(),
      status: 'new',
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
