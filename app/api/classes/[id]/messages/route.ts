import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";
import { Message } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await getToken({ req: request });
  if (!token || !token["sub"]) {
    return NextResponse.json({}, { status: 401 });
  }

  // TODO: Check if the user belongs to class

  const logoClass = await prisma.logoClass.findUnique({
    where: { id: parseInt(params.id) },
    select: { instructor: true, assistantInstructor: true },
  });

  if (!logoClass) {
    return NextResponse.json({}, { status: 404 });
  }

  const usedId = parseInt(token["sub"]);
  const isAdmin =
    usedId === logoClass?.instructor.id ||
    (logoClass?.assistantInstructor
      ? usedId === logoClass?.assistantInstructor.id
      : false);

  const filter: Partial<Message> = { logoClassId: parseInt(params.id) };

  if (!isAdmin) {
    filter.isVisible = true;
  }

  const messages = await prisma.message.findMany({
    where: filter,
    include: { sender: true },
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

  // TODO: Check if the user belongs to class
  const body = await request.json();

  const messages = await prisma.message.create({
    data: {
      text: body.text,
      logoClassId: parseInt(params.id),
      senderId: parseInt(token["sub"]),
    },
  });

  return NextResponse.json(messages, { status: 201 });
}
