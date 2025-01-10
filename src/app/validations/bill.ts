// validations/bill.ts
import { z } from 'zod'

export const createBillSchema = z.object({
  totalAmount: z.number().positive(),
})

export const createShareSchema = z.object({
  name: z.string().min(1),
  amount: z.number().positive(),
})
