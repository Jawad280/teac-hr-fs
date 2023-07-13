"use client";
import SelectTeacher from "@/components/SelectTeacher";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import SelectStudents from "@/components/SelectStudents";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CreateClassroomPage = () => {
  const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const router = useRouter();
  const [teacher, setTeacher] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [name, setName] = useState("");

  // eslint-disable-next-line
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newClassroom = {
      name: name,
      teacherId: teacher.id,
      students: selectedStudents.map((student) => ({ id: student.id })), // Create an array of student objects with their ids
    };

    try {
      const res = await fetch(`${apiUrl}/api/classrooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClassroom),
      }).then(() => {
        setName("");
        setSelectedStudents([]);
        setTeacher("");
        router.push("/dashboard/classrooms");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="box-border w-1/5 flex flex-col items-center gap-8 mt-6 bg-slate-100 rounded-lg p-10 shadow-sm">
      <form
        className="flex flex-col items-center gap-6 box-border w-full"
        onSubmit={handleSubmit}
      >
        <div className="grid w-full max-w-sm items-center gap-3">
          <div className="font-semibold text-base">Classroom Name</div>
          <Input
            type="name"
            id="name"
            placeholder="Enter Classroom Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-3">
          <div className="font-semibold text-base">Teacher</div>
          <SelectTeacher setTeacher={setTeacher} />
        </div>

        <div className="grid w-full max-w-sm items-center gap-3">
          <div className="font-semibold text-base">Students</div>
          <SelectStudents
            setSelectedStudents={setSelectedStudents}
            selectedStudents={selectedStudents}
          />
        </div>

        <div className="box-border flex items-center gap-4">
          <Link
            href={`${apiUrl}/dashboard/classrooms`}
            className={buttonVariants({ variant: "destructive" })}
          >
            Cancel
          </Link>
          <Button type="submit">Create Classroom</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateClassroomPage;