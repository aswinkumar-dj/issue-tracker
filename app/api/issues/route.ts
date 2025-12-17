import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createIssueSchema = z.object({
  name: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required."),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { name, description } = validation.data;

  const newIssue = await prisma.issues.create({
    data: { name, description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
