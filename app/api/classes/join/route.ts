import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { joinSchema } from "./joinSchema";

import { getToken } from "next-auth/jwt";

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

  return NextResponse.json(logoClass, { status: 201 });
}
