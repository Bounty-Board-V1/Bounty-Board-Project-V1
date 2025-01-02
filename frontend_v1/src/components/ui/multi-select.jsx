/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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

export function MultiSelect({
  options = [],
  value = [],
  onChange,
  placeholder,
}) {
  const [open, setOpen] = useState(false);

  // Ensure `value` is always an array
  const safeValue = Array.isArray(value) ? value : [];

  const handleSelect = (currentValue) => {
    const newValue = value.includes(currentValue)
      ? value.filter((item) => item !== currentValue) // Remove if already selected
      : [...value, currentValue]; // Add if not selected
    onChange(newValue);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {safeValue.length > 0 ? `${safeValue.length} selected` : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {Array.isArray(options) &&
              options
                .filter((option) => option && typeof option === "string")
                .map((option) => (
                  <CommandItem
                    key={option}
                    onSelect={() => handleSelect(option)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        Array.isArray(value) && value.includes(option)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option}
                  </CommandItem>
                ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
