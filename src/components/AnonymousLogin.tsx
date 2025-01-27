"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AnonymousLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleAnonymousLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.auth.signInAnonymously();
      console.log(data);
      if (error) throw error;
      router.refresh();
      router.push("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleAnonymousLogin}
        disabled={loading}
        className="w-full"
      >
        {loading ? "Signing in..." : "Continue as Guest"}
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
