'use client'
import React, { useState, useEffect } from 'react'
import useSWR, { mutate } from 'swr';
import { useSession } from "next-auth/react";
import SectionCard from "@/components/SectionCard";
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TrashIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';

const NewsletterIndividual = ({params}) => {

  const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const session = useSession();
  const currTeacher = session.data.user?.name;

  const { toast } = useToast();

  const id = params.id;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(`${apiUrl}/api/newsletters/${id}`, fetcher);
  const { data: sectionsData, error: sectionsError, isLoading: sectionsIsLoading } = useSWR(`${apiUrl}/api/sections/newsletter/${id}`, fetcher);

  const fetchedSections = data?.sections;

  const sortedSections = fetchedSections?.sort((a, b) => a.position - b.position);

  const [sections, setSections] = useState(sortedSections || []);
  console.log(sections);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [create, setCreate] = useState(false);
  const [view, setView] = useState(false);

  const handleAddSection = (section) => {
    const newSection = {
      ...section,
      newsletterId: id, // Include the newsletterId property
    };
  
    setSections((prevSections) => {
      const insertIndex = prevSections.findIndex(
        (prevSection) => section.position < prevSection.position
      );
      if (insertIndex === -1) {
        // If no position is found, append to the end
        return [...prevSections, newSection];
      } else {
        // Insert at the appropriate position
        return [
          ...prevSections.slice(0, insertIndex),
          newSection,
          ...prevSections.slice(insertIndex),
        ];
      }
    });
  };

  const handleRemoveSection = (index) => {
    setSections(prevSections => {
      const newSections = [...prevSections];
      newSections.splice(index, 1);
      return newSections;
    });
  }

  const handleSection = async (e) => {
    e.preventDefault();

    const newSection = {
      title: title,
      content: content,
      nId: id
    }

    try {
      const res = await fetch(`${apiUrl}/api/sections`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newSection),
      })
      .then(() => {
        mutate(`${apiUrl}/api/sections`)
        setTitle('')
        setContent('')
        setCreate(false)
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleSectionsList = async (e) => {
    e.preventDefault();

    const sectionIds = sections.map((section) => ({ id: section.id }));

    try {
      const res = await fetch(`${apiUrl}/api/newsletters/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sections: {
            set: sectionIds,
          }
        }),
      })
      .then(() => {
        mutate(`${apiUrl}/api/newsletters`)
        toast({
          title: "Success",
          description: "Newsletter has been saved",
          variant: "success"
        })
        setCreate(false)
      })
    } catch (error) {
      console.log(error);
    }
  }

  if (!currTeacher.isAdmin) {

    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data, error, isLoading } = useSWR(`${apiUrl}/api/teachers/${currTeacher.id}`, fetcher);

    const currSections = data?.sections.filter((sect) => sect.nId === id);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [create, setCreate] = useState(false);

    const handleSection = async (e) => {
      e.preventDefault();

      const newSection = {
        title: title,
        content: content,
        createdBy: currTeacher.name,
        nId: id
      }

      try {
        const res = await fetch(`${apiUrl}/api/teachers/${currTeacher.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sections : {
                create: newSection
              }
            }),
        })
        .then(() => {
          mutate(`${apiUrl}/api/sections`)
          setTitle('')
          setContent('')
          setCreate(false)
        })
      } catch (error) {
        console.log(error);
      }
    }

    if (create) {
      return (
        <div className='box-border w-3/5 flex flex-col items-center gap-8 mt-6 bg-slate-100 rounded-lg p-10 shadow-sm'>
          <form className='flex flex-col items-center gap-6 box-border w-full' onSubmit={handleSection}>

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

            <div className='flex items-center gap-6'>
              <Button onClick={() => setCreate(false)} variant="destructive">Cancel</Button>
              <Button type='submit'>Create Section</Button>
            </div>
        
          </form>
        </div>
      )
    }

    return (
      <div className='flex flex-col items-center box-border w-4/5 mt-6 gap-6 mb-12'>

        <div className='flex gap-4 box-border justify-between w-full'>
          <div className='font-bold text-[20px]'>Sections of {currTeacher.name}</div>
          <Button variant={'add'} onClick={() => setCreate(true)}>
            <PlusIcon className='mr-2 h-4 w-4'/> Add Section
          </Button>
        </div>
        
        {currSections?.map((sect) => (
          <div className='box-border w-full'>
            <Link href={`${apiUrl}/dashboard/newsletters/sections/${sect.id}`}> 
              <SectionCard section={sect} key={sect.id}/> 
            </Link>
          </div>
          
        ))}

      </div>  
    )
  }

  // ADMIN BELOW //

  if (create) {
    return (
      <div className='box-border w-3/5 flex flex-col items-center gap-8 mt-6 bg-slate-100 rounded-lg p-10 shadow-sm'>
        <form className='flex flex-col items-center gap-6 box-border w-full' onSubmit={handleSection}>

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

          <div className='flex items-center gap-6'>
            <Button onClick={() => setCreate(false)} variant="destructive">Cancel</Button>
            <Button type='submit'>Create Section</Button>
          </div>
      
        </form>
      </div>
    )
  }

  if (view) {
    return (
      <div>
        {console.log(sections)}
        <Button onClick={() => setView(false)}>
          Back
        </Button>

        <div className='flex flex-col items-center gap-4 p-6'>
          {
            sections?.map((sect) => (
              <div className='flex flex-col gap-2' key={sect.id}>
                <div className='font-bold text-lg'>{sect.title}</div>
                <div className='text-base'>{sect.content}</div>
              </div>
            ))
          }
        </div>

      </div>
    )
  }

  return (
    <div className='flex gap-6 box-border w-full justify-between p-12'>
      <div className='flex flex-col items-center box-border flex-1 gap-6'>

        <div className='flex gap-4 box-border justify-between w-full'>
          <div className='font-bold text-[20px]'>SECTIONS</div>
          <Button variant={'add'} onClick={() => setCreate(true)}>
            <PlusIcon className='mr-2 h-4 w-4'/> Add Section
          </Button>
        </div>
        
        {sectionsData?.map((sect) => (
          <div onClick={() => handleAddSection(sect)} className='box-border w-full' key={sect.id}>
            <SectionCard section={sect} />
          </div>
        ))}
      

      </div>

      <div className='flex flex-col items-center box-border flex-1 gap-6'>

        <div className='flex gap-4 box-border justify-between w-full'>
          <div className='font-bold text-[20px]'>PAGES</div>
            <Button onClick={() => setView(true)}>
              View Newsletter
            </Button>
            <Button onClick={handleSectionsList}>
              Save Newsletter
            </Button>
        </div>

        {sections.map((chosenSect, index) => (
          <div className='relative box-border w-full' key={chosenSect.id}>
            <SectionCard section={chosenSect} />
            <TrashIcon onClick={() => handleRemoveSection(index)} className='absolute right-4 top-4 cursor-pointer hover:shadow-md bg-rose-300 p-2 rounded-full' width={40} height={40}/>
          </div>
        ))}

      </div>
    </div>  
  )

}

export default NewsletterIndividual