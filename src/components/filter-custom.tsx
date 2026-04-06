"use client";

import { useState, ReactNode } from "react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Field } from "./ui/field";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { check } from "zod";
import { Button } from "./ui/button";

type StatusFilterProps = {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  trigger?: ReactNode;
};

export default function FilterCustom({
  options,
  value,
  onChange,
  trigger,
}: StatusFilterProps) {
  const [search, setSearch] = useState<string>("");
  const toggleItem = (item: string) => {
    if (value.includes(item)) {
      onChange(value.filter((v) => v !== item));
    } else {
      onChange([...value, item]);
    }
  };
  const filteredOptions = options.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer flex justify-center items-center gap-2 w-[89px] h-[36px] border rounded-md text-sm">
          {trigger}
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-52 p-0">
        <Command className="p-0">
          <CommandInput
            placeholder="Search..."
            value={search}
            onValueChange={setSearch}
            className="border-none"
          />

          <div className="w-full h-px bg-border" />

          <CommandList className="p-1 -mb-1">
            <CommandEmpty>No results</CommandEmpty>
            {filteredOptions.map((item) => {
              const checked = value.includes(item);
              return (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={() => toggleItem(item)}
                  className={`mb-1 cursor-pointer hover:bg-muted hover:text-foreground rounded-s ${checked && "bg-muted"} ${checked && "text-foreground"}`}
                >
                  <Field orientation="horizontal" className="px-3 py-1">
                    <Checkbox
                      id={item}
                      checked={checked}
                      onCheckedChange={() => toggleItem(item)}
                    />
                    <Label htmlFor={item} className="font-outfit">
                      {item}
                    </Label>
                  </Field>
                </CommandItem>
              );
            })}
          </CommandList>
          <div className='flex justify-center m-2'>   <Button className='w-full'>Apply</Button></div>
       
        </Command>
      </PopoverContent>
    </Popover>
  );
}
