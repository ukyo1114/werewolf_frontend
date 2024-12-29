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
      <Link href="/register-user">ログイン</Link>
      <Link href="/register-user">チャンネルリスト</Link>
      <Link href="/register-user">ユーザー登録</Link>
      <Link href="/register-user">説明書</Link>
      <Button onClick={() => router.push('/register-user')}>
        ユーザー登録
      </Button>
    </Stack>
  );
}
