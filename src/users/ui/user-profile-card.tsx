import { Card, CardContent } from "@/components/ui/card"

type Props = {
    label: string
    value: number
}

export const UserProfileCard = ({ label, value }: Props) =>
(
    <Card key={label}>
        <CardContent className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-medium">{value}</p>
        </CardContent>
    </Card>
)
