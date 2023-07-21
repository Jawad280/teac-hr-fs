'use client'
import React from 'react'
import { Table } from 'flowbite-react';
import useSWR, { mutate } from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpenIcon } from 'lucide-react';
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
import { Trash2 } from 'lucide-react';

const NewsletterList = ({ isAdmin }) => {

    const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data, error, isLoading } = useSWR(`${apiUrl}/api/newsletters`, fetcher);

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
            const res = await fetch(`${apiUrl}/api/newsletters/${id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              res.status === 200;
              mutate(`${apiUrl}/api/newsletters`);
        } catch (error) {
          console.log(error);
        }
    }

  return (
    <div className='box-border w-full relative overflow-x-auto shadow-md'>
        <Table striped>
            <Table.Head>
                <Table.HeadCell>
                    S/N
                </Table.HeadCell>
                <Table.HeadCell>
                    Newsletter
                </Table.HeadCell>
                <Table.HeadCell>
                    View
                </Table.HeadCell>
                { isAdmin && (
                    <Table.HeadCell>
                        Delete
                    </Table.HeadCell>
                )}

            </Table.Head>
            <Table.Body className="divide-y">
                {data.map((newsletter, index) => (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={newsletter.id}>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{index+1}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{newsletter.name}</Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <Link href={`${apiUrl}/dashboard/ns/${newsletter.id}`}>
                                <BookOpenIcon />
                            </Link>
                        </Table.Cell>
                        { isAdmin && (
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                <div>
                                    <AlertDialog>
                                        <AlertDialogTrigger>
                                            {/* <Image src="/trash.svg" width={20} height={20} alt='delete'/> */}
                                            <Trash2 width={22} height={22} color='red'/>
                                        </AlertDialogTrigger>

                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Do you want to delete this Newsletter ?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete {newsletter.name} from the servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>

                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(newsletter.id)}>Delete</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </Table.Cell>
                        )}

                    </Table.Row>
                ))}

            </Table.Body>
        </Table>
    </div>
  )
}

export default NewsletterList