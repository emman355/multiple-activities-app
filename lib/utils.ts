import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  type JSONContent,
} from "@tiptap/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatPokemonId(id: number): string {
  return id.toString().padStart(3, "0");
}

export function formatDateToDMY(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export async function formatTimeAgo(dateString: string): Promise<string> {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays >= 1) {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  } else if (diffHours >= 1) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  } else if (diffMinutes >= 1) {
    return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
  } else {
    return `second${diffSeconds !== 1 ? "s" : ""} ago`;
  }
}

export function getUsernameFromEmail(email: string | undefined): string | null {
  if (!email) return null;

  const parts = email.split("@");
  if (parts.length !== 2) return null;

  const username = parts[0];
  if (!username) return null;

  // ✅ Capitalize first letter, keep rest as-is
  return username.charAt(0).toUpperCase() + username.slice(1);
}

export function getUsernameInitialFromEmail(email: string | undefined): string | null | undefined {
  const parts = email?.split("@");
  if (parts?.length === 2 && parts[0].length > 0) {
    return parts[0][0].toUpperCase(); // returns the first character, capitalized
  }
  return null; // invalid email or empty username
}

export function formatFileSize(bytes: number): string {
  if (!bytes || bytes <= 0) return "0 MB";
  const mb = bytes / (1024 * 1024); // convert bytes → MB
  return `${mb.toFixed(2)} MB`;     // keep 2 decimal places
}

/**
 * Generic filter + sort utility
 * @param items - array of objects
 * @param searchTerm - optional string to filter by
 * @param searchKey - object key to filter on
 * @param sortKey - object key to sort on
 * @param sortOrder - asc or desc
 */
export function filterAndSort<T extends object>(
  items: T[],
  sortKey: keyof T,                     // required
  sortOrder: "asc" | "desc" = "asc",
  searchKey?: keyof T,                  // optional 
  searchTerm?: string                   // optional 
): T[] {
  let list = items;

  // Filter only if searchTerm and searchKey are provided
  if (searchTerm && searchKey) {
    list = list.filter((item) =>
      String(item[searchKey]).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Sort
  list = [...list].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    // Handle Date objects or ISO date strings
    if (aVal instanceof Date || bVal instanceof Date) {
      const aTime = new Date(aVal as Date).getTime();
      const bTime = new Date(bVal as Date).getTime();
      return sortOrder === "asc" ? aTime - bTime : bTime - aTime;
    }
    if (
      typeof aVal === "string" &&
      typeof bVal === "string" &&
      /^\d{4}-\d{2}-\d{2}/.test(aVal) &&
      /^\d{4}-\d{2}-\d{2}/.test(bVal)
    ) {
      const aTime = new Date(aVal).getTime();
      const bTime = new Date(bVal).getTime();
      return sortOrder === "asc" ? aTime - bTime : bTime - aTime;
    }

    // Handle plain strings
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortOrder === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    // Handle numbers
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  return list;
}


// Convert TipTap JSONContent to Markdown
export function jsonToMarkdown(node: JSONContent): string {
  if (!node) return ''

  let markdown = ''

  switch (node.type) {
    case 'doc':
      markdown = node.content?.map(jsonToMarkdown).join('\n\n') || ''
      break

    case 'paragraph':
      markdown = node.content?.map(jsonToMarkdown).join('') || ''
      break

    case 'text':
      let text = node.text || ''
      if (node.marks) {
        node.marks.forEach(mark => {
          switch (mark.type) {
            case 'bold':
              text = `**${text}**`
              break
            case 'italic':
              text = `*${text}*`
              break
            case 'code':
              text = `\`${text}\``
              break
            case 'strike':
              text = `~~${text}~~`
              break
          }
        })
      }
      markdown = text
      break

    case 'heading':
      const level = node.attrs?.level || 1
      const headingText = node.content?.map(jsonToMarkdown).join('') || ''
      markdown = `${'#'.repeat(level)} ${headingText}`
      break

    case 'bulletList':
      markdown = node.content?.map(jsonToMarkdown).join('\n') || ''
      break

    case 'orderedList':
      markdown = node.content?.map((item, index) => {
        const itemText = jsonToMarkdown(item)
        return itemText.replace(/^- /, `${index + 1}. `)
      }).join('\n') || ''
      break

    case 'listItem':
      const itemContent = node.content?.map(jsonToMarkdown).join('\n') || ''
      markdown = `- ${itemContent}`
      break

    case 'codeBlock':
      const language = node.attrs?.language || ''
      const code = node.content?.map(jsonToMarkdown).join('') || ''
      markdown = `\`\`\`${language}\n${code}\n\`\`\``
      break

    case 'blockquote':
      const quoteContent = node.content?.map(jsonToMarkdown).join('\n') || ''
      markdown = quoteContent.split('\n').map(line => `> ${line}`).join('\n')
      break

    case 'hardBreak':
      markdown = '  \n'
      break

    case 'horizontalRule':
      markdown = '---'
      break

    default:
      if (node.content) {
        markdown = node.content.map(jsonToMarkdown).join('')
      }
  }

  return markdown
}





