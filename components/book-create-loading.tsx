import { Skeleton } from "@nextui-org/react";

export default function BookCreateLoading() {
    return (
        <div className="flex max-w-md">
            <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-5 rounded-lg" />
                <Skeleton className="h-5 rounded-lg" />
                <Skeleton className="h-5 rounded-lg" />
            </div>
        </div>
        // <div className="m-4">
        //     <div className="my-2">
        //         <Skeleton className="h8 w-48" />
        //     </div>
        //     <div className="p-4 border rounded space-y-2">
        //         <Skeleton className="h6 w-32" />
        //         <Skeleton className="h6 w-32" />
        //         <Skeleton className="h6 w-32" />
        //     </div>
        // </div>

    )

}