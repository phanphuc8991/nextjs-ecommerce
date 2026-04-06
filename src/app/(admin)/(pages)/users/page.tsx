import { auth } from "@/auth";
import { columns, Payment } from "@/components/columns-table";
import DataTable from "@/components/data-table";

import TableData from "@/components/data-table";
import { Button } from "@/components/ui/button";
import AddUser from "@/features/users/component/add-user";



async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      avatar: "https://github.com/shadcn.png",
      name: "Phuc",
      status: "active",
      role: "admin",
      email: "phuc@gmail.com",
    },
    {
      id: "728ed52f",
      avatar: "https://github.com/shadcn.png",
      name: "Phuc",
      status: "pending",
      role: "admin",
      email: "phuc@gmail.com",
    },
    {
      id: "728ed52f",
      avatar: "https://github.com/shadcn.png",
      name: "Phuc",
      status: "inactive",
      role: "admin",
      email: "phuc@gmail.com",
    },
  ];
}

export default async function Users() {
  const data = await getData();
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        
        <AddUser/>
       
      </div>
      <div>{/* <TableData /> */}</div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
