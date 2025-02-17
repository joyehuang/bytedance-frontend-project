import { ArrowUpRight, EllipsisVertical } from 'lucide-react';
import React from 'react';

interface Item {
  key: string;
  value: string;
}

interface ListWrapperProps {
  items: Item[];
}

export const ListWrapper: React.FC<ListWrapperProps> = ({ items }) => {
  return (
    <div className="list-wrapper">
      {items.map((item, index) => (
        <div key={index}>
          <div className="flex w-full justify-between items-center my-2">
            <div>
              <div className="ml-2 ">{item.key}</div>
              <div
                className="ml-2 w-100 overflow-hidden text-ellipsis whitespace-nowrap"
                style={{ color: '#666F8D' }}
              >
                {item.value}
              </div>
            </div>

            <div className="list-item-content flex items-center">
              <ArrowUpRight className="mr-2 bg-gray-100 rounded-sm p-1" />
              <EllipsisVertical className="bg-gray-100 rounded-sm p-1" />
            </div>
          </div>
          <hr className="my-3 border " style={{ color: '#F0F2F5' }} />
        </div>
      ))}
    </div>
  );
};
