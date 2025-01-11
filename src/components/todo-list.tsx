"use client"

import useSWR from "swr"
import DeleteTodo from "./delete-todo"
import UpdateTodo from "./update-todo"
import { Todo } from "@prisma/client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function TodoList() {
 const {
  data: todos,
  error,
  isLoading
 } = useSWR<Todo[]>("/api/todos", fetcher)

 if (isLoading) {
  return (
   <div className="flex justify-center items-center h-40 bg-white">
    <div className="relative w-12 h-12">
     <div className="absolute w-12 h-12 border-4 border-primary rounded-full animate-spin border-t-transparent" />
     <div className="absolute w-12 h-12 border-4 border-primary rounded-full animate-ping opacity-25" />
    </div>
   </div>
  )
 }

 if (error) {
  return (
   <p>Ooops! Unable to load todos </p>
  )
 }

 const todoList = todos || []

 return (
  <div className="space-y-4">
   {todoList.length === 0 ? (
    <p className="text-center py-10 text-muted-foreground">All done for today!</p>
   ) : (
    <div className="grid lg:grid-cols-3">
     {todoList.map((todo) => (
      <Card key={todo.id}>
       <CardHeader>
        <CardTitle>
         <span className={todo.isCompleted ? "line-through" : ""}>{todo.title}</span>
        </CardTitle>
       </CardHeader>
       {todo.description && (
        <CardContent>
         <p>{todo.description}</p>
        </CardContent>
       )}
       <CardFooter className="flex justify-end space-x-2">
        <DeleteTodo id={todo.id} />
        <UpdateTodo todo={todo} />
       </CardFooter>
      </Card>
     ))}
    </div>
   )}
  </div>
 )
}