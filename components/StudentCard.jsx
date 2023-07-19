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

  const [dadName, setDadName] = useState(student.dadName);
  const [dadNumber, setDadNumber] = useState(student.dadNumber);

  const [momName, setMomName] = useState(student.momName);
  const [momNumber, setMomNumber] = useState(student.momNumber);

  const [helperName, setHelperName] = useState(student.helperName);
  const [helperNumber, setHelperNumber] = useState(student.helperNumber);

  const [address, setAddress] = useState(student.address);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedStudent = {
      name: name,
      dob: new Date(dob),
      dadName: dadName,
      dadNumber: dadNumber,
      momName: momName,
      momNumber: momNumber,
      helperName: helperName,
      helperNumber: helperNumber,
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

        <div className="box-border w-full flex gap-3">
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="dadName">Father Name</Label>
            <Input
              type="text"
              id="dadName"
              placeholder="Enter Father's Name"
              value={dadName}
              onChange={(e) => setDadName(e.target.value)}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="dadNumber">Father Number</Label>
            <Input
              type="text"
              id="dadNumber"
              placeholder="Enter Father's Number"
              value={dadNumber}
              onChange={(e) => setDadNumber(e.target.value)}
            />
          </div>
        </div>



        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="momName">Mother's Name</Label>
          <Input
            type="text"
            id="momName"
            placeholder="Enter Father's Name"
            value={momName}
            onChange={(e) => setMomName(e.target.value)}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="momNumber">Mother's Number</Label>
          <Input
            type="text"
            id="momNumber"
            placeholder="Enter Mother's Number"
            value={momNumber}
            onChange={(e) => setMomNumber(e.target.value)}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="helperName">Helper's Name</Label>
          <Input
            type="text"
            id="helperName"
            placeholder="Enter Helper's Name"
            value={helperName}
            onChange={(e) => setHelperName(e.target.value)}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="helperNumber">Helper's Number</Label>
          <Input
            type="text"
            id="helperNumber"
            placeholder="Enter Helper's Number"
            value={helperNumber}
            onChange={(e) => setHelperNumber(e.target.value)}
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
