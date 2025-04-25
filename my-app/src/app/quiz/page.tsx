"use client"
import { BudgetLayout } from "@/components/quiz/BudgetLayout";
import { ServiceLayout } from "@/components/quiz/ServiceLayout";
import { Button, Group, Stepper, StepperCompleted } from "@mantine/core";
import { useState } from "react";
import { Result } from "@/components/quiz/Result";
import { QuizRequestData, RoomData } from "@/types/data";
import { postQuiz } from "@/lib/axios";
export default function Quiz() {
    const [active, setActive] = useState(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [dataRequest, setDataRequest] = useState<QuizRequestData>({
        startDate: null,
        endDate: null,
        maxGuests: 0,
        criteriaHotel: {
            children: false,
            animal: false,
            typeCity: null,
            transport: [],
            restoration: null,
            wellness: [],
            business: [],
            comfort: [],
            addServices: [],
            pmr: false,
            baby: false,
            category: null,
        },
    })
    const [dataResponse, setDataResponse] = useState<RoomData[]>()
    const data = [
        {
            label: "Séjour",
            description: "Budget, nombre de personne...",
            content:

                <BudgetLayout data={dataRequest} setData={setDataRequest} />
        },
        {
            label: "Service",
            description: "Installation et service désiré",
            content:
                <ServiceLayout data={dataRequest} setData={setDataRequest} />
        }
    ]
    const handleClick = async () => {
        setActive((current) => current + 1)
        if (data.length - 1 === active) {
            try {
                console.log(dataRequest)
                const response = await postQuiz(dataRequest);
                console.log(response)
                if (response.success) {
                    console.log(response.data)
                    setDataResponse(response.data);
                } else {
                    setError(response.error ?? "Error");
                }
            } catch (err) {
                setError("Erreur de connexion");
            } finally {
                setLoading(false);
            }
        };
    }
    return (
        <>
            <Stepper active={active} onStepClick={setActive} mt="xl">
                {data.map((d) => (
                    <Stepper.Step
                        label={d.label}
                        description={d.description}
                    >
                        {d.content}
                    </Stepper.Step>
                ))}
                <StepperCompleted>
                    {dataResponse && (
                        <Result rooms={dataResponse} />
                    )}
                </StepperCompleted>
            </Stepper >
            <Group justify="center" mt="xl">
                <Button variant="default" onClick={() => setActive((current) => current - 1)} disabled={active === 0}>Précédent</Button>
                <Button onClick={handleClick} >
                    {data.length - 1 === active ? "Voir le résultat" : "Suivant"}
                </Button>

            </Group >
        </>
    )
}