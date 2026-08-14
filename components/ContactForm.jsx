'use client';

import { useState } from 'react';
import { useLang } from '../lib/lang';

const TXT = {
  ru: {
    name: 'Имя', company: 'Компания', phone: 'Телефон', email: 'Email',
    message: 'Опишите задачу', messagePh: 'Идея, чертёж, деталь для замены — расскажите подробнее',
    file: 'Прикрепить файл (чертёж, фото)', submit: 'Отправить заявку', choose: 'Выбрать файл', noFile: 'Файл не выбран',
    sending: 'Отправка…', ok: 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.',
    err: 'Не удалось отправить. Проверьте поля и попробуйте снова.',
    required: 'Укажите имя, сообщение и телефон или email.',
  },
  en: {
    name: 'Name', company: 'Company', phone: 'Phone', email: 'Email',
    message: 'Describe the task', messagePh: 'An idea, a drawing, a part to replace — tell us more',
    file: 'Attach a file (drawing, photo)', submit: 'Send request', choose: 'Choose file', noFile: 'No file chosen',
    sending: 'Sending…', ok: "Request sent. We'll get back to you shortly.",
    err: 'Could not send. Check the fields and try again.',
    required: 'Please provide name, message, and phone or email.',
  },
};

export default function ContactForm() {
  const [lang] = useLang();
  const t = TXT[lang] || TXT.ru;
  const [state, setState] = useState('idle');
  const [fileName, setFileName] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!data.get('name') || !data.get('message') || (!data.get('phone') && !data.get('email'))) {
      setState('required');
      return;
    }
    setState('sending');
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: data });
      if (!res.ok) throw new Error();
      setState('ok');
      form.reset();
    } catch {
      setState('err');
    }
  };

  if (state === 'ok') return <p className="lead">{t.ok}</p>;

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="cf-row">
        <label>
          <span className="mono">{t.name}</span>
          <input type="text" name="name" required />
        </label>
        <label>
          <span className="mono">{t.company}</span>
          <input type="text" name="company" />
        </label>
      </div>
      <div className="cf-row">
        <label>
          <span className="mono">{t.phone}</span>
          <input type="tel" name="phone" />
        </label>
        <label>
          <span className="mono">{t.email}</span>
          <input type="email" name="email" />
        </label>
      </div>
      <label>
        <span className="mono">{t.message}</span>
        <textarea name="message" rows={5} placeholder={t.messagePh} required />
      </label>
      <div className="cf-file">
        <span className="mono">{t.file}</span>
        <div className="cf-file-row">
          <label className="cf-file-btn">
            {t.choose}
            <input
              type="file"
              name="file"
              accept=".pdf,.jpg,.jpeg,.png,.dwg,.dxf,.step,.stp"
              onChange={(e) => setFileName(e.target.files[0]?.name || '')}
            />
          </label>
          <span className="cf-file-name">{fileName || t.noFile}</span>
        </div>
      </div>

      <button className="btn" type="submit" disabled={state === 'sending'}>
        <span className="dot" />{state === 'sending' ? t.sending : t.submit}
      </button>

      {state === 'required' && <p className="cf-msg cf-err">{t.required}</p>}
      {state === 'err' && <p className="cf-msg cf-err">{t.err}</p>}
    </form>
  );
}
