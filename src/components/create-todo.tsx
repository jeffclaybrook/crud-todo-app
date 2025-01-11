"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { mutate } from "swr"
import { Plus } from "lucide-react"
import { todoSchema, type TodoSchema } from "@/lib/zod"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import TodoForm from "./todo-form"

export default function CreateTodo() {
 const [isSubmitting, setIsSubmitting] = useState(false)
 const [errorMessage, setErrorMessage] = useState("")
 const [isDialogOpen, setIsDialogOpen] = useState(false)

 const form = useForm<TodoSchema>({
  resolver: zodResolver(todoSchema),
  defaultValues: {
   title: "",
   description: "",
   isCompleted: false
  }
 })

 const onSubmit = async (data: TodoSchema) => {
  setIsSubmitting(true)

  try {
   const req = await fetch("https://crud-todo-app-kappa.vercel.app/api/todos", {
    method: "POST",
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
   })

   const res = await req.json()

   if (!req.ok) {
    throw new Error(res.message || "Unable to create todo")
   }

   form.reset()
   setIsDialogOpen(false)
   mutate("https://crud-todo-app-kappa.vercel.app/api/todos")
   setErrorMessage("")
  } catch (error) {
   console.error("Error creating todo:", error)
   const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
   setErrorMessage(errorMessage)
  } finally {
   setIsSubmitting(false)
  }
 }

 return (
  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
   <DialogTrigger asChild>
    <Button>
     <Plus />
     Add Todo
    </Button>
   </DialogTrigger>
   <DialogContent className="sm:max-w-[425px] bg-white">
    <DialogHeader>
     <DialogTitle>Create new todo</DialogTitle>
    </DialogHeader>
    {errorMessage && (
     <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
    )}
    <TodoForm
     onSubmit={onSubmit}
     submitButtonText="Create"
     isSubmitting={isSubmitting}
     defaultValues={{
      title: "",
      description: "",
      isCompleted: false
     }}
    />
   </DialogContent>
  </Dialog>
 )
}