'use client'
import React from 'react'
import useSWR from 'swr';
import StudentCard from '@/components/StudentCard';

const StudentIndividual = ({params}) => {

    const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const id = params.id;
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data, error, isLoading } = useSWR(`${apiUrl}/api/students/${id}`, fetcher);

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

  return (
    <div className='box-border w-2/5 min-w-[325px] flex flex-col items-center gap-8 mt-6 bg-slate-100 rounded-lg p-10 shadow-sm'>
        <StudentCard student={data}/>
    </div>
  )
}

export default StudentIndividual