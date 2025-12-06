import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatPokemonId(id: number): string {
  return id.toString().padStart(3, "0");
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
