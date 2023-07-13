import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    const students = await db.student.findMany({
      include: {
        attendances:true
      }
    });
    return NextResponse.json(students);
  }

export async function POST(req) {
  const inputs = await req.json();

  // Check if a student with the same combination of name, dob, and address exists
  const existingStudent = await db.student.findFirst({
    where: {
      name: inputs.name,
      dob: inputs.dob,
      address: inputs.address
    }
  });

  // If an existing student is found, return an error response
  if (existingStudent) {
    return new NextResponse('Student already exists', { status: 409 });
  }

  // Create the new student
  const studentData = {
    name: inputs.name,
    dob: inputs.dob,
    nokName: inputs.nokName,
    nokNumber: inputs.nokNumber,
    address: inputs.address,
  };

  // Check if classroom ID is provided and connect the student to the classroom if available
  if (inputs.classroomId) {
    studentData.Classroom = {
      connect: {
        id: inputs.classroomId
      }
    };
  }

  const newStudent = await db.student.create({
    data: studentData,
  });

  return new NextResponse(JSON.stringify(newStudent), { status: 201 });
}
  