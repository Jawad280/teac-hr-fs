import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    const sections = await db.section.findMany();
    return NextResponse.json(sections);
}

export async function POST(req) {
    const inputs = await req.json();

    const newSection = await db.section.create({
        data: inputs,
    });

  return new NextResponse(JSON.stringify(newSection), { status: 201 });
}