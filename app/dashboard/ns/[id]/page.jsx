'use client'
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import useSWR, { mutate } from 'swr';
import SectionCard from '@/components/SectionCard';
import Link from 'next/link';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { PrinterIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const IndiNewsletter = ({params}) => {

    const id = params.id;
    const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data, error, isLoading } = useSWR(`${apiUrl}/api/newsletters/${id}`, fetcher);
    const router = useRouter();

    const [view, setView] = useState(false);

    const sortedSections = data?.sections.sort((a, b) => a.index - b.index);

    function splitArrayIntoChunks(array, chunkSize) {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
          const chunk = array.slice(i, i + chunkSize);
          chunks.push(chunk);
        }
        return chunks;
    }

    if (view) {
        return (
            <div className='box-border flex flex-col items-center relative w-full'>
                <div className='top-40 box-border w-full flex justify-between items-center px-14 sticky z-50'>

                    <div className='bg-slate-100 p-4 flex justify-center items-center cursor-pointer rounded-full hover:shadow-md hover:bg-slate-200 transition-all' onClick={() => setView(false)}>
                        <ArrowLeftIcon width={35} height={35} color='black'/>
                    </div>

                    <div className='bg-blue-100 p-4 flex justify-center items-center cursor-pointer rounded-full hover:shadow-md hover:bg-blue-200 transition-all' onClick={() => window.print()}>
                        <PrinterIcon width={35} height={35} color='black'/>
                    </div>

                </div>


                <div id='print-content' className='w-[21cm] flex flex-col items-center border box-border shadow-sm'>
                    {
                        sortedSections?.map((sect) => (
                            <div key={sect.id} className='box-border w-full'>
                                {
                                    sect.isCover && (
                                        <div className='box-border flex flex-col items-center h-[29.6cm] p-4 gap-6 justify-center w-full'>
                                            <div className='font-bold text-[45px]'>{sect?.title}</div>
                                                <Image width={400} height={400} alt='logo' src='/logo.svg' />
                                            <div className='font-semibold text-[25px]'> {sect?.subtitle}</div>
                                        </div>                                    
                                    )
                                }

                                {
                                    sect.isImage && (
                                        splitArrayIntoChunks(sect.gallery, 9).map((arr, index) => (
                                            <div className='box-border flex flex-col items-center h-[29.6cm] p-4 gap-6 w-full' key={index}>
                                                <div className='font-bold text-[20px]'>{sect?.title}</div>
                                                <div className='font-semibold text-[18px]'>{sect?.subtitle}</div>
                                                <div className='flex flex-wrap gap-6 box-border justify-center'>
                                                    {arr.map((img, index) => (
                                                        <div key={index} className='relative w-[5cm] h-[7cm]'>
                                                            <Image 
                                                                fill
                                                                src={img}
                                                                objectFit="cover"
                                                                alt='pictures'
                                                            />
                                                        </div>
            
                                                    ))}
                                                </div>
            
                                            </div>                             
                                        ))                                    
                                    )
                                }

                                {   !sect.isCover && !sect.isImage &&
                                    (
                                        <div className='box-border flex flex-col items-center h-[14.8cm] px-12 py-10 gap-6 w-full'>
                                            <div className='font-bold text-[40px]'>{sect?.title}</div>
                                            <div className='font-semibold text-[30px] text-center' style={{ whiteSpace: 'pre-wrap' }}>{sect?.subtitle}</div>
                                            <div className='font-default text-[18px]' style={{ whiteSpace: 'pre-wrap' }}>{sect?.content}</div>
                                        </div>
                                    )                                
                                }
                            </div>

                        ))
                    }

                </div>


            </div>
        )
    }

  return (
    <div className='box-border flex flex-col items-center gap-6 mt-6 mb-8 w-3/5'>

        <div className='flex justify-between box-border items-center w-full'>
            <div className='font-bold text-[20px]'>
                <div>{data?.name}</div>
            </div>

            <div className='flex gap-4'>
                <Button onClick={() => setView(true)}>View Newsletter</Button>
            </div>
        </div>


        <div className='flex flex-col items-center gap-4 box-border w-full'>
            {sortedSections?.map((sect) => (
                <Link key={sect.id} href={`${apiUrl}/dashboard/ns/sections/${sect.id}`} className='box-border w-full'>
                    <SectionCard section={sect} />
                </Link>
            ))}
        </div>
    </div>
  )
}

export default IndiNewsletter