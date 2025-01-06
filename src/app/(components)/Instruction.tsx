import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const Instruction = () => {
    return (
        <Card className="w-[350px] text-sm text-gray-600 mb-2 border-none mt-3">
            <CardContent className="text-gray-600 mb-2 text-sm font-bold pt-3">
                <p>Please make sure you enter the full YouTube URL.</p>
                <p>Eg: https://www.youtube.com/watch?v=fUsaDm9nNkY</p>
            </CardContent>
        </Card>
    )
}