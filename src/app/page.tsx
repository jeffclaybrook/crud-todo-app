import CreateTodo from "@/components/create-todo"
import TodoList from "@/components/todo-list"

export default function Home() {
 return (
  <main className="flex flex-col gap-10 mx-auto p-4 lg:px-10">
   <div className="flex items-center justify-between">
    <h1 className="text-3xl font-semibold">Todos</h1>
    <CreateTodo />
   </div>
   <TodoList />
  </main>
 )
}