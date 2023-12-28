import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await getToken({ req: request });
  if (!token || !token["sub"]) {
    return NextResponse.json({}, { status: 401 });
  }

  // TODO: Check if the user belongs to class
  console.log(params);

  const messages = await prisma.message.findMany({
    where: { logoClassId: parseInt(params.id) },
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
