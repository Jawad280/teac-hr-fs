'use client'
import React from 'react'
import TeachersTable from '@/components/TeachersTable'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PlusIcon } from '@radix-ui/react-icons'
import Image from 'next/image'

const Teachers = () => {

  const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const [create, setCreate] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTeacher = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      isAdmin: false
    }

    try {
      const res = await fetch(`${apiUrl}/api/teachers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTeacher),
      })
      .then(() => {
        setName('')
        setEmail('')
        setPhone('')
        setPassword('')
        setCreate(false)
      })
    } catch (error) {
      console.log(error);
    }
  }

  if (create) {
    return (
      <div className='box-border w-2/5 min-w-[325px] flex flex-col items-center gap-8 mt-6 bg-slate-100 rounded-lg p-10 shadow-sm'>
        <form 
          onSubmit={handleSubmit} 
          className='flex flex-col items-center gap-6 box-border w-full'
        >
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="name">Name</Label>
            <Input 
              type="name" 
              id="name" 
              placeholder="Enter Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
            />
          </div> 

          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              type="text" 
              id="phone" 
              placeholder="Enter Phone Number" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} required
            />
          </div>  

          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>   

          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>   

          <div className='flex items-center gap-6'>
            <Button onClick={() => setCreate(false)} variant="destructive">Cancel</Button>
            <Button type='submit'>Create Teacher</Button>
          </div>
      
        </form>
      </div>
    )
  }

  return (
    <div className='box-border flex flex-col items-center gap-8 mt-6 w-1/4 min-w-[325px]'>

      <div className='flex justify-between items-center box-border w-full'>
        <p className="text-[27px] font-bold">Teachers</p>
        <Button onClick={() => setCreate(true)} variant="add">
          <PlusIcon className='mr-2 h-4 w-4'/> Teacher
        </Button>
      </div>
      
      <TeachersTable />
    </div>
  )
}

export default Teachers