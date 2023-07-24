import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// GET classroom by ID
export async function GET(req, {params}) {
    const id = params.id;

    const classroom = await db.classroom.findUnique({
        where: {
            id: id
        },
        include: {
            students: {
                include: {
                    attendances: true // Include the attendance relation
                }
            },
            teachers: true
        }
    });
    return NextResponse.json(classroom);
}

// UPDATE classroom by ID
export async function PATCH(req, { params }) {
    const id = params.id;
    const inputs = await req.json();

    const updatedClassroom = await db.classroom.update({
        where: {
            id: id
        },
        data: inputs
    });

    return NextResponse.json(updatedClassroom);
}

// DELETE classroom by ID
export async function DELETE(req, {params}) {
    const id = params.id;

    const deleted = await db.classroom.delete({
        where: {
            id: id
        }
    });

    return NextResponse.json(deleted);
}