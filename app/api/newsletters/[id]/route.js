import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// GET newsletter by ID
export async function GET(req, {params}) {
    const id = params.id;

    const newsletter = await db.newsletter.findUnique({
        where: {
            id: id
        },
        include: {
            sections: true
        }
    });
    return NextResponse.json(newsletter);
}

// PATCH newsletter by ID
export async function PATCH(req, {params}) {
    const id = params.id;
    const inputs = await req.json();

    const updatedNewsletter = await db.newsletter.update({
        where: { id: id },
        data: inputs
      });
    
    return NextResponse.json(updatedNewsletter);
}

// DELETE newsletter by ID
export async function DELETE(req, {params}) {
    const id = params.id;

    const deleted = await db.newsletter.delete({
        where: {
            id: id
        }
    });

    return NextResponse.json(deleted);
}