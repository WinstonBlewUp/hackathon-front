'use client';

import { Button, Flex, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import Link from "next/link";
import { useState } from "react";

export default function RegistryPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [birthday, setBirthday] = useState<Date | null>()


    const handleSubmit = async (e: React.FormEvent) => {
        console.log("lala")
    };
    return (
        <>
            <Title order={1} size="xl" mb="md">S'inscrire</Title>
            <Stack component="form" onSubmit={handleSubmit}>
                <Flex gap="md">
                    <TextInput value={firstname} onChange={e => setFirstname(e.target.value)} placeholder="Prénom" />
                    <TextInput value={lastname} onChange={e => setLastname(e.target.value)} placeholder="Nom" />
                </Flex>
                <TextInput value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <PasswordInput value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" />
                <PasswordInput value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Comfirme ton mot de passe" />
                <DateInput value={birthday} onChange={setBirthday} placeholder="Ton anniversaire" />
                <Button type="submit" fullWidth>Inscription</Button>
            </Stack>
            <Button href="/login" component={Link} variant="transparent" fullWidth mt="lg">Déjà un compte ? Se connecter</Button>

        </>
    );
}
