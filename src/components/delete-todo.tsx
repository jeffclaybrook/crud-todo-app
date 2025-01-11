"use client"

import { mutate } from "swr"
import { Trash2 } from "lucide-react"
import { Button } from "./ui/button"

export default function DeleteTodo({ id }: { id: string }) {
 const handleDelete = async () => {
  const res = await fetch(`https://crud-todo-app-kappa.vercel.app/api/todos?id=${id}`, {
   method: "DELETE"
  })

  if (res.ok) {
   console.log("Todo deleted successfully")
   mutate("https://crud-todo-app-kappa.vercel.app/api/todos")
  } else {
   console.error("Failed to delete todo")
  }
 }
 
 return (
  <Button
   onClick={handleDelete}
   variant="destructive"
   size="icon"
  >
   <Trash2 className="h-4 w-4" />
  </Button>
 )
}