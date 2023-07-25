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
      <div className='box-border w-2/5 min-w-[325px] flex flex-col items-center gap-8 bg-slate-100 rounded-lg mt-6 p-6'>
        <form 
          className='flex flex-col items-center gap-6 box-border w-full' 
          onSubmit={handleSubmit}
        >
          <div className="grid box-border w-full items-center gap-3">
            <Label htmlFor="name">Name</Label>
            <Input 
              type="text" 
              id="name" 
              placeholder="Enter Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
            />
          </div> 

          <div className="grid box-border w-full items-center gap-3">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input 
              type="date" 
              id="dob" 
              value={dob} 
              onChange={(e) => setDob(e.target.value)} 
              required
            />
          </div>  

          <div className='box-border w-full flex gap-3'>
            <div className="grid box-border w-full items-center gap-3">
              <Label htmlFor="dadName">Father&apos;s Name</Label>
              <Input 
                type="text" 
                id="dadName" 
                placeholder="Enter Father&apos;s Name" 
                value={dadName} 
                onChange={(e) => setDadName(e.target.value)} required
              />
            </div>   

            <div className="grid box-border w-full items-center gap-3">
              <Label htmlFor="dadNumber">Father&apos;s Number</Label>
              <Input 
                type="text" 
                id="dadNumber" 
                placeholder="Enter Father&apos;s Number" 
                value={dadNumber} 
                onChange={(e) => setDadNumber(e.target.value)} required
              />
            </div>
          </div>

          <div className='box-border w-full flex gap-3'>
            <div className="grid box-border w-full items-center gap-3">
              <Label htmlFor="momName">Mother&apos;s Name</Label>
              <Input type="text" id="momName" placeholder="Enter Mother&apos;s Name" value={momName} onChange={(e) => setMomName(e.target.value)} required/>
            </div>   

            <div className="grid box-border w-full items-center gap-3">
              <Label htmlFor="momNumber">Father&apos;s Number</Label>
              <Input type="text" id="momNumber" placeholder="Enter Mother&apos;s Number" value={momNumber} onChange={(e) => setMomNumber(e.target.value)} required/>
            </div>  
          </div>
          
          <div className='box-border w-full flex gap-3'>
            <div className="grid box-border w-full items-center gap-3">
              <Label htmlFor="helperName">Helper&apos;s Name</Label>
              <Input type="text" id="helperName" placeholder="Enter Helper&apos;s Name" value={helperName} onChange={(e) => setHelperName(e.target.value)} required/>
            </div>   

            <div className="grid box-border w-full items-center gap-3">
              <Label htmlFor="helperNumber">Helper&apos;s Number</Label>
              <Input type="text" id="helperNumber" placeholder="Enter Helper&apos;s Number" value={helperNumber} onChange={(e) => setHelperNumber(e.target.value)} required/>
            </div> 
          </div>

          <div className="grid box-border w-full items-center gap-3">
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
    <div className='box-border flex flex-col items-center gap-8 mt-6 w-1/5 min-w-[325px]'>

      <div className='flex justify-between items-center box-border w-full'>
        <p className="text-[27px] font-bold">Students</p>
        <Button onClick={() => setCreate(true)} variant="add">
          <PlusIcon className='mr-2 h-4 w-4'/> Student
        </Button>
      </div>

      <StudentTable />
    </div>
  )
}

export default Students