"use client"
import { BudgetLayout } from "@/components/quiz/BudgetLayout";
import { LocalisationLayout } from "@/components/quiz/LocalisationLayout";
import { ServiceLayout } from "@/components/quiz/ServiceLayout";
import { Button, Group, Stepper } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
export default function Quiz() {
    const [active, setActive] = useState(1);

    const data = [
        {
            label: "Séjour",
            description: "Budget, nombre de personne...",
            content:

                <BudgetLayout />
        },
        {
            label: "Localisation",
            description: "Le type d'environnement désiré",
            content:
                <LocalisationLayout />
        },
        {
            label: "Service",
            description: "Installation et service désiré",
            content:
                <ServiceLayout />
        }
    ]
    return (
        <>
            <Stepper active={active} onStepClick={setActive}>
                {data.map((d, index) => (
                    <Stepper.Step
                        label={d.label}
                        description={d.description}
                    >
                        {d.content}
                    </Stepper.Step>
                ))}
            </Stepper>
            <Group justify="center" mt="xl">
                <Button variant="default" onClick={() => setActive((current) => current - 1)} disabled={active === 0}>Précédent</Button>
                {data.length - 1 === active ? (
                    <Button component={Link} href="/quiz/result">Voir le résultat</Button>
                ) : <Button onClick={() => setActive((current) => current + 1)} >Suivant</Button>
                }
            </Group >
        </>
    )
}