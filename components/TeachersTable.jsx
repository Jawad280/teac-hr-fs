'use client'
import React from 'react'
import { Table } from 'flowbite-react';
import useSWR, { mutate } from 'swr';
import Link from 'next/link';
import Image from 'next/image'
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

const TeachersTable = () => {

    const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data, error, isLoading } = useSWR(`${apiUrl}/api/teachers`, fetcher);

  if (isLoading) {
    return (
      <div>
        Loading...
      </div> 
      );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleDelete = async (id) => {
    try {
        const res = await fetch(`${apiUrl}/api/teachers/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          res.status === 200;
          mutate(`${apiUrl}/api/teachers`);
    } catch (error) {
      console.log(error);
    }
  }

  const sortedTeachers = data?.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className='box-border w-full'>
        <Table striped>
            <Table.Head>
                <Table.HeadCell>
                    S/N
                </Table.HeadCell>
                <Table.HeadCell>
                    Name
                </Table.HeadCell>
                <Table.HeadCell>
                    Email
                </Table.HeadCell>
                <Table.HeadCell>
                    Phone Number
                </Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">
                    Edit
                    </span>
                </Table.HeadCell>
                <Table.HeadCell>
                    <span className="sr-only">
                    Delete
                    </span>
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {sortedTeachers.filter((x) => !x.isAdmin).map((teacher, index) => (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={teacher.id}>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{index+1}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{teacher.name}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{teacher.email}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{teacher.phone}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <Link href={`${apiUrl}/dashboard/teachers/${teacher.id}`}>
                                <Image src="/edit-black.svg" width={20} height={20} alt='edit'/>
                            </Link>
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <div>
                                <AlertDialog>
                                    <AlertDialogTrigger>
                                        <Image src="/trash.svg" width={20} height={20} alt='delete'/>
                                    </AlertDialogTrigger>

                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Do you want to delete this Teacher ?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete {teacher.name} from the servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>

                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(teacher.id)}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </Table.Cell>
                    </Table.Row>
                ))}

            </Table.Body>
        </Table>
    </div>
  )
}

export default TeachersTable