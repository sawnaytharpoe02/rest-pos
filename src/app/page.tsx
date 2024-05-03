import Link from "next/link";

export default function Home() {

  return (
    <div>
      This is landing page
      <Link href={"/backoffice/orders"}>Back office</Link>
    </div>
  );
}
