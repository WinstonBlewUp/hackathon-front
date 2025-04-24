// app/Providers.tsx
"use client";

import { MantineProvider } from "@mantine/core";
import { MantineEmotionProvider, emotionTransform } from "@mantine/emotion";
import { RootStyleRegistry } from "./EmotionRootStyleRegistry";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <RootStyleRegistry>
                <MantineEmotionProvider>
                    <MantineProvider stylesTransform={emotionTransform}
                        /* defaultColorScheme="dark" */
                        theme={{
                            fontFamily: 'Satoshi, sans-serif',
                            primaryColor: "dark",
                            headings: { fontFamily: 'Playfair, sans-serif' },
                            colors: {
                                gray: ["#F7F4F2", "#F0EBE7", "#DFD6D0", "#D5C9C1", "#BDB1A9", "#AA9D94", "#998B82", "#81746B", "#6B5F58", "#564E49"],
                                beige: ["#FFF8F2", "#FFFCFA", "#FFFCFA", "#FFFCFA", "#FFFCFA", "#FFFCFA", "#FFFCFA", "#FFF8F2", "#FFF8F2", "#FFF8F2",],
                                dark: ["#0E0F1A", "#0E0F1A", "#0E0F1A", "#0E0F1A", "#0E0F1A", "#0E0F1A", "#0E0F1A", "#0E0F1A", "#0E0F1A", "#0E0F1A", "#0E0F1A"]
                            },
                            white: "#FFFCFA",
                            black: "#0E0F1A"
                        }}>
                        {children}
                    </MantineProvider>
                </MantineEmotionProvider>
            </RootStyleRegistry>
        </SessionProvider>
    );
}
