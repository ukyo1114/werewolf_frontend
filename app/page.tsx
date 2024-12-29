'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Stack } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();

  return (
    <Stack>
      <h1>トップページ</h1>
      <Link href="/login">ログイン</Link>
      <Link href="/channel">チャンネルリスト</Link>
      <Link href="/register-user">ユーザー登録</Link>
      <Link href="/manual">説明書</Link>
      <Button onClick={() => router.push('/register-user')}>
        ユーザー登録
      </Button>
    </Stack>
  );
}
