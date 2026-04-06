import { Badge } from "./ui/badge";


export const customBadgeActive = (text: string) => {
   switch(text) {
    case 'active': {
        return <Badge className='bg-[#f0fdf4] border-[#04E072] text-[#2A7E4E]'>Active</Badge>
    }
     case 'pending': {
        return <Badge className='bg-[#FFF7ED] border-[#FF8903] text-[#A02D00]'>Pending</Badge>
    }
     case 'inactive': {
        return <Badge className='bg-[#E70009] border-[#E70009] text-[#FFFFFF]'>Inactive</Badge>
    }
    default: 
   }
}
