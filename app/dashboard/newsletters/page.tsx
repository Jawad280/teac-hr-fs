"use client";
import React, { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import NewsletterList from "@/components/NewsletterList";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

const NewsletterPage = () => {
  const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const session = useSession();
  const router = useRouter();

  const currTeacher = session.data.user?.name;

  const [name, setName] = useState("");
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const handleCreateNewsletter = async (e) => {
    e.preventDefault();

    const newNewsletter = {
      name: name,
    };

    try {
      const res = await fetch(`${apiUrl}/api/newsletters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNewsletter),
      }).then(() => {
        mutate(`${apiUrl}/api/newsletters`);
        setName("");
        setIsAlertDialogOpen(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col box-border w-full px-16 mt-6 gap-6 items-center">
      <div className="flex gap-6 items-center">
        <p className="text-[27px] font-bold">Newsletters</p>
        {currTeacher?.isAdmin && (
          <AlertDialog
            open={isAlertDialogOpen}
            onOpenChange={setIsAlertDialogOpen}
          >
            <AlertDialogTrigger>
              <Button variant="add">
                <PlusIcon className="mr-2 h-4 w-4" /> Add a Newsletter
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Name of Newsletter</AlertDialogTitle>
                <AlertDialogDescription>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-slate-700 rounded-lg"
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleCreateNewsletter}>
                  Submit
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <NewsletterList isAdmin={currTeacher?.isAdmin} />
    </div>
  );
};

export default NewsletterPage;
