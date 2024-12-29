'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box, Container } from '@chakra-ui/react';
import { UiProvider } from '@/components/ui/provider';
import UserProvider from '@/context/UserProvider';
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html suppressHydrationWarning>
      <body>
        <UiProvider>
          <Box h="100svh" bg={{ base: 'white', _dark: 'gray.950' }}>
            <Container maxW="xl">
              <Toaster />
              <QueryClientProvider client={queryClient}>
                <UserProvider>{children}</UserProvider>
              </QueryClientProvider>
            </Container>
          </Box>
        </UiProvider>
      </body>
    </html>
  );
}
