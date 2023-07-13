"use client";
import React from "react";
import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { PersonIcon } from "@radix-ui/react-icons";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { LogInIcon } from "lucide-react";
import { Label, TextInput } from "flowbite-react";

const Login = () => {
  const session = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", { email, password });
  };

  if (session.status === "loading") {
    return <div>Loading...</div>;
  }

  if (session.status === "authenticated") {
    router?.push("/dashboard/classrooms");
  }

  return (
    <div className="border-box flex flex-col items-center justify-center p-8 bg-sky-50 rounded-lg shadow-md">
      <form
        onSubmit={handleSubmit}
        className="border-box flex flex-col gap-6 w-full"
      >
        <div className="box-border w-full">
          <TextInput
            icon={PersonIcon}
            id="email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
        </div>

        <div className="box-border w-full">
          <TextInput
            icon={LockClosedIcon}
            id="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>

        <Button type="submit" className="border-box w-full">
          <LogInIcon className="mr-2 h-4 w-4" /> Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
