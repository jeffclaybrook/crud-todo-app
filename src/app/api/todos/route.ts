import { NextRequest, NextResponse } from "next/server"
import { Todo } from "@prisma/client"
import { todoSchema } from "@/lib/zod"
import prisma from "@/lib/prisma"

export async function GET() {
 try {
  const todos = await prisma.todo.findMany({
   orderBy: {
    createdAt: "desc"
   }
  })

  return NextResponse.json(todos)
 } catch (error) {
  console.error("Error fetching todos", error)
  return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 })
 }
}

export async function POST(req: NextRequest) {
 try {
  const body = await req.json()
  const res = todoSchema.safeParse(body)

  if (!res.success) {
   return NextResponse.json({ message: "Invalid input", errors: res.error.errors }, { status: 400 })
  }

  const todoData = res.data

  const newTodo = await prisma.todo.create({
   data: {
    title: todoData.title,
    description: todoData.description || "",
    isCompleted: todoData.isCompleted
   }
  })

  return NextResponse.json(newTodo, { status: 201 })
 } catch (error) {
  console.error("Error adding todo", error)
  return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 })
 }
}

export async function DELETE(req: NextRequest) {
 try {
  const id = req.nextUrl.searchParams.get("id")

  if (!id) {
   return NextResponse.json({ message: "Todo ID is required" }, { status: 400 })
  }

  const deletedTodo = await prisma.todo.delete({
   where: {
    id
   }
  })

  if (!deletedTodo) {
   return NextResponse.json({ message: "Todo not found" }, { status: 404 })
  }

  return NextResponse.json({ message: "Todo deleted successfully" }, { status: 200 })
 } catch (error) {
  console.error("Error deleting todos", error)
  return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 })
 }
}

export async function PUT(req: NextRequest) {
 try {
  const body = await req.json()
  const { id, ...rest } = body
  const res = todoSchema.safeParse(rest)

  if (!res.success) {
   return NextResponse.json({ message: "Invalid input", errors: res.error.errors }, { status: 400 })
  }

  if (!id) {
   return NextResponse.json({ message: "Todo ID required" }, { status: 400 })
  }

  const todoData = res.data as Todo

  const updatedTodo = await prisma.todo.update({
   where: {
    id
   },
   data: {
    title: todoData.title,
    description: todoData.description,
    isCompleted: todoData.isCompleted
   }
  })

  if (!updatedTodo) {
   return NextResponse.json({ message: "Todo not found" }, { status: 404 })
  }

  return NextResponse.json(updatedTodo, { status: 200 })
 } catch (error) {
  console.error("Error updating todos", error)
  return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 })
 }
}