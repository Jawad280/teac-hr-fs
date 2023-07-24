"use client";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import { ScrollArea } from "./ui/scroll-area";

const SelectTeachers = ({ setTeachers, teachers }) => {
  const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`${apiUrl}/api/teachers`, fetcher);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleTeacherSelection = (event, teacher) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setTeachers([...teachers, teacher]);
    } else {
      setTeachers(teachers.filter((t) => t.id !== teacher.id));
    }
  };

  const sortedTeachers = data?.filter((teacher) => !teacher.isAdmin).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <ScrollArea className="h-[200px] rounded-md border p-4 box-border bg-white">
      {sortedTeachers.map((teacher) => (
        <div key={teacher.id} className="box-border ">
          <label className="p-2 flex gap-2 items-center">
            <input
              type="checkbox"
              checked={teachers.some((t) => t.id === teacher.id)}
              onChange={(event) => handleTeacherSelection(event, teacher)}
            />
            {teacher.name}
          </label>
        </div>
      ))}
    </ScrollArea>
  );
};

export default SelectTeachers;
