import { Classroom } from "@/types/main";
import Image from "next/image";
import React from "react";

type ClassroomCardProps = {
  classroom: Classroom; // Specify the type of the teacher prop
};

const ClassroomCard: React.FC<ClassroomCardProps> = ({ classroom }) => {
  return (
    <div className="box-border w-[325px] bg-transparent border-2 border-black hover:bg-black hover:text-white rounded-lg shadow-md p-10 hover:scale-[1.02] transition-all cursor-pointer flex flex-col gap-4 items-center">
      <div className="font-bold text-[23px] ">{classroom.name}</div>

      <div className="flex box-border w-full justify-between">
        <div className="flex flex-col gap-2 items-center">
          <div className="font-semibold text-[20px]">Teachers</div>
          <div className="flex flex-col items-center gap-3">
            {classroom.teachers.map((teacher) => (
              <div>{teacher.name}</div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <div className="font-semibold text-[20px]">Students</div>
          <div>{classroom.students.length}</div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomCard;
