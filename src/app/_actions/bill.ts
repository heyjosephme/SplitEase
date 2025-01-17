'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createBillSchema, type CreateBillInput } from "@/lib/validations/bill"
import prisma from "@/lib/prisma"

export async function createBill(input: CreateBillInput) {
  const validatedFields = createBillSchema.safeParse(input)
  
  if (!validatedFields.success) {
    throw new Error("Invalid input")
  }

  const { totalAmount, participants } = validatedFields.data
  const shareCount = participants.length
  const amountPerPerson = Number((totalAmount / shareCount).toFixed(2))
  
  // Generate a unique 6-character code
  const code = Math.random().toString(36).substring(2, 8).toUpperCase()

  try {
    const bill = await prisma.bill.create({
      data: {
        totalAmount,
        code,
        shares: {
          create: participants.map((participant) => ({
            name: participant.name,
            amount: amountPerPerson,
          })),
        },
      },
    })

    revalidatePath("/")
    return bill
  } catch (error) {
    console.error("Failed to create bill:", error)
    throw new Error("Failed to create bill")
  }
}
