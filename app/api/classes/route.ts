import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { classCreationSchema } from "./classSchema";

import { getToken } from "next-auth/jwt";

function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

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

  const link = generateRandomString(10);
  const password = generateRandomString(6).toUpperCase();

  const body = await request.json();
  const validation = classCreationSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const logoClass = await prisma.logoClass.create({
    data: {
      name: body.name,
      link: link,
      password: password,
      instructorId: parseInt(token["sub"]),
    },
  });

  return NextResponse.json(logoClass, { status: 201 });
}
