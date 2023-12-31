import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

export async function GET(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  const token = await getToken({ req: request });
  if (!token || !token["sub"]) {
    return NextResponse.json({}, { status: 401 });
  }

  const taskResponses = await prisma.taskResponse.findMany({
    where: { taskId: parseInt(params.taskId) },
    select: {
      student: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(taskResponses, { status: 200 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { taskId: string } }
) {
  const token = await getToken({ req: request });
  if (!token || !token["sub"]) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();

  const taskResponse = await prisma.taskResponse.findUnique({
    where: {
      studentId_taskId: {
        taskId: parseInt(params.taskId),
        studentId: parseInt(token["sub"]),
      },
    },
  });

  const isSubmitted = body.isSubmitted ? true : false;

  if (!taskResponse) {
    const createdResponse = await prisma.taskResponse.create({
      data: {
        taskId: parseInt(params.taskId),
        studentId: parseInt(token["sub"]),
        script: body.script,
        isSubmitted: isSubmitted,
      },
    });
    return NextResponse.json(createdResponse, { status: 201 });
  }

  const updatedResponse = await prisma.taskResponse.update({
    where: {
      studentId_taskId: {
        taskId: parseInt(params.taskId),
        studentId: parseInt(token["sub"]),
      },
    },
    data: {
      script: body.script,
      isSubmitted: isSubmitted,
    },
  });
  return NextResponse.json(updatedResponse, { status: 200 });
}
