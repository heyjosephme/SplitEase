import { z } from 'zod'


export const createBillSchema = z.object({
  creatorName: z.string().min(1, "Name is required"),
  totalAmount: z.number().min(0.01, "Amount must be greater than 0"),
  numberOfParticipants: z.number().min(2, "Must have at least 2 participants"),
});

export type CreateBillInput = z.infer<typeof createBillSchema>

export const createShareSchema = z.object({
  name: z.string().min(1),
  amount: z.number().positive(),
})
