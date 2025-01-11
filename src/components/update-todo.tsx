"use client"

import { useState } from "react"
import { mutate } from "swr"
import { Pencil } from "lucide-react"
import { Todo } from "@prisma/client"
import { type TodoSchema } from "@/lib/zod"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import TodoForm from "./todo-form"

export default function UpdateTodo({ todo }: { todo: Todo }) {
 const [isSubmitting, setIsSubmitting] = useState(false)
 const [errorMessage, setErrorMessage] = useState("")
 const [isDialogOpen, setIsDialogOpen] = useState(false)

 const onSubmit = async (data: TodoSchema) => {
  setIsSubmitting(true)

  try {
   const req = await fetch("https://crud-todo-app-kappa.vercel.app/api/todos", {
    method: "PUT",
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify({ ...data })
   })

   const res = await req.json()

   if (!req.ok) {
    throw new Error(res.message || "Unable to update todo")
   }

   setIsDialogOpen(false)
   mutate("https://crud-todo-app-kappa.vercel.app/api/todos")
   setErrorMessage("")
  } catch (error) {
   console.error("Error updating todo:", error)
   const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
   setErrorMessage(errorMessage)
  } finally {
   setIsSubmitting(false)
  }
 }

 return (
  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
   <DialogTrigger asChild>
    <Button size="icon">
     <Pencil />
    </Button>
   </DialogTrigger>
   <DialogContent className="sm:max-w-[425px] bg-white">
    <DialogHeader>
     <DialogTitle>Update todo</DialogTitle>
    </DialogHeader>
    {errorMessage && (
     <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
    )}
    <TodoForm
     onSubmit={onSubmit}
     submitButtonText="Update"
     isSubmitting={isSubmitting}
     defaultValues={{
      title: todo.title,
      description: todo.description,
      isCompleted: false
     }}
    />
   </DialogContent>
  </Dialog>
 )
}