// app/bills/new/page.tsx
import { CreateBillForm } from '@/components/create-bill-form'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function NewBillPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/login')
  }

  return (
    <main className="container mx-auto py-6 px-4">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create New Bill</h1>
          <p className="text-muted-foreground mt-2">
            Split bills easily with your friends
          </p>
        </div>
        
        <CreateBillForm />
      </div>
    </main>
  )
}
