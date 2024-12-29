'use client';

import { Stack } from '@chakra-ui/react';
import { useChannelState } from '@/context/ChannelProvider';

export default function Channel() {
  const { channel } = useChannelState();
  const { mode } = channel;

  return <Stack>{mode === 'list' ? null : null}</Stack>;
}

// サイドバーの表示
// チャンネル関連コンポーネントの表示
