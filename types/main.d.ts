export type Classroom = {
    id: string
    name: string
    teacherId: string
    teachers: Teacher[]
    students: Student[]
    attendances: Attendance[]
    createdAt: Date
}

export type Student = {
    id: string
    name: string
    dob: Date
    nokName: string
    nokNumber: string
    address: string
    classroomId: string
    Classroom: Classroom
    Attendance: Attendance[]
    createdAt: Date
}

export type Attendance = {
    id: string
    date: Date
    status: string
    student: Student
    studentId: string
    Classroom: Classroom
    classroomId: string
}

export type Teacher = {
    id: string
    name: string
    phone: string
    email: string
    isAdmin: boolean
    classrooms: Classroom[]
    createdAt: Date
}
