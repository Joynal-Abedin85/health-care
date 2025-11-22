import { z } from "zod";

const createuservalidation = z.object({
    password: z.string(),
    pataint: z.object({
        name: z.string().nonempty("name is required"),
        email: z.string().nonempty("name is required"),
        address: z.string().optional()
    })
})

export const uservalidation = {
    createuservalidation
}