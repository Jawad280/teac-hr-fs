"use client";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import { ScrollArea } from "./ui/scroll-area";

const SelectStudents = ({ setSelectedStudents, selectedStudents }) => {
  const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`${apiUrl}/api/students`, fetcher);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleStudentSelection = (event, student) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedStudents([...selectedStudents, student]);
    } else {
      setSelectedStudents(selectedStudents.filter((s) => s.id !== student.id));
    }
  };

  const sortedStudents = data?.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <ScrollArea className="h-[200px] rounded-md border p-4 box-border bg-white">
      {sortedStudents.map((student) => (
        <div key={student.id} className="box-border ">
          <label className="p-2 flex gap-2 items-center">
            <input
              type="checkbox"
              checked={selectedStudents.some((s) => s.id === student.id)}
              onChange={(event) => handleStudentSelection(event, student)}
            />
            {student.name}
          </label>
        </div>
      ))}
    </ScrollArea>
  );
};

export default SelectStudents;
