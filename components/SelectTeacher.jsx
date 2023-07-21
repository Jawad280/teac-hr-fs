"use client";
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import useSWR, { mutate } from "swr";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SelectTeacher = ({ setTeacher }) => {
  const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`${apiUrl}/api/teachers`, fetcher);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const sortedTeachers = data?.sort((a, b) => a.name.localeCompare(b.name));

  const finalList = sortedTeachers.map((teacher) => ({
    value: teacher,
    label: teacher.name,
  }));

  return (
    <Popover open={open} onOpenChange={setOpen} className='box-border w-full'>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="box-border justify-between w-full"
        >
          {value ? value.name : "Select Teacher..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="box-border p-0 w-full">
        <Command>
          <CommandInput
            placeholder="Search Teacher..."
            className="outline-0 border-0 box-border w-full"
          />
          <CommandEmpty>No Teacher found.</CommandEmpty>
          <CommandGroup>
            {finalList.map((teacher) => (
              <CommandItem
                key={teacher.value.id}
                onSelect={() => {
                  setValue(teacher.value);
                  setTeacher(teacher.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 box-border",
                    value === teacher.value.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {teacher.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectTeacher;
