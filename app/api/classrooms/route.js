import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    const classrooms = await db.classroom.findMany({
        include: {
            students: true,
            teachers: true
        }
    });
    return NextResponse.json(classrooms);
}

// export async function POST(req) {
//     const inputs = await req.json();
  
//     const newClassroom = await db.classroom.create({
//       data: {
//         name: inputs.name,
//         Teacher: {
//           connect: {
//             id: inputs.teacherId,
//           },
//         },
//         students: {
//           connect: inputs.students.map((student) => ({
//             id: student.id,
//           })),
//         },
//       },
//       include: {
//         students: true,
//         Teacher: true,
//       },
//     });
  
//     return new NextResponse(JSON.stringify(newClassroom), { status: 201 });
// }

export async function POST(req) {
  const inputs = await req.json();

  const newClassroom = await db.classroom.create({
    data: {
      name: inputs.name,
      teachers: {
        connect: inputs.teacherIds.map((teacherId) => ({ id: teacherId })), // Update to use 'teacherIds' array
      },
      students: {
        connect: inputs.studentIds.map((studentId) => ({ id: studentId })), // Update to use 'studentIds' array
      },
    },
    include: {
      students: true,
      teachers: true, // Update the relation field name to 'teachers'
    },
  });

  return new NextResponse(JSON.stringify(newClassroom), { status: 201 });
}