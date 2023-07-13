'use client'
import React, { useState } from 'react'
import ClassroomTable from '../../../../components/ClassroomTable'
import { buttonVariants } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { useSession } from "next-auth/react";
import Link from 'next/link'

const Classrooms = () => {
  const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const session = useSession();

  const currTeacher = session.data.user?.name;

  return (
    <div className='flex flex-col box-border w-full px-16 mt-6 gap-6 items'>
      <div className='flex gap-6 items-center'>
        <p className="text-[27px] font-bold">Classrooms</p>
        {currTeacher?.isAdmin && (
          <Link href={`${apiUrl}/dashboard/createClassroom`} className={buttonVariants({variant:'add'})}>
            <PlusIcon className='mr-2 h-4 w-4'/> Add a Classroom
          </Link>
        )}

      </div>

      <div className='flex justify-start box-border w-full'>
        <ClassroomTable />
      </div>
    </div>
  )
}

export default Classrooms