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

  const [dadName, setDadName] = useState('');
  const [dadNumber, setDadNumber] = useState('');

  const [momName, setMomName] = useState('');
  const [momNumber, setMomNumber] = useState('');

  const [helperName, setHelperName] = useState('');
  const [helperNumber, setHelperNumber] = useState('');

  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newStudent = {
      name: name,
      dob: new Date(dob),
      dadName: dadName,
      dadNumber: dadNumber,
      momName: momName,
      momNumber: momNumber,
      helperName: helperName,
      helperNumber: helperNumber,
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
        setDadName('')
        setDadNumber('')
        setMomName('')
        setMomNumber('')
        setHelperName('')
        setHelperNumber('')
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
            <Label htmlFor="dadName">Father's Name</Label>
            <Input type="text" id="dadName" placeholder="Enter Father's Name" value={dadName} onChange={(e) => setDadName(e.target.value)} required/>
          </div>   

          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="dadNumber">Father's Number</Label>
            <Input type="text" id="dadNumber" placeholder="Enter Father's Number" value={dadNumber} onChange={(e) => setDadNumber(e.target.value)} required/>
          </div>
          
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="momName">Mother's Name</Label>
            <Input type="text" id="momName" placeholder="Enter Mother's Name" value={momName} onChange={(e) => setMomName(e.target.value)} required/>
          </div>   

          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="momNumber">Father's Number</Label>
            <Input type="text" id="momNumber" placeholder="Enter Mother's Number" value={momNumber} onChange={(e) => setMomNumber(e.target.value)} required/>
          </div>   

          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="helperName">Helper's Name</Label>
            <Input type="text" id="helperName" placeholder="Enter Helper's Name" value={helperName} onChange={(e) => setHelperName(e.target.value)} required/>
          </div>   

          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="helperNumber">Helper's Number</Label>
            <Input type="text" id="helperNumber" placeholder="Enter Helper's Number" value={helperNumber} onChange={(e) => setHelperNumber(e.target.value)} required/>
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