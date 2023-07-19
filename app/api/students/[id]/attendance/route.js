import { db } from "@/lib/db";
import { NextResponse } from "next/server";

function isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
}

// UPDATE student by ID and also add/change attendance of student
export async function PATCH(req, { params }) {
    const id = params.id;
    const inputs = await req.json();
  
    const student = await db.student.findUnique({
      where: {
        id: id,
      },
      include: {
        attendances: true,
      },
    });
  
    const today = new Date(inputs.currentDate);
    const todayAttendance = student.attendances?.find((attendance) =>
      isSameDay(new Date(attendance.createdAt), today)
    );
  
    if (!todayAttendance) {
      const newAttendance = await db.attendance.create({
        data: {
          isPresent: inputs.isPresent,
          reasonForAbsence: inputs.reasonForAbsence,
          temperature: inputs.temperature,
          student: { connect: { id: id } },
        },
      });
  
      student.attendances.push(newAttendance);
    } else {
      todayAttendance.isPresent = inputs.isPresent;
      todayAttendance.reasonForAbsence = inputs.reasonForAbsence;
      todayAttendance.temperature = inputs.temperature;
  
      await db.attendance.update({
        where: { id: todayAttendance.id },
        data: {
          isPresent: inputs.isPresent,
          reasonForAbsence: inputs.reasonForAbsence,
          temperature: inputs.temperature
        },
      });
    }
  
    const updatedStudent = await db.student.update({
      where: { id: id },
      data: {
        attendances: {
          set: student.attendances.map((attendance) => ({
            id: attendance.id,
          })),
        },
      },
      include: {
        attendances: true,
      },
    });
  
    return NextResponse.json(updatedStudent);
}