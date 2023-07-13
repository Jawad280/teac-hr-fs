import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function GET(req) {
    const teachers = await db.teacher.findMany({
        include: {
            classrooms: true
        }
    });
    return NextResponse.json(teachers);
}

export async function POST(req) {
    const inputs = await req.json();

    const { password, ...teacherData } = inputs;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newTeacher = await db.teacher.create({
        data: {
            ...teacherData,
            password: hashedPassword
        }
    })

    return new NextResponse(JSON.stringify(newTeacher), { status: 201 })
}