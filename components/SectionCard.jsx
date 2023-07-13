import React from 'react'

const SectionCard = ({section}) => {
  return (
    <div className='box-border w-full flex flex-col p-6 rounded-lg border-2 border-slate-700 cursor-pointer shadow-sm gap-4 hover:bg-slate-200 transition-all hover:shadow-lg'>
        <div className='font-bold text-[18px]'>{section.title}</div>
        <div className='text-[14px]'>{section.createdBy}</div>
        <div className='text-[md]'>{section.content}</div>
    </div>
  )
}

export default SectionCard