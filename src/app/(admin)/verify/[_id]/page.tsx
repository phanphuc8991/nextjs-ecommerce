import Verify from "@/components/auth/verify";


const VerifyPage = async ({
  params,
}: {
  params: Promise<{ _id: string }>
}) => {
const { _id } = await params
  return <div>
    <Verify _id={_id}/>
  </div>
}
export default VerifyPage;