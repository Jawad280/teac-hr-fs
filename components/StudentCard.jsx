"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

const StudentCard = ({ student }) => {
  const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const router = useRouter();

  const [name, setName] = useState(student.name);
  const [dob, setDob] = useState(student.dob);
  const [nokName, setNokName] = useState(student.nokName);
  const [nokNumber, setNokNumber] = useState(student.nokNumber);
  const [address, setAddress] = useState(student.address);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedStudent = {
      name: name,
      dob: dob,
      nokName: nokName,
      nokNumber: nokNumber,
      address: address,
    };

    try {
      const res = await fetch(`${apiUrl}/api/students/${student.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStudent),
      }).then(() => {
        mutate(`${apiUrl}/api/students`);
        router.push("/dashboard/students");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="box-border flex flex-col items-center gap-8 bg-slate-100 rounded-lg shadow-sm">
      <form
        className="flex flex-col items-center gap-6 box-border"
        onSubmit={handleUpdate}
      >
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="nokName">Parent/Guardian Name</Label>
          <Input
            type="text"
            id="nokName"
            placeholder="Enter Parent/Guardian Name"
            value={nokName}
            onChange={(e) => setNokName(e.target.value)}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="nokNumber">Parent/Guardian Number</Label>
          <Input
            type="text"
            id="nokNumber"
            placeholder="Enter Parent/Guardian Number"
            value={nokNumber}
            onChange={(e) => setNokNumber(e.target.value)}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-6">
          <Button
            variant="destructive"
            onClick={() => router.push("/dashboard/students")}
          >
            Cancel
          </Button>
          <Button type="submit">Update Student</Button>
        </div>
      </form>
    </div>
  );
};

export default StudentCard;
