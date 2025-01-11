import CreateTodo from "@/components/create-todo"
import TodoList from "@/components/todo-list"

export default function Home() {
 return (
  <div className="max-w-7xl flex flex-col gap-10 mx-auto p-10">
   <div className="flex items-center justify-between">
    <h1 className="text-4xl font-semibold">Todos</h1>
    <CreateTodo />
   </div>
   <TodoList />
  </div>
 )
}