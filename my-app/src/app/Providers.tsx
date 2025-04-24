// app/Providers.tsx
"use client";

import { MantineProvider } from "@mantine/core";
import { MantineEmotionProvider, emotionTransform } from "@mantine/emotion";
import { RootStyleRegistry } from "./EmotionRootStyleRegistry";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <RootStyleRegistry>
                <MantineEmotionProvider>
                    <MantineProvider stylesTransform={emotionTransform} defaultColorScheme="dark">
                        {children}
                    </MantineProvider>
                </MantineEmotionProvider>
            </RootStyleRegistry>
        </SessionProvider>
    );
}
