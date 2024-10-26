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
  tutorial:
    "Welcome to the Music Lyrics Finder! Discover lyrics for a wide variety of songs right here. To get started, open the chatbot in the bottom right corner or press **Ctrl + /**. Then, simply enter the song title and, optionally, the artist's name—like *'Real Slim Shady by Eminem'*. After a quick process, the lyrics will be displayed on the web interface for you to enjoy. Start exploring your favorite songs now!",
};
