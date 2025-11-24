import { z } from "zod";

const createpatientvalidation = z.object({
  password: z.string(),
  pataint: z.object({
    name: z.string().nonempty("name is required"),
    email: z.string().nonempty("name is required"),
    address: z.string().optional(),
  }),
});

export const adminvalidation = z.object({
  password: z.string(),
  admin: z.object({
    name: z.string("Name is required"),
    email: z.string("Email is required").email("Invalid email format"),
    profilephoto: z.string().optional(),
    contectnumber: z
      .string("Contact number is required")
      .min(10, "Phone number must be at least 10 characters"),
  }),
});

const doctorvalidation = z.object({
  password: z.string(),
  doctor: z.object({
    name: z.string("Name is required"),
    email: z.string("Email is required").email("Invalid email format"),
    contectnumber: z
      .string("Contact number is required")
      .min(10, "Contact number must be at least 10 digits"),
    address: z.string("Address is required"),
    registrationnumber: z.string("Registration Number is required"),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], {
      message: "Gender must be MALE, FEMALE, or OTHER",
    }),
    apointmentfee: z.number("Appointment fee is required"),
    qulification: z.string("Qualification is required"),
    qurrentworkingplace: z.string("Current working place is required"),
    designation: z.string("Designation is required"),
    profilephoto: z.string().optional(),
  }),
});

export const uservalidation = {
  createpatientvalidation,
  adminvalidation,
  doctorvalidation,
};
