"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createBill } from "@/app/actions/bill";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function CreateBillForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await createBill(formData);

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      if (result.billId) {
        toast({
          title: "Success",
          description: "Bill created successfully!",
        });
        router.push(`/bills/${result.billId}`);
      }
    });
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Create New Bill</CardTitle>
        <CardDescription>
          Enter the bill details to split with your friends
        </CardDescription>
      </CardHeader>
      <form action={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Dinner at Sushi Restaurant"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Add any notes about the bill..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalAmount">Total Amount (¥)</Label>
            <Input
              id="totalAmount"
              name="totalAmount"
              type="number"
              min="0"
              step="1"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="restaurantName">Restaurant Name (Optional)</Label>
            <Input
              id="restaurantName"
              name="restaurantName"
              placeholder="Restaurant name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location (Optional)</Label>
            <Input
              id="location"
              name="location"
              placeholder="Restaurant location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Creating..." : "Create Bill"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
