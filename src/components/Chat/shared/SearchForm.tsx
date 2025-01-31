import { Search, Command } from 'lucide-react';
import React from 'react';
import { Label } from '@/components/ui/label';
import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar';

export function SearchForm({ ...props }: React.ComponentProps<'form'>) {
  return (
    <form {...props}>
      <SidebarGroup>
        <SidebarGroupContent>
          <Label htmlFor="search" className="bg-white shadow rounded-2xl p-4 relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 select-none opacity-50 " />
            <input
              type="text"
              placeholder="Search for chats..."
              className="pl-8   placeholder:text-stone-400  text-[13px]  ml-[-13px] w-56 focus:placeholder-transparent outline-none"
            />
            <span className="p-2 text-xs flex gap-0.5 items-center shadow bg-stone-50 rounded absolute right-[-10px] top-6 -translate-1/2">
              <Command className="size-3" />K
            </span>
          </Label>
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
