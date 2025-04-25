"use client"

import { QuizRequestData } from '@/types/data';
import { Chip, Text } from '@mantine/core';
import { Box, Checkbox, Group, NumberInput, Stack } from '@mantine/core';
import { DatePickerInput, DateValue } from '@mantine/dates';
import { IconCalendar, IconUser } from '@tabler/icons-react';
import { Dispatch, SetStateAction } from 'react';
import { CategoriesQuizComponent } from './CategoriesComponent';

export const BudgetLayout = ({ data, setData }: { setData: Dispatch<SetStateAction<QuizRequestData>>, data: QuizRequestData }) => {

    const handleCheckboxChange = (value: string, checked: boolean) => {
        setData((prev) => ({
            ...prev,
            criteriaHotel: {
                ...prev.criteriaHotel,
                [value]: checked,
            },
        }));
    };
    const toIso = (date: DateValue) => {
        return date ? date.toISOString().split('.')[0] : null
    }
    return (
        <Stack>
            <DatePickerInput
                leftSection={<IconCalendar size={18} stroke={1.5} />}
                type="range"
                label="Pick dates range"
                placeholder="Pick dates range"
                withAsterisk
                value={[
                    data?.startDate ? new Date(data.startDate) : null,
                    data?.endDate ? new Date(data.endDate) : null,]}
                onChange={(value) => setData((prev) => ({ ...prev, startDate: toIso(value[0]), endDate: toIso(value[1]) }))}
                clearable
            />
            <NumberInput
                label="Nombre de personne"
                placeholder="Entrez un nombre"
                withAsterisk
                value={data?.maxGuests ?? 0}
                onChange={(value) =>
                    setData((prev) => ({ ...prev, maxGuests: Number(value) ?? 0 }))
                }
                leftSection={<IconUser size={18} stroke={1.5} />}
            />


            <Checkbox.Group label="Quelques informations supplémentaires">
                <Group mt="xs">
                    <Checkbox
                        value="children"
                        label="Voyage avec des enfants"
                        checked={!!data.criteriaHotel.children}
                        onChange={(e) =>
                            handleCheckboxChange('children', e.currentTarget.checked)
                        }
                    />
                    <Checkbox
                        value="animal"
                        label="Voyage avec des animaux"
                        checked={!!data.criteriaHotel.animal}
                        onChange={(e) =>
                            handleCheckboxChange('animal', e.currentTarget.checked)
                        }
                    />
                </Group>
            </Checkbox.Group>
            <Box>
                <Text>Type de destination préférée</Text>
                <CategoriesQuizComponent setData={setData} data={data} />
            </Box>
        </Stack>

    )
}