// types/bill.ts
import { z } from "zod"

export const createBillSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  totalAmount: z.number().positive("Amount must be positive"),
  currency: z.string().default("JPY"),
  restaurantName: z.string().optional(),
  location: z.string().optional(),
  date: z.date(),
})

export type CreateBillInput = z.infer<typeof createBillSchema>
