import { z } from "zod";

const createuservalidation = z.object({
    password: z.string(),
    pataint: z.object({
        name: z.string().nonempty("name is required"),
        email: z.string().nonempty("name is required"),
        address: z.string().optional()
    })
})



export const adminvalidation = z.object({
  name: z.string( "Name is required"),
  email: z
    .string("Email is required")
    .email("Invalid email format"),
  profilephoto: z.string().optional(),
  contectnumber: z
    .string("Contact number is required")
    .min(10, "Phone number must be at least 10 characters"),
});


export const uservalidation = {
    createuservalidation,
    adminvalidation
}