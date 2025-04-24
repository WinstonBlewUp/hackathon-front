"use client";
import {
    Box,
    Burger, Drawer, Flex, Image, Stack, Text
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link"
import { AllLink } from "./AllLink";
import logo from "../../../public/logo.svg"

export const HeaderComponent = () => {
    const [opened, { close, toggle }] = useDisclosure(false);
    return (
        <Stack pos="fixed" h={60} sx={{
            zIndex: 100,
            background: "rgba(14, 15, 26, 1)",
            backdropFilter: "blur(2.5px)",
            WebkitBackdropFilter: "blur(2.5px)"
        }} w="100%" px="xl"   >

            <Flex justify='space-between' h="100%" py="md">
                <Box component={Link} href={"/"} ><Image src={logo.src} h="100%" /></Box>
                <Flex visibleFrom="sm" h="100%" align='center'>
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

