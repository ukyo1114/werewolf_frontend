'use client';

import React from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Stack, Input } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { VALIDATION_ERR } from '@/lib/messages';

type EmailPayload = {
  email: string;
};

/* type EmailResponse = {
  success: boolean;
  message: string;
}; */

async function sendEmailAdress(data: EmailPayload): Promise<void> {
  const api = process.env.NEXT_PUBLIC_SERVER_URL;
  await axios.post(`${api}/register-user`, data);
}

export default function RegistrationEmailSender() {
  const mutation = useMutation({
    mutationFn: sendEmailAdress,
    onSuccess: () => {
      // TODO: ページの切り替え
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || 'メールの送信に失敗しました。';
      toaster.create({
        description: errorMessage,
        type: 'error',
      });
    },
  });

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(VALIDATION_ERR.INVALID_EMAIL)
        .required(VALIDATION_ERR.REQUIRED_EMAIL),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <div>
      <h1>ユーザー登録</h1>
      <p>以下のフォームにメールアドレスを入力してください。</p>
      <p>ユーザー登録用リンクが記載されたメールを送信します。</p>
      <form onSubmit={formik.handleSubmit}>
        <Stack>
          <Field label="メールアドレス">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="メールアドレス"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: 'red' }}>{formik.errors.email}</div>
            ) : null}
          </Field>

          <Button
            type="submit"
            loading={formik.isSubmitting}
            colorPalette="teal"
          >
            登録
          </Button>
        </Stack>
      </form>
    </div>
  );
}
