import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token || !token["sub"]) {
    return NextResponse.json({}, { status: 401 });
  }

  const scripts = await prisma.script.findMany({
    where: { userId: parseInt(token["sub"]) },
  });

  return NextResponse.json(scripts, { status: 200 });
}

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token || !token["sub"]) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();

  const script = await prisma.script.create({
    data: {
      userId: parseInt(token["sub"]),
      text: body.text,
    },
  });

  return NextResponse.json(script, { status: 201 });
}
