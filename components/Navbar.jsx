"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  const currentPath = usePathname();
  const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const isActiveLink = (href) => {
    return currentPath === href;
  };

  if (session.data.user?.name?.isAdmin) {
    return (
      <nav className="flex justify-between items-center w-full p-6 bg-white shadow-sm">
        <Link href="/dashboard/classrooms" className=" font-bold text-[22px]">
          TeacHR
        </Link>

        <div className="flex justify-center items-center gap-2">
          <Link
            href="/dashboard/classrooms"
            className={
              isActiveLink("/dashboard/classrooms")
                ? buttonVariants({ variant: "linkChosen" })
                : buttonVariants({ variant: "link" })
            }
          >
            Classrooms
          </Link>

          <Link
            href="/dashboard/teachers"
            className={
              isActiveLink("/dashboard/teachers")
                ? buttonVariants({ variant: "linkChosen" })
                : buttonVariants({ variant: "link" })
            }
          >
            Teachers
          </Link>

          <Link
            href="/dashboard/students"
            className={
              isActiveLink("/dashboard/students")
                ? buttonVariants({ variant: "linkChosen" })
                : buttonVariants({ variant: "link" })
            }
          >
            Students
          </Link>

          <Link
            href="/dashboard/ns"
            className={
              isActiveLink("/dashboard/ns")
                ? buttonVariants({ variant: "linkChosen" })
                : buttonVariants({ variant: "link" })
            }
          >
            Newsletters
          </Link>

          <Link
            href="/dashboard/resources"
            className={
              isActiveLink("/dashboard/resources")
                ? buttonVariants({ variant: "linkChosen" })
                : buttonVariants({ variant: "link" })
            }
          >
            Resources
          </Link>

          <Button
            className="flex gap-2 text-rose-400 ml-2"
            variant={"signout"}
            onClick={(e) => {
              e.preventDefault(); // Prevent the default button click behavior
              signOut(); // Invoke the signOut function
            }}
          >
            Logout
          </Button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex justify-between items-center w-full p-6 bg-white shadow-sm">
      <div className="flex gap-6 items-center">
        <Link href="/dashboard/classrooms" className=" font-bold text-[22px]">
          TeacHR
        </Link>
        <div className="font-semibold text-lg text-slate-500">
          Welcome {session.data.user?.name?.name}
        </div>
      </div>

      <div className="flex justify-center items-center">
        <Link
          href="/dashboard/classrooms"
          className={
            isActiveLink("/dashboard/classrooms")
              ? buttonVariants({ variant: "linkChosen" })
              : buttonVariants({ variant: "link" })
          }
        >
          Classrooms
        </Link>

        <Link
          href="/dashboard/ns"
          className={
            isActiveLink("/dashboard/ns")
              ? buttonVariants({ variant: "linkChosen" })
              : buttonVariants({ variant: "link" })
          }
        >
          Newsletters
        </Link>

        <Link
          href="/dashboard/resources"
          className={
            isActiveLink("/dashboard/resources")
              ? buttonVariants({ variant: "linkChosen" })
              : buttonVariants({ variant: "link" })
          }
        >
          Resources
        </Link>

        <Link
          href="/dashboard/profile"
          className={
            isActiveLink("/dashboard/profile")
              ? buttonVariants({ variant: "linkChosen" })
              : buttonVariants({ variant: "link" })
          }
        >
          Profile
        </Link>

        <Button
          className="text-rose-400 ml-2"
          variant={"signout"}
          onClick={(e) => {
            e.preventDefault(); // Prevent the default button click behavior
            signOut(); // Invoke the signOut function
          }}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
