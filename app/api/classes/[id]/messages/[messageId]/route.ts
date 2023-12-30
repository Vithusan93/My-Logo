import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; messageId: string } }
) {
  const token = await getToken({ req: request });
  if (!token || !token["sub"]) {
    return NextResponse.json({}, { status: 401 });
  }

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

  if (!isAdmin) {
    return NextResponse.json({}, { status: 400 });
  }

  // TODO: Check if the user belongs to class
  const body = await request.json();

  const message = await prisma.message.update({
    data: {
      isVisible: body.isVisible,
    },
    where: { id: parseInt(params.messageId) },
  });

  return NextResponse.json(message, { status: 200 });
}
