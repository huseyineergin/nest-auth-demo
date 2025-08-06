"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

type Option = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  placeholder?: string;
  onChange: (selected: string[]) => void;
}

export function MultiSelect({ options, selected, placeholder = "Select", onChange }: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const toggleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const getDisplayLabel = () => {
    const maxDisplayed = 2;

    if (selectedLabels.length > maxDisplayed) {
      return `${selectedLabels.slice(0, maxDisplayed).join(", ")}, +${selectedLabels.length - maxDisplayed} more`;
    } else if (selectedLabels.length > 0) {
      return selectedLabels.join(", ");
    }
    return placeholder;
  };

  const selectedLabels = options.filter((opt) => selected.includes(opt.value)).map((opt) => opt.label);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          <span className={cn("max-w-40 truncate", selectedLabels.length === 0 && "text-muted-foreground")}>
            {getDisplayLabel()}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-56 p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            {options.map((option) => (
              <CommandItem key={option.value} onSelect={() => toggleSelect(option.value)} className="rounded-none">
                <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-sm bg-transparent">
                  {selected.includes(option.value) && <Check className="h-4 w-4" />}
                </div>
                {option.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
