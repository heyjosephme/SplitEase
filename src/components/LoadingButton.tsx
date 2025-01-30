import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

const LoadingButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  
  const handleClick = async () => {
    setIsLoading(true)
    setError("")
    
    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Randomly succeed or fail
          Math.random() > 0.5 ? resolve() : reject(new Error("Something went wrong"))
        }, 2000)
      })
      
      setIsLoading(false)
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button 
        onClick={handleClick}
        disabled={isLoading}
        className="w-32"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading
          </>
        ) : (
          'Click me'
        )}
      </Button>

      {error && (
        <Alert variant="destructive" className="w-64">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export default LoadingButton
