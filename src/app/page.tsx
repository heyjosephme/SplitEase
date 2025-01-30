import { requireAuth } from "@/lib/auth";
import BillActions from "@/components/BillActions";
import AddBillButton from "@/components/bills/AddBillButton";
export default async function Home() {
  const user = await requireAuth();

  return (
    <>
      <h1>default title</h1>
      <p> Hello User: {JSON.stringify(user)}</p>
      <button>Create New Bill</button>
      <button>Check my biils</button>
      <AddBillButton />
    </>
  );
}
