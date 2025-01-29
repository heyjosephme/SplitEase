import { requireAuth } from "@/lib/auth";
export default async function PrivatePage() {
  const user = await requireAuth();
  return <p>Hello {JSON.stringify(user)}</p>;
}
