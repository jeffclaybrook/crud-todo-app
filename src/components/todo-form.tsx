"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { todoSchema, type TodoSchema } from "@/lib/zod"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

interface TodoFormProps {
 defaultValues: TodoSchema
 onSubmit: (data: TodoSchema) => Promise<void>
 submitButtonText: string
 isSubmitting: boolean
}

export default function TodoForm({
 defaultValues,
 onSubmit,
 submitButtonText,
 isSubmitting
}: TodoFormProps) {
 const form = useForm<TodoSchema>({
  resolver: zodResolver(todoSchema),
  defaultValues
 })

 return (
  <Form {...form}>
   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <FormField
     control={form.control}
     name="title"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Title</FormLabel>
       <FormControl>
        <Input {...field} />
       </FormControl>
       <FormMessage />
      </FormItem>
     )}
    />
    <FormField
     control={form.control}
     name="description"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Description</FormLabel>
       <FormControl>
        <Textarea className="resize-none" {...field} />
       </FormControl>
       <FormMessage />
      </FormItem>
     )}
    />
    <FormField
     control={form.control}
     name="isCompleted"
     render={({ field }) => (
      <FormItem className="flex items-start space-x-3 space-y-0">
       <FormControl>
        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
       </FormControl>
       <div className="space-y-1 leading-none">
        <FormLabel>Mark as completed</FormLabel>
       </div>
      </FormItem>
     )}
    />
    <Button
     disabled={isSubmitting}
     className="relative w-full"
     type="submit"
    >
     {isSubmitting && (
      <div className="absolute inset-0 flex items-center justify-center bg-primary/50 rounded-md">
       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
     )}
     {submitButtonText}
    </Button>
   </form>
  </Form>
 )
}