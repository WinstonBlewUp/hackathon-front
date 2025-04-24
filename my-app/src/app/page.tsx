"use client"
import { Button, Text } from "@mantine/core";
import HomeComponent from "../components/root/home/Home";
// OPEN GDS
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      {session && (<>
        <Text>Bienvenue :  {session?.user?.email}</Text>
        <Button onClick={() => signOut()}>Deco</Button></>
      )}
      <HomeComponent />
    </>
  );
}
