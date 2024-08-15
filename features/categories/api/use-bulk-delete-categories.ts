import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>
type RequestType = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>['json']

export const useBulkDeleteCategories = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.categories["bulk-delete"]["$post"]({ json })

            if (!response.ok) {
                throw new Error("Failed to create category");
            }

            return await response.json()
        },
        onSuccess: () => {
            toast.success("Categories Deleted")
            queryClient.invalidateQueries({ queryKey: ["categories"] })

        },
        onError: (error) => {
            toast.error("Failed to delete categories")
        }
    })
    return mutation
}