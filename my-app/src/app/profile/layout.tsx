import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Box, Stack } from "@mantine/core";

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    console.log(session)
    if (!session) redirect("/login")
    return <Stack gap="lg" mt="xl">{children}</Stack>;
}
