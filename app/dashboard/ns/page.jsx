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
import { mutate } from "swr";

const NewsletterPage = () => {
  const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const session = useSession();

  const currTeacher = session.data.user?.name;

  const defaultSections = [{
      title: "Newsletter",
      subtitle: '',
      content: '',
      index: 0,
      isCover: true,
      gallery: []
    },
    {
      title: "Kinder 1 & Kinder 2",
      subtitle: 'What have we learnt \nLanguage',
      content: '',
      index: 1,
      gallery: []
    },
    {
      title: "Kinder 1 & Kinder 2",
      subtitle: 'What have we learnt \nMathematics',
      content: '',
      index: 2,
      gallery: []
    },
    {
      title: "Kinder 1 & Kinder 2",
      subtitle: 'What have we learnt \nPractical Life',
      content: '',
      index: 3,
      gallery: []
    },
    {
      title: "Kinder 1 & Kinder 2",
      subtitle: 'What have we learnt \nSensorial',
      content: '',
      index: 4,
      gallery: []
    },
    {
      title: "Kinder 1 & Kinder 2",
      subtitle: 'What have we learnt \nCultural',
      content: '',
      index: 5,
      gallery: []
    },
    {
      title: "Kinder 1 & Kinder 2",
      subtitle: 'What have we learnt \nChinese Language',
      content: '',
      index: 6,
      gallery: []
    },
    {
      title: "Kinder 1 & Kinder 2 Gallery",
      subtitle: '',
      content: '',
      index: 7,
      isImage: true,
      gallery: []
    },
    {
      title: "Nursery",
      subtitle: 'What have we learnt \nLanguage',
      content: '',
      index: 8,
      gallery: []
    },
    {
      title: "Nursery",
      subtitle: 'What have we learnt \nMathematics',
      content: '',
      index: 9,
      gallery: []
    },
    {
      title: "Nursery",
      subtitle: 'What have we learnt \nPractical Life',
      content: '',
      index: 10,
      gallery: []
    },
    {
      title: "Nursery",
      subtitle: 'What have we learnt \nSensorial',
      content: '',
      index: 11,
      gallery: []
    },
    {
      title: "Nursery",
      subtitle: 'What have we learnt \nCultural',
      content: '',
      index: 12,
      gallery: []
    },
    {
      title: "Nursery",
      subtitle: 'What have we learnt \nChinese Language',
      content: '',
      index: 13,
      gallery: []
    },
    {
      title: "Nursery Gallery",
      subtitle: '',
      content: '',
      index: 14,
      isImage: true,
      gallery: []
    },
    {
      title: "Toddlers",
      subtitle: 'What have we learnt \nLanguage',
      content: '',
      index: 15,
      gallery: []
    },
    {
      title: "Toddlers",
      subtitle: 'What have we learnt \nMathematics',
      content: '',
      index: 16,
      gallery: []
    },
    {
      title: "Toddlers",
      subtitle: 'What have we learnt \nPractical Life',
      content: '',
      index: 17,
      gallery: []
    },
    {
      title: "Toddlers",
      subtitle: 'What have we learnt \nSensorial',
      content: '',
      index: 18,
      gallery: []
    },
    {
      title: "Toddlers",
      subtitle: 'What have we learnt \nCultural',
      content: '',
      index: 19,
      gallery: []
    },
    {
      title: "Toddlers",
      subtitle: 'What have we learnt \nChinese Language',
      content: '',
      index: 20,
      gallery: []
    },
    {
      title: "Toddlers Gallery",
      subtitle: '',
      content: '',
      index: 21,
      isImage: true,
      gallery: []
    },
    {
      title: "Afternoon Program",
      subtitle: 'What have we learnt \nEnglish',
      content: '',
      index: 22,
      gallery: []
    },
    {
      title: "Afternoon Program",
      subtitle: 'What have we learnt \nChinese',
      content: '',
      index: 23,
      gallery: []
    },
    {
      title: "Afternoon Program Gallery",
      subtitle: '',
      content: '',
      index: 24,
      isImage: true,
      gallery: []
    },
    {
      title: "Announcements",
      subtitle: 'Important Dates',
      content: '',
      index: 25,
      gallery: []
    }];

  const [name, setName] = useState("");
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const handleCreateNewsletter = async (e) => {
    e.preventDefault();

    const newNewsletter = {
      name: name,
      sections: {
        create: defaultSections
      }
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
    <div className="flex flex-col box-border w-2/5 px-16 mt-6 gap-6 items-center">

      <div className="flex gap-6 items-center box-border w-full justify-between">
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
