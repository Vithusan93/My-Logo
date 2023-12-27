import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { joinSchema } from "./joinSchema";

import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token || !token["sub"]) {
    return NextResponse.json({}, { status: 401 });
  }

  const logoClasses = await prisma.classStudent.findMany({
    where: { studentId: parseInt(token["sub"]) },
    select: {
      logoClass: {
        select: { name: true, instructor: { select: { name: true } } },
      },
    },
  });

  return NextResponse.json(logoClasses, { status: 200 });
}

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token || !token["sub"]) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();
  const validation = joinSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const logoClass = await prisma.logoClass.findUnique({
    where: { link: validation.data.link },
  });

  if (!logoClass) {
    return NextResponse.json({}, { status: 404 });
  }

  if (logoClass.password !== validation.data.password) {
    return NextResponse.json({ error: "Wrong password" }, { status: 400 });
  }

  await prisma.classStudent.create({
    data: {
      logoClassId: logoClass.id,
      studentId: parseInt(token["sub"]),
    },
  });

  //TODO: Return only name and instructor (Remove creds)
  return NextResponse.json(logoClass, { status: 201 });
}
