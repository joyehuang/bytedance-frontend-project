import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/lib/utils';

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className
    )}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

const SeparatorWithTime = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => {
  // 获取当前时间
  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={cn(
        'flex items-center w-full',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col h-full'
      )}
    >
      {/* 左侧/上侧分隔线 */}
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          'shrink-0 bg-border bg-black/8',
          orientation === 'horizontal'
            ? 'h-[0.5px] flex-1' // 水平方向：高度 1px，宽度自动填充
            : 'w-[1px] flex-1', // 垂直方向：宽度 1px，高度自动填充
          className
        )}
        {...props}
      />
      {/* 时间显示 */}
      <span className="mx-2 text-xs bg-background px-2 text-#666F8D">Today {getCurrentTime()}</span>

      {/* 右侧/下侧分隔线 */}
      <SeparatorPrimitive.Root
        decorative={decorative}
        orientation={orientation}
        className={cn(
          'shrink-0 bg-border bg-black/8',
          orientation === 'horizontal' ? 'h-[0.5px] flex-1' : 'w-[1px] flex-1',
          className
        )}
      />
    </div>
  );
});
SeparatorWithTime.displayName = 'SeparatorWithTime'; // 添加这一行来设置 displayName

export { Separator, SeparatorWithTime };
