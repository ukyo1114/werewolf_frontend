'use client';

import ChannelProvider from '@/context/ChannelProvider';

export default function ChannelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChannelProvider>{children}</ChannelProvider>;
}
// 状態によって切り替え
// サイドバーを表示　モバイルでは非表示
// ヘッダーを表示　状態によって切り替え
// メインコンテンツを表示
