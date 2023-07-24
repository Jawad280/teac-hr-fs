"use client";
import React from 'react'
import { useSession } from "next-auth/react";
import { Button } from '@/components/ui/button';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

const ProfilePage = () => {
    const session = useSession();
    const teacher = session.data?.user?.name;
    const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const router = useRouter();
    const [name, setName] = useState(teacher.name);
    const [email, setEmail] = useState(teacher.email);
    const [phone, setPhone] = useState(teacher.phone);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
    
        try {
            const res = await fetch(`${apiUrl}/api/teachers/${teacher.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, email, phone, newPassword , oldPassword}),
            }).then(() => {
            mutate(`${apiUrl}/api/teachers`);
            router.push("/dashboard/profile");
            });
        } catch (error) {
          console.log(error);
        }
    };

  return (
    <div className="box-border w-1/5 min-w-[325px] flex flex-col items-center gap-8 mt-6 bg-slate-100 rounded-lg p-10 shadow-sm">
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

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="email">Old Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter Your Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="email">New Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter Your New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-6">
          <Button type="submit">Update Account</Button>
        </div>
      </form>
    </div>
  )
}

export default ProfilePage