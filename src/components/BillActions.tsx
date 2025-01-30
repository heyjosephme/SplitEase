import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, List } from "lucide-react"

const BillActions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Simulate navigation (in real app, use Next.js router)
  const handleRedirect = (path) => {
    console.log(`Navigating to ${path}`)
  }
  
  return (
    <div className="space-y-8">
      {/* Approach 1: Modal Form */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Quick Add (Modal Approach)</CardTitle>
          <CardDescription>Add a bill without leaving the page</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Bill
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Bill</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Bill Name</Label>
                  <Input id="name" placeholder="Enter bill name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" placeholder="Enter amount" />
                </div>
                <Button className="w-full">Save Bill</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Approach 2: Redirect */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Full Page Approach</CardTitle>
          <CardDescription>Navigate to dedicated pages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={() => handleRedirect('/bill/new')}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Bill
          </Button>
          
          <Button 
            variant="secondary"
            onClick={() => handleRedirect('/bills')}
            className="w-full sm:w-auto"
          >
            <List className="mr-2 h-4 w-4" />
            View All Bills
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default BillActions
