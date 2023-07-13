import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    const newsletters = await db.newsletter.findMany();
    return NextResponse.json(newsletters);
}

export async function POST(req) {
    const inputs = await req.json();
  
    // Check if a newsletter with the same name exists
    const existingNewsletter = await db.newsletter.findFirst({
      where: {
        name: inputs.name
      }
    });
  
    // If an existing newsletter is found, return an error response
    if (existingNewsletter) {
      return new NextResponse('Newsletter already exists', { status: 409 });
    }
  
    const newNewsletter = await db.newsletter.create({
      data: inputs,
    });
  
    return new NextResponse(JSON.stringify(newNewsletter), { status: 201 });
  }