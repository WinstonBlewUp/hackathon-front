"use client"
import { Button } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AllLink = () => {

    const params = usePathname();
    const page = params.split("/")[1]
    const { data: session } = useSession();
    return (
        <>
            <Button variant='transparent' component={Link} href={"/categories"} sx={{ ["&:hover"]: { textDecoration: "underline" } }} c={page !== "categories" ? "var(--mantine-color-gray-2)" : "white"}  >
                Catégorie
            </Button>
            <Button variant='transparent' component={Link} href={"/quiz"} sx={{ ["&:hover"]: { textDecoration: "underline" } }} c={page !== "quiz" ? "var(--mantine-color-gray-2)" : "white"} >
                Quiz
            </Button>
            {!!session && (

                <Button variant='transparent' component={Link} href={"/profile/negotiations"} sx={{ ["&:hover"]: { textDecoration: "underline" } }} c={page !== "negotiation" ? "var(--mantine-color-gray-2)" : "white"} >
                    Négociation
                </Button>
            )}
            {!!session ?
                <Button variant='transparent' component={Link} href={"/profile"} sx={{ ["&:hover"]: { textDecoration: "underline" } }} c={page !== "profile" ? "var(--mantine-color-gray-2)" : "white"} >
                    <IconUser />
                </Button>
                :
                <Button variant='transparent' component={Link} href={"/login"} sx={{ ["&:hover"]: { textDecoration: "underline" } }} c={page !== "login" ? "var(--mantine-color-gray-2)" : "white"} >
                    Se connecter
                </Button>
            }

        </>
    )
}