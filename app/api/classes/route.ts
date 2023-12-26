import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { classCreationSchema } from "./classSchema";

import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token || !token["sub"]) {
    return NextResponse.json({}, { status: 401 });
  }

  const logoClasses = await prisma.logoClass.findMany({
    where: { instructorId: parseInt(token["sub"]) },
  });

  return NextResponse.json(logoClasses, { status: 200 });
}

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token || !token["sub"]) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();
  const validation = classCreationSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const logoClass = await prisma.logoClass.create({
    data: {
      name: body.name,
      link: "yi",
      password: body.password,
      instructorId: parseInt(token["sub"]),
    },
  });

  return NextResponse.json(logoClass, { status: 201 });
}
