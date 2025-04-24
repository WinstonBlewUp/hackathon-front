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
            <Button variant='transparent' component={Link} href={"/categories"} sx={{ ["&:hover"]: { textDecoration: "underline" } }} color={page === "categories" ? "red" : "black"}  >
                Catégorie
            </Button>
            <Button variant='transparent' component={Link} href={"/quiz"} sx={{ ["&:hover"]: { textDecoration: "underline" } }} color={page === "quiz" ? "red" : "black"} >
                Quiz
            </Button>
            {!!session && (

                <Button variant='transparent' component={Link} href={"/profile/negotiation"} sx={{ ["&:hover"]: { textDecoration: "underline" } }} color={page === "negotiation" ? "red" : "black"} >
                    Négociation
                </Button>
            )}
            {!!session ?
                <Button variant='transparent' component={Link} href={"/profile"} sx={{ ["&:hover"]: { textDecoration: "underline" } }} color={page === "profile" ? "red" : "black"} >
                    <IconUser />
                </Button>
                :
                <Button variant='transparent' component={Link} href={"/login"} sx={{ ["&:hover"]: { textDecoration: "underline" } }} color={page === "login" ? "red" : "black"} >
                    Se connecter
                </Button>
            }

        </>
    )
}