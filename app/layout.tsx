'use client';

import { UiProvider } from '@/components/ui/provider';
import UserProvider from '@/context/UserProvider';

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body>
        <UiProvider>
          <UserProvider>{children}</UserProvider>
        </UiProvider>
      </body>
    </html>
  );
}
