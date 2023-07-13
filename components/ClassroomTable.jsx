'use client'
import React from 'react'
import useSWR, { mutate } from 'swr';
import ClassroomCard from './ClassroomCard'
import Link from 'next/link';
import { useSession } from "next-auth/react";


const ClassroomTable = () => {
    const session = useSession();
    const currTeacher = session.data.user?.name;
    const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data, error, isLoading } = useSWR(`${apiUrl}/api/classrooms`, fetcher);

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

    if (!currTeacher?.isAdmin) {
      return (
        <div className='box-border flex gap-8 flex-wrap justify-start'>
          {currTeacher?.classrooms?.map((classroom) => (
            <Link href={`${apiUrl}/dashboard/classrooms/${classroom.id}`} key={classroom.id}>
              <ClassroomCard classroom={classroom}/>
            </Link>
          ))}
        </div>        
      )
    }

  return (
    <div className='box-border flex gap-8 flex-wrap justify-start'>
      {data.map((classroom) => (
        <Link href={`${apiUrl}/dashboard/classrooms/${classroom.id}`} key={classroom.id}>
          <ClassroomCard classroom={classroom}/>
        </Link>
      ))}
    </div>
  )
}

export default ClassroomTable