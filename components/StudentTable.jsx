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

const StudentTable = () => {
  const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`${apiUrl}/api/students`, fetcher);

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
        const res = await fetch(`${apiUrl}/api/students/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          res.status === 200;
          mutate(`${apiUrl}/api/students`);
    } catch (error) {
      console.log(error);
    }
  }

  const sortedStudents = data?.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className='box-border w-full relative overflow-x-auto shadow-md'>
        <Table striped>
            <Table.Head>
                <Table.HeadCell>
                    S/N
                </Table.HeadCell>
                <Table.HeadCell>
                    Name
                </Table.HeadCell>
                <Table.HeadCell>
                    Date Of Birth
                </Table.HeadCell>
                <Table.HeadCell>
                    Father Name
                </Table.HeadCell>
                <Table.HeadCell>
                    Father Phone
                </Table.HeadCell>
                <Table.HeadCell>
                    Mother Name
                </Table.HeadCell>
                <Table.HeadCell>
                    Mother Phone
                </Table.HeadCell>
                <Table.HeadCell>
                    Helper Name
                </Table.HeadCell>
                <Table.HeadCell>
                    Helper Phone
                </Table.HeadCell>
                <Table.HeadCell>
                    Address
                </Table.HeadCell>
                <Table.HeadCell>
                    Edit
                </Table.HeadCell>
                <Table.HeadCell>
                    Delete
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {sortedStudents.map((student, index) => (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={student.id}>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{index+1}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{student.name}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{new Date(student.dob).toLocaleString('en-GB', { timeZone: 'UTC', day: '2-digit', month: '2-digit', year: 'numeric' })}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{student.dadName}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{student.dadNumber}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{student.momName}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{student.momNumber}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{student.helperName}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{student.helperNumber}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{student.address}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <Link href={`${apiUrl}/dashboard/students/${student.id}`}>
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
                                            <AlertDialogTitle>Do you want to delete this Student ?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete {student.name} from the servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>

                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(student.id)}>Delete</AlertDialogAction>
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

export default StudentTable