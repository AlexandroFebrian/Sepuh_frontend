import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  }
]

export function Combobox({title, placeholder, empty, items, headerClassName, contentClassName, onSelect}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={` h-14 justify-between bg-navyblue-800 text-ghostwhite-50 hover:bg-navyblue-700 hover:text-ghostwhite-50 transition-colors duration-300 ${headerClassName}`}
        >
          {
            value
            ? 
            items.find((item) => item.value === value)?.label
            : 
            title
          }
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`bg-navyblue-800 ${contentClassName}`}>
        <Command className="bg-navyblue-800 text-ghostwhite-50 rounded-none">
          <CommandInput placeholder={placeholder} className="placeholder:text-ghostwhite-200"/>
          <CommandEmpty>{empty}</CommandEmpty>
          <CommandGroup className="max-h-96 mt-1 overflow-y-auto custom-scrollbar">
            {items.map((item, i) => (
              <CommandItem
                key={i}
                value={item.value}
                onSelect={(currentValue) => {
                  const valueChange = currentValue === value ? "" : currentValue
                  if(onSelect){
                    const value = valueChange
                    onSelect(value)
                  }
                  setValue(valueChange)
                  setOpen(false)
                }}
                className="text-ghostwhite-50 transition-colors"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
