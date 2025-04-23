"use client"

import { Checkbox, Group, NumberInput, Stack } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar, IconUser } from '@tabler/icons-react';
import { useState } from 'react';

export const BudgetLayout = () => {
    const [date, setDate] = useState<[Date | null, Date | null]>([null, null]);

    return (
        <Stack>
            <DatePickerInput
                leftSection={<IconCalendar size={18} stroke={1.5} />}
                type="range"
                label="Pick dates range"
                placeholder="Pick dates range"
                withAsterisk
                value={date}
                onChange={setDate}
                excludeDate={(date) => date.getDate() === 4}
                clearable
            />
            <NumberInput label="Nombre de personne" placeholder="Input placeholder" withAsterisk
                leftSection={<IconUser size={18} stroke={1.5} />}
            />

            <Checkbox.Group
                label="Quelque information supplémentaire"
            >
                <Group mt="xs">
                    <Checkbox value="children" label="Voyage avec des enfants" />
                    <Checkbox value="animal" label="Voyage avec des animaux" />
                </Group>
            </Checkbox.Group>

        </Stack>

    )
}