import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";
import { Message, Task } from "@prisma/client";
import { taskSchema } from "./taskSchema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await getToken({ req: request });
  if (!token || !token["sub"]) {
    return NextResponse.json({}, { status: 401 });
  }

  // TODO: Check if the user belongs to class

  const filter: Partial<Task> = { logoClassId: parseInt(params.id) };

  const messages = await prisma.task.findMany({
    where: filter,
  });

  return NextResponse.json(messages, { status: 200 });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await getToken({ req: request });
  if (!token || !token["sub"]) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();
  const validation = taskSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const task = await prisma.task.create({
    data: {
      logoClassId: parseInt(params.id),
      question: validation.data.question,
      script: validation.data.script,
    },
  });

  return NextResponse.json(task, { status: 201 });
}
