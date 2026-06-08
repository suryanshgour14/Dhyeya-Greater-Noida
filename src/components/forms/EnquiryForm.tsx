'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { enquirySchema, type EnquiryFormData } from '@/lib/validations';
import { sendEnquiry } from '@/lib/emailjs';

export default function EnquiryForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({ resolver: zodResolver(enquirySchema) });

  async function onSubmit(data: EnquiryFormData) {
    setStatus('loading');
    try {
      await sendEnquiry(data);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">{t('form.name')}</Label>
        <Input id="name" placeholder={t('form.namePlaceholder')} {...register('name')} />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">{t('form.email')}</Label>
        <Input id="email" type="email" placeholder={t('form.emailPlaceholder')} {...register('email')} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <div className="space-y-1">
        <Label htmlFor="phone">{t('form.phone')}</Label>
        <Input id="phone" placeholder={t('form.phonePlaceholder')} {...register('phone')} />
        {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
      </div>
      <div className="space-y-1">
        <Label htmlFor="message">{t('form.message')}</Label>
        <Textarea id="message" rows={4} placeholder={t('form.messagePlaceholder')} {...register('message')} />
      </div>
      {status === 'success' && <p className="text-sm text-green-600">{t('form.success')}</p>}
      {status === 'error' && <p className="text-sm text-destructive">{t('form.error')}</p>}
      <Button type="submit" disabled={status === 'loading'} className="w-full bg-brand-orange hover:bg-brand-orange/90">
        {status === 'loading' ? t('form.submitting') : t('form.submit')}
      </Button>
    </form>
  );
}
