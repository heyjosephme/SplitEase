import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// Create a reusable authentication check
export async function requireAuth() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return data.user;
}
