import { Search, Command } from 'lucide-react';
import React from 'react';
import { Label } from '@/components/ui/label';
import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar';

interface SearchFormProps extends React.ComponentProps<'form'> {
  onFocus?: () => void;
  inputW?: string;
  onMiniDialogClick?: () => void; // 添加新的回调函数属性
}

export function SearchForm({ onFocus, inputW, onMiniDialogClick, ...props }: SearchFormProps) {
  const toMiniDialog = () => {
    if (onMiniDialogClick) {
      onMiniDialogClick(); // 调用传递进来的回调函数
    }
  };

  return (
    <form {...props}>
      <SidebarGroup>
        <SidebarGroupContent>
          <Label htmlFor="search" className="bg-white shadow rounded-2xl p-4 relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 select-none opacity-50 " />
            <input
              id="search"
              type="text"
              placeholder="Search for chats..."
              className={`pl-8 placeholder:text-stone-400 text-[13px] ml-[-13px] focus:outline-none ${inputW}`}
              style={{ color: '#666F8D', caretColor: 'transparent' }}
              onFocus={(e) => {
                if (onFocus) {
                  onFocus();
                }
                e.target.placeholder = 'Search for chats...'; // 重新设置占位符
              }}
              readOnly // 添加 readOnly 属性，防止编辑
              onClick={() => {
                if (onMiniDialogClick) {
                  onMiniDialogClick();
                }
              }}
            />
            <span
              className="p-2 text-xs flex gap-0.5 items-center shadow bg-stone-50 rounded absolute right-[-10px] top-6 -translate-1/2 "
              onClick={toMiniDialog}
            >
              <Command className="size-3" />K
            </span>
          </Label>
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}

export function SearchFormExpand({
  onFocus,
  inputW,
  onMiniDialogClick,
  ...props
}: SearchFormProps) {
  const toMiniDialog = () => {
    if (onMiniDialogClick) {
      onMiniDialogClick(); // 调用传递进来的回调函数
    }
  };

  return (
    <form {...props}>
      <SidebarGroup>
        <SidebarGroupContent>
          <Label htmlFor="search" className="bg-white shadow rounded-2xl p-4 relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 select-none opacity-50 " />
            <input
              id="search"
              type="text"
              placeholder="Search for chats..."
              className={`pl-8   placeholder:text-stone-400  text-[13px]  ml-[-13px]  focus:placeholder-transparent outline-none ${inputW}`}
              onFocus={onFocus}
            />
            <span
              className="p-2 text-xs flex gap-0.5 items-center shadow bg-stone-50 rounded absolute right-[-10px] top-6 -translate-1/2 "
              onClick={toMiniDialog}
            >
              <Command className="size-3" />K
            </span>
          </Label>
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}

interface SearchFormLongProps {
  onSearch?: (value: string) => void;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // 确保类型正确
}

// 新增的SearchFormLong组件，用于展示长输入框的搜索表单
export function SearchFormLong({ onSearch, value, onChange, ...props }: SearchFormLongProps) {
  // 处理点击“K”的函数
  const handleKClick = () => {
    if (onSearch && value) {
      onSearch(value); // 调用传递进来的onSearch函数并传递输入值
    }
  };

  return (
    <form {...props} className="w-full">
      <SidebarGroup className="w-full">
        <SidebarGroupContent className="w-full">
          <Label
            htmlFor="search"
            className="bg-white shadow rounded-2xl p-4 relative w-full flex items-center"
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
            <input
              type="text"
              id="search"
              placeholder="Search for chats..."
              className="pl-8 placeholder:text-stone-400 text-[13px] ml-[-13px] w-full focus:placeholder-transparent outline-none"
              value={value} // 设置输入框的值为value
              onChange={onChange} // 添加输入框变化时的处理函数
            />
            <span
              className="p-2 text-xs flex gap-0.5 items-center shadow bg-stone-50 rounded absolute right-[-10px] top-6 -translate-1/2"
              onClick={handleKClick} // 添加K点击时的处理函数
            >
              <Command className="size-3" />K
            </span>
          </Label>
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}
