
import { RoomLayout } from '@/components/room/RoomLayout';
type Props = {
    params: {
        id: string;
    };
};
export default function Room({ params }: Props) {

    return (
        <RoomLayout id={params.id} />
    );
}
