"use client";
import React from "react";
import { Teacher } from "@/types/main";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

type TeacherCardProps = {
  teacher: Teacher; // Specify the type of the teacher prop
};

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const [name, setName] = useState(teacher.name);
  const [email, setEmail] = useState(teacher.email);
  const [phone, setPhone] = useState(teacher.phone);
  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedTeacher = {
      name: name,
      email: email,
      phone: phone,
    };

    try {
      const res = await fetch(`${apiUrl}/api/teachers/${teacher.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTeacher),
      }).then(() => {
        mutate(`${apiUrl}/api/teachers`);
        router.push("/dashboard/teachers");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="box-border w-full flex flex-col items-center">
      <form
        className="flex flex-col items-center gap-6 box-border w-full"
        onSubmit={handleUpdate}
      >
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            type="name"
            id="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="text"
            id="phone"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-6">
          <Button
            variant="destructive"
            onClick={() => router.push("/dashboard/teachers")}
          >
            Cancel
          </Button>
          <Button type="submit">Update Teacher</Button>
        </div>
      </form>
    </div>
  );
};

export default TeacherCard;
