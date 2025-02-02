import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { DISABLE_AUTH } from "@/config/constants";
import { getTestUser } from "@/utils/auth";
// Create a reusable authentication check
export async function requireAuth() {
  if (DISABLE_AUTH) {
    return getTestUser();
  }
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return data.user;
}
