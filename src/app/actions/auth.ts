// app/actions/auth.ts
'use server'

import { z } from "zod"
import { hashPassword } from "@/auth/password-utils"
import  prisma  from "@/lib/prisma"

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters")
})

export async function signUp(prevState: any, formData: FormData) {
  try {
    // Validate input
    const validatedFields = signupSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedFields.email }
    })

    if (existingUser) {
      return { error: 'Email already exists' }
    }

    // Create user
    const hashedPassword = await hashPassword(validatedFields.password)
    
    await prisma.user.create({
      data: {
        email: validatedFields.email,
        password: hashedPassword,
      }
    })

    return { success: true }

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    
    return { error: 'Something went wrong' }
  }
}
