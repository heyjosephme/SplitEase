// app/actions/bill.ts
'use server'

import { createBillSchema } from '@/types/bill'
//import { db } from '@/lib/db'
//import { nanoid } from 'nanoid'
//import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function createBill(formData: FormData) {
  try {
    /* const session = await auth()
    if (!session?.user) {
      return {
        error: "Unauthorized"
      }
    } */

    // Parse and validate the input
    const rawData = {
      title: formData.get('title'),
      description: formData.get('description'),
      totalAmount: Number(formData.get('totalAmount')),
      currency: formData.get('currency') || 'JPY',
      restaurantName: formData.get('restaurantName'),
      location: formData.get('location'),
      date: new Date(formData.get('date') as string),
    }

    const validatedData = createBillSchema.parse(rawData)

    // Generate a unique sharing URL
    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/bills/${nanoid()}`

    // Create the bill
    const bill = await db.bill.create({
      data: {
        ...validatedData,
        shareUrl,
        ownerId: session.user.id,
        status: 'OPEN',
      },
    })

    revalidatePath('/bills')
    revalidatePath(`/bills/${bill.id}`)

    return { success: true, billId: bill.id }
  } catch (error) {
    console.error('Failed to create bill:', error)
    return {
      error: "Failed to create bill"
    }
  }
}
