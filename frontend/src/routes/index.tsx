import { createFileRoute } from '@tanstack/react-router'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import {
  useQuery,
} from '@tanstack/react-query'

export const Route = createFileRoute('/')({
  component: Index,
})

async function getTotalItems() {
  const res = await api.items["total-spent"].$get();
  if(!res.ok){
    throw new Error("server error")
  }
  const data = await res.json();
  return data
  
}

function Index() {
   // Queries
   const { isPending, error, data } = useQuery({ queryKey: ['get-total-items'], queryFn: getTotalItems })


   if (error) return 'An error has occurred: ' + error.message

  return (
    <>
      <Card className="w-[350px] m-auto">
        <CardHeader>
          <CardTitle>Total spent</CardTitle>
          <CardDescription>The total spent you've spent.</CardDescription>
        </CardHeader>
        <CardContent>{isPending ? "..." : data.total}</CardContent>
      </Card>
    </>
  );
}


