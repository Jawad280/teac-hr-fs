'use client'
import React, { useState, useEffect } from 'react'
import useSWR, { mutate } from 'swr';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useToast } from '@/components/ui/use-toast';
import { Trash2 } from 'lucide-react';
import ImageUpload from '@/components/image-upload';

const IndividualNewsletterPage = ({params}) => {

    const id = params.id;
    const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const session = useSession();

    const currTeacher = session?.data?.user?.name;
    
    const router = useRouter();
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data, error, isLoading } = useSWR(`${apiUrl}/api/sections/${id}`, fetcher);

    const { toast } = useToast();
  
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    
    useEffect(() => {
      if (data) {
        setSubtitle(data.subtitle || '');
        setContent(data.content || '');
        setImages(data.gallery || []);
      }
    }, [data]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const updatedSection = {
            content: content,
            subtitle: subtitle
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
        
            router.push(`${apiUrl}/dashboard/ns/${data.newsletterId}`);
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

    const handleImage = async (e) => {
        e.preventDefault();

        const updatedSection = {
            gallery: images
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
        
            router.push(`${apiUrl}/dashboard/ns/${data.newsletterId}`);
            } else {
            // Handle unsuccessful response here
            console.log('Update failed:', res.status);
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (data?.isCover) {
        return (
            <div className='box-border w-3/5 min-w-[325px] flex flex-col items-center gap-8 mt-6 bg-slate-100 rounded-lg p-10 shadow-sm'>
        
                <div className='flex items-center justify-between gap-6 box-border w-full'>
                    <Button onClick={() => router.back()} variant={'back'} size={'icon'}>
                        <ArrowLeftIcon width={25} height={25} color='black'/>
                    </Button>
        
                    <div className='flex flex-col items-center'>
                        <div className='font-bold text-[18px]'>{data?.title}</div>
                    </div>
        
                    {currTeacher.isAdmin ? (
                        <Button onClick={handleDelete} variant="delete" size={'icon'}>
                            <Trash2 width={25} height={25} color='red'/>
                        </Button>
                    ) : (
                        <div style={{ width: '25px', height: '25px' }}></div>
                    )}
        
                </div>
        
                <form className='flex flex-col items-center gap-6 box-border w-full' onSubmit={handleUpdate}>
        
                    <div className="grid w-full items-center gap-3">
                        <Label htmlFor="subtitle" className='font-semibold'>Title For Newsletter</Label>
                        <input 
                            type='text'
                            placeholder='Enter Title'
                            className='border-slate-300 rounded-lg'
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                        />
                    </div>   
        
                    <Button type='submit'>Update Title</Button>
        
            
                </form>
        
            </div>
        )        
    }


    if (data?.isImage) {

        return (
            <div className='box-border w-3/5 min-w-[325px] flex flex-col items-center gap-8 mt-6 bg-slate-100 rounded-lg p-10 shadow-sm'>

                <div className='flex items-center justify-between gap-6 box-border w-full'>
                    <Button onClick={() => router.back()} variant={'back'} size={'icon'}>
                        <ArrowLeftIcon width={25} height={25} color='black'/>
                    </Button>

                    <div className='flex flex-col items-center'>
                        <div className='font-bold text-[18px]'>{data?.title}</div>
                        <div className='font-semibold text-[16px] text-center' style={{ whiteSpace: 'pre-wrap' }}>{data?.subtitle}</div>
                    </div>

                    <div style={{ width: '25px', height: '25px' }}></div>

                </div>

                <form className='flex flex-col items-center gap-6 box-border w-full' onSubmit={handleImage}>

                    <div className="flex gap-3 box-border items-center">
                        <ImageUpload
                            value={images}
                            disabled={isLoading}
                            onChange={(urls) => setImages(urls)}
                            onRemove={(urls) => setImages(urls)}
                        />
                        
                    </div>   

                    <Button type='submit' variant={'add'}>Submit</Button>

                </form>

            </div> 
        )
       
    }

  return (
    <div className='box-border w-3/5 min-w-[325px] flex flex-col items-center gap-8 mt-6 bg-slate-100 rounded-lg p-10 shadow-sm'>

        <div className='flex items-center justify-between gap-6 box-border w-full'>
            <Button onClick={() => router.back()} variant={'back'} size={'icon'}>
                <ArrowLeftIcon width={25} height={25} color='black'/>
            </Button>

            <div className='flex flex-col items-center'>
                <div className='font-bold text-[18px]'>{data?.title}</div>
                <div className='font-semibold text-[16px] text-center' style={{ whiteSpace: 'pre-wrap' }}>{data?.subtitle}</div>
            </div>

            {currTeacher.isAdmin ? (
                <Button onClick={handleDelete} variant="delete" size={'icon'}>
                    <Trash2 width={25} height={25} color='red'/>
                </Button>
            ) : (
                <div style={{ width: '25px', height: '25px' }}></div>
            )}

        </div>

        <form className='flex flex-col items-center gap-6 box-border w-full' onSubmit={handleUpdate}>

            <div className="grid w-full items-center gap-3">
                <Label htmlFor="content" className='font-semibold'>Content</Label>
                <textarea 
                    name="content" 
                    id="content" 
                    placeholder='Enter Content'
                    cols="30" 
                    rows="10" 
                    className='border-slate-300 rounded-lg'
                    value={content.replace(/ /g, '\u00A0').replace(/\n/g, '\n')}
                    onChange={(e) => setContent(e.target.value.replace(/\u00A0/g, ' '))}
                />
            </div>   

            <Button type='submit'>Update Section</Button>

    
        </form>

    </div>
  )
}

export default IndividualNewsletterPage