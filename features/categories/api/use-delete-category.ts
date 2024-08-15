import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>

export const useDeleteCategory = (id?: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async (json) => {
            const response = await client.api.categories[":id"]["$delete"]({
                param: { id }
            })

            if (!response.ok) {
                throw new Error("Failed to edit category");
            }

            return await response.json()
        },
        onSuccess: () => {
            toast.success("Category deleted")
            queryClient.invalidateQueries({ queryKey: ["category", { id }] })
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        },
        onError: (error) => {
            toast.error("Failed to edit category")
        }
    })
    return mutation
}