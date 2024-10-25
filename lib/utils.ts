/**
 * Imports required
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merging tailwind css
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Webapp Constants
 */
export const CONSTANTS = {
  tutorial: `todo5`,
};
