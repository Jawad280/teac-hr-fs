'use client'
import React from 'react'
import useSWR from 'swr';
import ClassroomDisplay from "@/components/ClassroomDisplay";

const ClassroomIndividual = ({params}) => {
    const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const id = params.id;
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data, error, isLoading } = useSWR(`${apiUrl}/api/classrooms/${id}`, fetcher);

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
      <div className='box-border mt-6 w-3/5 min-w-[325px]'>
        <ClassroomDisplay classroom={data}/>
      </div>
    )
}

export default ClassroomIndividual