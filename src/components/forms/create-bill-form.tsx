"use client";

// src/components/forms/create-bill-form.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createBillSchema, type CreateBillInput } from "@/lib/validations/bill";
import { createBill } from "@/app/_actions/bill";

export function CreateBillForm() {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<CreateBillInput>({
    resolver: zodResolver(createBillSchema),
    defaultValues: {
      totalAmount: undefined,
      creatorName: "",
      numberOfParticipants: 2,
    },
  });

  async function onSubmit(data: CreateBillInput) {
    setIsPending(true);

    try {
      const bill = await createBill(data);
      window.location.href = `/bill/${bill.code}`;
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="creatorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter bill amount"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Enter the total bill amount to split
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numberOfParticipants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Participants</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="2"
                  placeholder="Enter number of participants"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Including yourself, how many people will split this bill?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Bill Split
        </Button>
      </form>
    </Form>
  );
}
