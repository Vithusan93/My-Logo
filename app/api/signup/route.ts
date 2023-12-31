import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { userCreationSchema } from "./userSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = userCreationSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashedPassword,
    },
  });

  // Do not return the created object with hashed password
  return NextResponse.json({}, { status: 201 });
}
