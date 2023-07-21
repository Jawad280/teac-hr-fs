'use client'
import React, {useState} from 'react'
import StudentsTableAttendance from '@/components/StudentsTableAttendance'
import { Button } from './ui/button';
import { PlusIcon } from '@radix-ui/react-icons'
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
import { useRouter } from 'next/navigation';
import { mutate } from 'swr';
import { useSession } from 'next-auth/react';

const ClassroomDisplay = ({classroom }) => {
    const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const router = useRouter();
    const teacher = classroom.Teacher;
    const students = classroom.students?.sort((a, b) => a.name.localeCompare(b.name));

    const session = useSession();

    const currTeacher = session.data.user?.name;

    const [today, setToday] = useState(new Date());

    const handleDeleteClassroom = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${apiUrl}/api/classrooms/${classroom.id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              }).then(() => {
                mutate(`${apiUrl}/api/classrooms`)
                router.push('/dashboard/classrooms');
              });

        } catch (error) {
          console.log(error);
        }
    }

  return (
    <div className='flex flex-col gap-6 box-border w-full'>

        <div className='flex justify-between items-center box-border w-full'>
            <div className='flex flex-col gap-1 items-start'>
                <p className="text-[18px] font-bold">Teacher</p>
                <p className="text-[20px]">{teacher.name}</p>
            </div>

            <div className='flex flex-col gap-1 items-start'>
                <p className="text-[20px] font-bold">{classroom.name}</p>
            </div>

            <div className='flex flex-col gap-1 items-start'>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <p className="text-[18px] font-bold hover:bg-blue-50 px-4 py-2 rounded-lg cursor-pointer">{today.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Choose Day</AlertDialogTitle>
                            <AlertDialogDescription>
                                <input 
                                    type="date" 
                                    className='box-border border-slate-400 rounded-lg cursor-pointer'   
                                    value={today.toISOString().split('T')[0]}
                                    onChange={(e) => setToday(new Date(e.target.value))}
                                />
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setToday(new Date())}>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Submit</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                
            </div>
        </div>

        <div className='flex flex-col gap-6 box-border w-full'>

            {currTeacher.isAdmin && (
                <div className='flex gap-4 box-border justify-end'>
                    {/* <Button variant={'add'}>
                        <PlusIcon className='mr-2 h-4 w-4'/> Add a Student
                    </Button> */}

                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Button variant={'destructive'} className='box-border w-full'> Delete Classroom</Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Do you want to delete this Classroom ?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete {classroom.name} from the servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteClassroom}>Delete Classroom</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )}

            <StudentsTableAttendance students={students} date={today}/>

        </div>

        
    </div>
  )
}

export default ClassroomDisplay