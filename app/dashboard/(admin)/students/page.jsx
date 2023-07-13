'use client'
import React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PlusIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import StudentTable from '@/components/StudentTable'

const Students = () => {
  const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const [create, setCreate] = useState(false);

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [nokName, setNokName] = useState('');
  const [nokNumber, setNokNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newStudent = {
      name: name,
      dob: new Date(dob),
      nokName: nokName,
      nokNumber: nokNumber,
      address: address
    }

    try {
      const res = await fetch(`${apiUrl}/api/students`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newStudent),
      })
      .then(() => {
        setName('')
        setDob('')
        setNokName('')
        setNokNumber('')
        setAddress('')
        setCreate(false)
      })
    } catch (error) {
      console.log(error);
    }
  }


  if (create) {
    return (
      <div className='box-border w-1/5 flex flex-col items-center gap-8 mt-6 bg-slate-100 rounded-lg p-10 shadow-sm'>
        <form className='flex flex-col items-center gap-6 box-border w-full' onSubmit={handleSubmit}>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required/>
          </div> 

          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} required/>
          </div>  

          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="nokName">Parent/Guardian Name</Label>
            <Input type="text" id="nokName" placeholder="Enter Parent/Guardian Name" value={nokName} onChange={(e) => setNokName(e.target.value)} required/>
          </div>   

          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="nokNumber">Parent/Guardian Number</Label>
            <Input type="text" id="nokNumber" placeholder="Enter Parent/Guardian Number" value={nokNumber} onChange={(e) => setNokNumber(e.target.value)} required/>
          </div>   

          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="address">Address</Label>
            <Input type="text" id="address" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} required/>
          </div>   

          <div className='flex items-center gap-6'>
            <Button onClick={() => setCreate(false)} variant="destructive">Cancel</Button>
            <Button type='submit'>Create Student</Button>
          </div>
      
        </form>
      </div>
    )
  }

  return (
    <div className='box-border flex flex-col items-center gap-8 mt-6'>

      <div className='flex justify-between items-center box-border w-full'>
        <p className="text-[27px] font-bold">Students</p>
        <Button onClick={() => setCreate(true)} variant="add">
          <PlusIcon className='mr-2 h-4 w-4'/> Add Student
        </Button>
      </div>

      <StudentTable />
    </div>
  )
}

export default Students