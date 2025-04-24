"use client";
import {
    Burger, Button, Drawer, Flex, Stack, Text
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link"
import { usePathname } from "next/navigation";

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

const AllLink = () => {
    const params = usePathname();
    const page = params.split("/")[1]
    return (
        <>        <Button variant='transparent' component={Link} href={"/categories"} sx={{ ["&:hover"]: { textDecoration: "underline" } }} color={page === "categories" ? "red" : "black"}  >
            Catégorie
        </Button>
            <Button variant='transparent' component={Link} href={"/quiz"} sx={{ ["&:hover"]: { textDecoration: "underline" } }} color={page === "quiz" ? "red" : "black"} >
                Quiz
            </Button>
            <Button variant='transparent' component={Link} href={"/negotiation"} sx={{ ["&:hover"]: { textDecoration: "underline" } }} color={page === "negotiation" ? "red" : "black"} >
                Négociation
            </Button>
            <Button variant='transparent' component={Link} href={"/profile"} sx={{ ["&:hover"]: { textDecoration: "underline" } }} color={page === "profile" ? "red" : "black"} >
                Mon Compte
            </Button></>
    )
}