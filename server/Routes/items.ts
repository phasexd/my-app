import {Hono} from "hono";
import { zValidator } from '@hono/zod-validator'
import {promise, z} from "zod"



const itemSchema = z.object({
  id:z.number().int().positive().min(1),
  title: z.string().min(3),
  qty: z.number().int().positive().min(1),
  unit: z.string().min(1).max(100),
  amount: z.number().int().positive().min(1)
})
type Items = z.infer<typeof itemSchema>

const createPostSchema = itemSchema.omit({id: true});

const FakeItems: Items[] = [
    {
      id: 1,
      title: "Pen",
      qty: 10,
      unit: "pcs",
      amount: 12
    },
    {
      id: 2,
      title: "Notebook",
      qty: 5,
      unit: "pcs",
      amount: 12
    },
    {
      id: 3,
      title: "Pencil",
      qty: 15,
      unit: "pcs",
      amount: 12
    },
    {
      id: 4,
      title: "Eraser",
      qty: 20,
      unit: "pcs",
      amount: 12
    }
  ];

  

export const itemsRoutes = new Hono()

.get("/", (c) => {
    return c.json({items: FakeItems })
})
.post("/",zValidator("json", createPostSchema), async(c) => {
    const item = await c.req.valid("json");
    FakeItems.push({...item, id: FakeItems.length+1 })
    c.status(201)
    return c.json(item)
})
.get("/total-spent", (c) => {
  const total = FakeItems.reduce((acc, Items) => acc + Items.amount, 0);
  return c.json({ total });
})
.get("/:id{[0-9]+}", (c) => {
  const id = Number.parseInt(c.req.param('id'))
  const item = FakeItems.find(item => item.id === id)
  if(!item){
    return c.notFound()
  }
  return c.json({item});
})
 .delete("/:id{[0-9]+}", (c) => {
  const id = Number.parseInt(c.req.param('id'))
  const index = FakeItems.findIndex(item => item.id === id)
  if(index === -1){
    return c.notFound()
  }
  const deleteItem = FakeItems.splice(index ,1)[0];
  return c.json({item:deleteItem});
 });
// .put