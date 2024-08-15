import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>
type RequestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>['json']

export const useBulkDeleteAccounts = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.accounts["bulk-delete"]["$post"]({ json })

            if (!response.ok) {
                throw new Error("Failed to create account");
            }

            return await response.json()
        },
        onSuccess: () => {
            toast.success("Account Deleted")
            queryClient.invalidateQueries({ queryKey: ["accounts"] })

        },
        onError: (error) => {
            toast.error("Failed to delete account")
        }
    })
    return mutation
}