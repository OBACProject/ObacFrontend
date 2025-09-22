"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  buttonLabel: string;
  onSelect: (selected: string) => void;
  isRequired?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  onOpen?: () => void;
}

export function Combobox({
  options,
  buttonLabel,
  onSelect,
  isRequired,
  defaultValue,
  disabled,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue ?? "");

  React.useEffect(() => {
    setValue(defaultValue ?? "");
  }, [defaultValue]);

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <PopoverTrigger asChild className="">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full shadow-sm bg-white hover:bg-sky-50 rounded-lg px-2 justify-between py-0.5 h-fit"
          disabled={disabled}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : buttonLabel}
          <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-full p-0`}>
        <Command className="block px-2.5 pb-1 pt-1 w-full  text-sm text-gray-900 bg-white rounded-lg border border-gray-200 dark:border-gray-600 ">
          <CommandInput placeholder="Search..." className={`h-5 `} />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  className="py-1 px-2 text-sm"
                  onSelect={(currentValue) => {
                    if (disabled) return;
                    const selectedValue =
                      currentValue === value ? "" : currentValue;
                    setOpen(false);
                    setValue(selectedValue);
                    onSelect(selectedValue);
                  }}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
