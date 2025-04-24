import { Accordion, AccordionChevron, AccordionItem, Box, Chip, Group, Slider, Stack, Text, Title } from "@mantine/core"

export const ServiceLayout = () => {
    const hotelAmenities = [
        {
            label: "Bien-être et loisirs",
            items:
                ["Piscine intérieure",
                    "Piscine extérieure",
                    "Spa / centre de bien-être",
                    "Salle de sport / fitness",
                    "Sauna",
                    "Hammam",
                    "Court de tennis",
                    "Parcours de golf",
                    "Plage privée",
                    "Jardin ou terrasse",
                    "Aires de jeux pour enfants",
                    "Club enfants / service de garde"
                ],
        },
        {
            label: "Services d'affaires",
            items: [
                "Centre d'affaires",
                "Salles de conférence",
                "Service de conciergerie",
                "WiFi haut débit",
                "Espaces de coworking",
            ]
        },
        {
            label: "Confort de chambre",
            items: [
                "Balcon / terrasse privée",
                "Baignoire à remous / jacuzzi privatif",
                "Cuisine équipée / kitchenette",
                "Machine à café / thé en chambre",
                "Minibar",
                "Smart TV / système de divertissement",
            ]
        },
        {
            label: "Transport et stationnement",
            items: ["Parking gratuit",
                "Service voiturier",
                "Station de recharge pour véhicules électriques",
                "Service de navette",
                "Location de vélos",
                "Location de voitures",
                "Service de transport vers l'aéroport",]
        },
        {
            label: " Services supplémentaires",
            items: ["Blanchisserie / nettoyage à sec",
                "Chapelle / salle de prière",
                "Boutiques sur place",
                "Bibliothèque",
                "Salle de jeux",
                "Activités organisées par l'hôtel",
                "Service médical / infirmerie"]
        }
    ]; return (
        <Stack gap="xl">
            <Box>
                <Text>Quel type de restauration recherchez-vous ?</Text>
                <Chip.Group multiple>
                    <Group >
                        {["Restaurant gastronomique", "Pension complète", "Petit déjeuner"].map((item, index) =>
                            <Chip value={`${index}`} key={index}>{item}</Chip>
                        )}
                    </Group>
                </Chip.Group>
            </Box>
            <Box>
                <Text>Quelles installations considérez-vous comme essentielles ?</Text>
                <Accordion>
                    {hotelAmenities.map((amenitie, index) =>
                        <Accordion.Item value={amenitie.label} key={index}>
                            <Accordion.Control>
                                {amenitie.label}
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Chip.Group multiple>
                                    <Group >
                                        {amenitie.items.map((item, index) =>
                                            <Chip value={`${index}`} key={index}>{item}</Chip>
                                        )}
                                    </Group>
                                </Chip.Group>
                            </Accordion.Panel>
                        </Accordion.Item>
                    )}
                </Accordion>
            </Box>

            <Box>
                <Title order={2} size="md" mb="md">Besoin d'équipements particuliers ?</Title>
                <Chip.Group multiple>
                    <Group >
                        {["Accessibilité PMR", "Lit bébé"].map((item, index) =>
                            <Chip value={`${index}`} key={index}>{item}</Chip>
                        )}
                    </Group>
                </Chip.Group>
            </Box>
        </Stack>
    )
}