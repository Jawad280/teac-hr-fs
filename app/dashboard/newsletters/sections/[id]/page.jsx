'use client'
import React, { useState, useEffect } from 'react'
import useSWR, { mutate } from 'swr';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useToast } from '@/components/ui/use-toast';
import { TrashIcon } from '@radix-ui/react-icons';

const page = ({params}) => {

    const id = params.id;
    const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
    
    const router = useRouter();
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data, error, isLoading } = useSWR(`${apiUrl}/api/sections/${id}`, fetcher);

    const { toast } = useToast();
  
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    useEffect(() => {
      if (data) {
        setTitle(data.title || '');
        setContent(data.content || '');
      }
    }, [data]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedSection = {
            title: title,
            content: content
          }

        try {
            const res = await fetch(`${apiUrl}/api/sections/${id}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedSection),
              });
          
            if (res.ok) {
            mutate(`${apiUrl}/api/sections`);
        
            toast({
                title: "Success",
                description: "Section has been added",
                variant: "success"
            });
        
            router.push(`${apiUrl}/dashboard/newsletters/${data.newsletterId}`);
            } else {
            // Handle unsuccessful response here
            console.log('Update failed:', res.status);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${apiUrl}/api/sections/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.ok) {
                mutate(`${apiUrl}/api/sections`);
            
                toast({
                    title: "Success",
                    description: "Section has been deleted",
                    variant: "success"
                });
            
                router.back();
                } else {
                // Handle unsuccessful response here
                console.log('Update failed:', res.status);
                }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='box-border w-3/5 flex flex-col items-center gap-8 mt-6 bg-slate-100 rounded-lg p-10 shadow-sm'>
        <form className='flex flex-col items-center gap-6 box-border w-full' onSubmit={handleUpdate}>

            <div className="grid w-full items-center gap-3">
                <Label htmlFor="title">Title</Label>
                <Input type="text" id="title" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div> 

            <div className="grid w-full items-center gap-3">
                <Label htmlFor="content">Content</Label>
                <textarea 
                name="content" 
                id="content" 
                placeholder='Enter Content'
                cols="30" 
                rows="10" 
                className='border-slate-300 rounded-lg'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                />
            </div>   

            <div className='flex items-center justify-between gap-6 box-border w-full'>
                <Button onClick={() => router.push(`${apiUrl}/dashboard/newsletters/${data.newsletterId}`)} variant={'back'}>
                    <ArrowLeftIcon width={25} height={25} color='black'/>
                </Button>
                <Button type='submit'>Update Section</Button>
                <Button onClick={handleDelete} variant="delete">
                    <TrashIcon width={25} height={25} color='red'/>
                </Button>
            </div>
    
        </form>
    </div>
  )
}

export default page