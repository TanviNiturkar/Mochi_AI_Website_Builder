"use client";

import { TreeItem } from "@/app/types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TreeViewProps {
  data: TreeItem[];
  value?: string | null;
  onSelect?: (value: string) => void;
}

export const TreeView = ({ data, value, onSelect }: TreeViewProps) => {
  return (
    <div className="w-full p-2">
      {data.map((item, index) => (
        <Tree
          key={index}
          item={item}
          selectedValue={value}
          onSelect={onSelect}
          parentPath=""
        />
      ))}
    </div>
  );
};

interface TreeProps {
  item: TreeItem;
  selectedValue?: string | null;
  onSelect?: (value: string) => void;
  parentPath: string;
}

const Tree = ({ item, selectedValue, onSelect, parentPath }: TreeProps) => {
  const [name, ...items] = Array.isArray(item) ? item : [item];
  const currentPath = parentPath ? `${parentPath}/${name}` : name;

  const isSelected = selectedValue === currentPath;

  // 📄 FILE
  if (!items.length) {
    return (
      <div
        onClick={() => onSelect?.(currentPath)}
        className={cn(
          "flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer text-sm transition-all",

          // ✨ HOVER → INPUT-LIKE COLOR
          "hover:bg-input/30 hover:shadow-sm hover:scale-[1.01]",

          // ✨ SELECTED → Slightly stronger input color
          isSelected && "bg-input/40 font-medium shadow-sm"
        )}
      >
        <FileIcon className="size-4 opacity-60" />
        <span className="truncate">{name}</span>
      </div>
    );
  }

  // 📁 FOLDER
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger asChild>
        <div
          className={cn(
            "flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer transition-all",

            // ✨ FOLDER HOVER → SAME INPUT COLOR
            "hover:bg-input/30 hover:shadow-sm hover:scale-[1.01]"
          )}
        >
          <ChevronRightIcon className="size-4 transition-transform group-data-[state=open]:rotate-90" />
          <FolderIcon className="size-4 opacity-70" />
          <span className="truncate font-medium">{name}</span>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="pl-4 mt-1 flex flex-col gap-1">
          {items.map((subItem, index) => (
            <Tree
              key={index}
              item={subItem}
              selectedValue={selectedValue}
              onSelect={onSelect}
              parentPath={currentPath}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
