import { createFileRoute } from '@tanstack/react-router'
import {api } from "@/lib/api"
import { useQuery } from '@tanstack/react-query';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"


export const Route = createFileRoute('/items')({
  component: Items,
})

async function getAllItems() {
  const res = await api.items.$get();
  if(!res.ok){
    throw new Error("server error")
  }
  const data = await res.json();
  return data
  
}

function Items() {
   // Queries
   const { isPending, error, data } = useQuery({ queryKey: ['get-all-items'], queryFn: getAllItems })


   if (error) return 'An error has occurred: ' + error.message
   return (
   <div className='p-2 max-w-3xl m-auto'>
   <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Units</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {isPending ? Array(3).fill(0).map((_, i) => (
        <TableRow key={i}>
        <TableCell className="font-medium"><Skeleton className="h-4" /></TableCell>
        <TableCell><Skeleton className="h-4" /></TableCell>
        <TableCell><Skeleton className="h-4" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-4" /></TableCell>
      </TableRow>
      )) :
        data?.items.map((items) => (
          <TableRow key={items.id}>
            <TableCell className="font-medium">{items.title}</TableCell>
            <TableCell>{items.qty}</TableCell>
            <TableCell>{items.unit}</TableCell>
            <TableCell className="text-right">{items.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <pre>
     
    </pre>
    </div>
   );
}