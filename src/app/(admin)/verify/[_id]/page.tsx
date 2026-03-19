import Verify from "@/components/auth/verify";

const VerifyPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ _id: string }>;
  searchParams: Promise<{ e?: string }>;
}) => {
  const { _id } = await params;
  const { e } = await searchParams;
  const email = e ? atob(e) : "";
  console.log('email',email);
  return (
    <div>
      <Verify _id={_id} email={email} />
    </div>
  );
};
export default VerifyPage;
