import { clsx, type ClassValue } from "clsx"
import { sub } from "date-fns";
import { twMerge } from "tailwind-merge"
import { TreeItem } from "@app/types";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const matchaTheme = {
  "--bg": "#F1F5E8",               // matcha milk
  "--bg-2": "#E3E9D5",             // lighter layer
  "--text": "#2C3A2E",             // deep matcha text
  "--muted": "#99A39A",            // muted green grey
  "--accent": "#7BAF7B",           // matcha green
  "--accent-soft": "#CFE8CF",      // soft matcha highlight
  "--border": "#4F674F",           // dark outline border
};


/**
 * Convert a record of files to a tree stucture
 * @param files Record of file paths to file contents
 * @returns Tree structure suitable for TreeView component  
 * 
 * @example
 * Input: { "src/Button.tsx": "...", "README.md": "..." }
 * Output: [["src","Button.tsx"],"README.md"]
 */
export function convertFilesToTreeItems(
  files: { [path: string]: string }
): TreeItem[] {

  interface TreeNode {
    [key: string]: TreeNode | null;
  }

  const tree: TreeNode = {};
  const sortedPaths = Object.keys(files).sort();
  
  for (const filePath of sortedPaths) {
    const parts = filePath.split("/");
    let current = tree;
    for (let i = 0; i < parts.length-1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
    const fileName = parts[parts.length - 1];
    current[fileName] = null;
  }
  function convertNode(node:TreeNode , name?:string): TreeItem[] | TreeItem {
    const entries = Object.entries(node);
    if(entries.length ===0){
      return name || "";
    }
    const children: TreeItem[] = [];
    for (const [key, value] of entries) {
      if (value === null) {
        children.push(key);
      } else {
        const subTree = convertNode(value , key);
        if (Array.isArray(subTree)) {
          children.push([key, ...subTree]);
        }
        else {
          children.push([key, subTree]);
        }
      }
    }
    return children
  }
  const result = convertNode(tree);
  return Array.isArray(result) ? result : [result];
}