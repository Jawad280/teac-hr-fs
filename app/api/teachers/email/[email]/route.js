import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// GET teacher by email
export async function GET(req, {params}) {
    const email = params.email;

    const teacher = await db.teacher.findFirst({
        where: {
            email: email
        },
        include: {
            classrooms: {
                include: {
                    students: {
                        include: {
                            attendances: true // Include the attendance relation
                        }
                    },
                    Teacher: true,
                }
            }
        }
    });
    return NextResponse.json(teacher);
}