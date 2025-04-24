"use client";
import {
    Burger, Button, Drawer, Flex, Stack, Text
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link"
import { AllLink } from "./AllLink";

export const HeaderComponent = () => {

    const [opened, { close, toggle }] = useDisclosure(false);
    return (
        <Stack pos="fixed" sx={{
            zIndex: 100,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(2.5px)",
            WebkitBackdropFilter: "blur(2.5px)"
        }} w="100%" px="xl" py="sm" >

            <Flex justify='space-between' >
                <Text component={Link} href={"/"}>Logo</Text>
                <Flex visibleFrom="sm">
                    <AllLink />
                </Flex>
                <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" hiddenFrom="sm" />

            </Flex>
            <Drawer opened={opened} onClose={close} position="right" size="sm">
                <Stack>
                    <AllLink />

                </Stack>
            </Drawer>
        </Stack >
    )
}

