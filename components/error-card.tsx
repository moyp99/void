import {Card, Text} from "@mantine/core";

export default function ErrorCard() {
    return (
        <Card>
            <Text fw={500} size='md' c='red'>
                An unexpected error occurred.
            </Text>
        </Card>
    );
}
