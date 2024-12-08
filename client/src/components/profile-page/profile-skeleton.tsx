import { Card, CardHeader, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

async function ProfileSkeleton() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid gap-2">
                    {[...Array(3)].map((_, i) => (
                        <div key={i}>
                            <Skeleton className="h-4 w-[100px] mb-1" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}


export default ProfileSkeleton