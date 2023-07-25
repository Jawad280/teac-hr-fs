import React from 'react'
import { CalendarIcon, HomeIcon } from 'lucide-react'

const StudentTableCard = ({student}) => {
  return (
    <div className='flex flex-col items-center box-border w-full'>
        
        <div className='text-lg font-bold box-border w-full p-2'>{student.name}</div>

        <div className='flex items-center gap-2 box-border w-full p-2'>
            <CalendarIcon width={20} height={20}/>
            <p>{new Date(student.dob).toLocaleString('en-GB', { timeZone: 'UTC', day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
        </div>

        <div className='flex items-center gap-2 box-border w-full p-2'>
            <HomeIcon width={20} height={20}/>
            <p>{student.address}</p>
        </div>

        <div className='flex flex-col items-start box-border w-full p-2'>
            <div className='font-bold'>
                Father
            </div>

            <div className='flex flex-col items-start'>
                <p>{student.dadName}</p>
                <p>{student?.dadNumber && `+65 ${student.dadNumber}`}</p>
            </div>
        </div>

        <div className='flex flex-col items-start box-border w-full p-2'>
            <div className='font-bold'>
                Mother
            </div>

            <div className='flex flex-col items-start'>
                <p>{student.momName}</p>
                <p>{student?.momNumber && `+65 ${student.momNumber}`}</p>
            </div>
        </div>

        <div className='flex flex-col items-start box-border w-full p-2'>
            <div className='font-bold'>
                Helper
            </div>

            <div className='flex flex-col items-start'>
                <p>{student.helperName}</p>
                <p>{student?.helperNumber && `+65 ${student.helperNumber}`}</p>
            </div>
        </div>

    </div>
  )
}

export default StudentTableCard