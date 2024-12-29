"use server";

import { CredentialsSignin } from "next-auth";

import z from "zod";
import { signIn } from "../auth";
import { redirect } from "next/navigation";

const registerSchema = z.object({
  ign: z
    .string()
    .min(3, { message: "In Game name must be atleast 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters long" }),
});

const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const result = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
    if (!result) {
      return { success: false };
    }
    return { success: true };
  } catch (error) {
    console.error("Login Error:", error);
    // Optional: Handle error display logic, e.g., sending it back to the UI
  }
};

const register = async (formData: FormData) => {
  try {
    // Parse the formData using Zod
    const data = registerSchema.parse({
      ign: formData.get("ign"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    // Proceed with your registration logic (e.g., save to DB)
    const response = await fetch("http://localhost:5000/api/registerUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status == 200) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (err) {
    // Return Zod validation errors
    if (err instanceof z.ZodError) {
      const errors = err.errors.map((e) => e.message).join(", ");
      throw new Error(errors); // Pass the error messages to the client
    }
    const error: any = err; // this is not the right solution.
    throw new Error(error); // error to be fixed.
  }
};

export { register, login };
