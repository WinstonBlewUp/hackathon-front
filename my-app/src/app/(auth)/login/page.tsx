'use client';

import { Button, Paper, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("admin@site.com");
    const [password, setPassword] = useState("admin");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await signIn("credentials", {
            email,
            password,
            callbackUrl: "/profile",
        });
    };
    return (
        <>
            <Title order={1} size="xl" mb="md">Se connecter</Title>
            <Stack component="form" onSubmit={handleSubmit}>
                <TextInput value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <PasswordInput value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                <Button type="submit" fullWidth>Connexion</Button>
            </Stack>
            <Button href="/registry" component={Link} variant="transparent" fullWidth mt="lg">Pas de compte ? S'inscrire</Button>
        </>
    );
}
