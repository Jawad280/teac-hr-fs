import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// GET section by ID
export async function GET(req, {params}) {
    const id = params.id;

    const section = await db.section.findUnique({
        where: {
            id: id
        }
    });
    return NextResponse.json(section);
}

// UPDATE section by ID 
export async function PATCH(req, { params }) {
    const id = params.id;
    const inputs = await req.json();
  
    const section = await db.section.findUnique({
      where: {
        id: id,
      }
    });
  
    const updatedSection = await db.section.update({
      where: { id: id },
      data: inputs
    });
  
    return NextResponse.json(updatedSection);
}

// DELETE section by ID
export async function DELETE(req, {params}) {
    const id = params.id;

    const deleted = await db.section.delete({
        where: {
            id: id
        }
    });

    return NextResponse.json(deleted);
}