import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

export async function GET(
  request: NextRequest,
  { params }: { params: { taskId: string; userId: string } }
) {
  const token = await getToken({ req: request });
  if (!token || !token["sub"]) {
    return NextResponse.json({}, { status: 401 });
  }

  let userId = params.userId;
  if (userId === "0") {
    userId = token["sub"];
  }

  const taskResponse = await prisma.taskResponse.findUnique({
    where: {
      studentId_taskId: {
        taskId: parseInt(params.taskId),
        studentId: parseInt(userId),
      },
    },
  });

  if (!taskResponse) {
    return NextResponse.json({}, { status: 404 });
  }

  return NextResponse.json(taskResponse, { status: 200 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { taskId: string; userId: string } }
) {
  const token = await getToken({ req: request });
  if (!token || !token["sub"]) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();

  const updatedResponse = await prisma.taskResponse.update({
    where: {
      studentId_taskId: {
        taskId: parseInt(params.taskId),
        studentId: parseInt(params.userId),
      },
    },
    data: {
      points: body.points,
    },
  });
  return NextResponse.json(updatedResponse, { status: 200 });
}
