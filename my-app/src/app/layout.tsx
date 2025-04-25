import type { Metadata } from "next";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';
import { Box, ColorSchemeScript, mantineHtmlProps, Space, Stack } from "@mantine/core";
import { HeaderComponent } from "@/components/header/HeaderComponent";
import { Providers } from "./Providers";


export const metadata: Metadata = {
  title: "Matchroom - Trouvez votre chambre au prix idéal",
  description: "Réservez votre hôtel, tout le monde y gagne",
  icons:{
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" {...mantineHtmlProps}>
      <head>
        <link rel="icon" href="/favicon.png?v=2" type="image/png" />
        <ColorSchemeScript />
      </head>
      <body suppressHydrationWarning style={{ minHeight: '100vh', width: "100vw", overflowX: "hidden" }}>
        <Providers>
          <header>
            <HeaderComponent />
          </header>
          <Space h={60} />
          <Box px={{ base: 20, md: 40, lg: 50 }}  >
            <main>
              <Stack gap={100}>
                {children}
              </Stack>
            </main>
          </Box>
        </Providers>
      </body >
    </html >
  );
}
