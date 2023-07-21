'use client'

import React from 'react'
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

const ImageUpload = ({disabled, onChange, onRemove, value}) => {

    const onUpload = (result) => {
        onChange([...value, result.info.secure_url]);
    }

    const handleRemove = (url) => {
        const updatedValue = value.filter((item) => item !== url); // Remove the specified URL from the array
        onRemove(updatedValue);
    };

  return (
    <div className='box-border w-full flex flex-col items-center'>
        <div className='mb-4 flex items-center justify-center gap-4 box-border flex-wrap max-sm:flex-col'>
            {value.map((url) => (
                <div key={url} className='relative w-[200px] h-[200px] rounded-md'>
                    <div className='z-10 absolute top-2 right-2'>
                        <Button type='button' onClick={() => handleRemove(url)} variant={'destructive'} size={'icon'}>
                            <Trash className='h-4 w-4'/>
                        </Button>
                    </div>
                    <Image 
                        fill
                        className='object-cover'
                        alt='image'
                        src={url}
                    />
                </div>
            ))}
        </div>
        <CldUploadWidget onUpload={onUpload} uploadPreset='r8kwo3gk'>
            {({ open }) => {
                const onClick = () => {
                    open();
                }

                return (
                    <Button type="button" disabled={disabled} onClick={onClick}>
                        <ImagePlus className='h-4 w-4 mr-2'/>
                        Upload Image
                    </Button>
                )
            }}
        </CldUploadWidget>
    </div>
  )
}

export default ImageUpload