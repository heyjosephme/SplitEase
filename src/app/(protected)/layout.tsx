import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  console.log(data.user);
  return (
    <>
      {/* Optional: Add shared navigation or layout elements */}
      <nav className="bg-gray-800 text-white">{/* Your navigation */}</nav>
      <p>Hello {JSON.stringify(data.user)}</p>
      <main>{children}</main>
    </>
  );
}
