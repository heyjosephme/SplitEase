// app/create/page.tsx
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

async function createBill(formData: FormData) {
  "use server";

  const totalAmount = parseFloat(formData.get("totalAmount") as string);
  const names = formData.getAll("name") as string[];
  const shareCount = names.length;
  const amountPerPerson = Number((totalAmount / shareCount).toFixed(2));

  // Generate a unique 6-character code
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  const bill = await prisma.bill.create({
    data: {
      totalAmount,
      code,
      shares: {
        create: names.map((name) => ({
          name,
          amount: amountPerPerson,
        })),
      },
    },
    include: {
      shares: true,
    },
  });

  redirect(`/bill/${bill.code}`);
}

export default function CreateBillPage() {
  return (
    <div className="container max-w-2xl py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Bill Split</h1>

      <Card className="p-6">
        <form action={createBill} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="totalAmount">Total Amount</Label>
            <Input
              id="totalAmount"
              name="totalAmount"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="Enter the total bill amount"
            />
          </div>

          <div className="space-y-4" id="participants">
            <Label>Participants</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input name="name" required placeholder="Participant name" />
              </div>
              <div className="flex gap-2">
                <Input name="name" required placeholder="Participant name" />
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={(e) => {
                const container = document.querySelector(
                  "#participants .space-y-2"
                );
                const newInput = document.createElement("div");
                newInput.className = "flex gap-2";
                newInput.innerHTML = `
                  <input
                    name="name"
                    required
                    placeholder="Participant name"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                `;
                container?.appendChild(newInput);
              }}
            >
              Add Participant
            </Button>
          </div>

          <Button type="submit" className="w-full">
            Create Bill Split
          </Button>
        </form>
      </Card>
    </div>
  );
}
