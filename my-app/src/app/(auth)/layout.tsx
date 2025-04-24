import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Paper } from "@mantine/core";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    if (session) redirect("/profile")
    return (
        <Paper shadow="md" w={350} p="lg" mt="20vh" mx="auto">
            {children}
        </Paper>
    );
}
