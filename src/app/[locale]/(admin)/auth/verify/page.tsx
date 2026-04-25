import Verify from "@/features/auth/components/verify";

const VerifyPage = ({
  searchParams,
}: {
  searchParams: { id?: string; e?: string };
}) => {
  const id = searchParams.id || "";
  const email = searchParams.e ? atob(searchParams.e) : "";

  return (
    <div>
      <Verify _id={id} email={email} />
    </div>
  );
};

export default VerifyPage;