import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

// GET teacher by ID
export async function GET(req, {params}) {
    const id = params.id;

    const teacher = await db.teacher.findUnique({
        where: {
            id: id
        },
        include: {
            classrooms: {
                include: {
                    students: {
                        include: {
                            attendances: true // Include the attendance relation
                        }
                    },
                    teachers: true
                }
            }
        }
    });
    return NextResponse.json(teacher);
}

// PATCH teacher by ID
export async function PATCH(req, { params }) {
    const id = params.id;
    const inputs = await req.json();
    const { name, email, phone, newPassword , oldPassword } = inputs;

    if (oldPassword) {

        const teacher = await db.teacher.findUnique({
            where: {
                id: id
            }
        });

        const passwordMatch = await bcrypt.compare(oldPassword, teacher.password);

        if (passwordMatch) {

            if (newPassword) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);

                const newTeacher = await db.teacher.update({
                    where: { id: id },
                    data: {
                        name: name,
                        email: email,
                        phone: phone,
                        password: hashedPassword
                    }
                });

                return NextResponse.json(newTeacher);
            } else {
                return NextResponse.error('The new password is empty or undefined', { status: 400 });
            }
        } else {
            return NextResponse.error('The old password you entered is incorrect', { status: 401 });
        }

    } else {
        const teacher = await db.teacher.update({
            where: { id: id },
            data: inputs,
        });
    
        return NextResponse.json(teacher);
    }
}

// DELETE teacher by ID
export async function DELETE(req, {params}) {
    const id = params.id;

    const deletedTeacher = await db.teacher.delete({
        where: {
            id: id
        }
    });

    return NextResponse.json(deletedTeacher);
}