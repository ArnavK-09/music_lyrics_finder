/**
 * Imports required
 */
import type { Metadata } from "next";
import { Poppins as GFONT } from "next/font/google";
import "./globals.css";
import { CopilotKitCSSProperties } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { CopilotKit } from "@copilotkit/react-core";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CONSTANTS } from "@/lib/utils";

/**
 * Custom font
 */
const FONT = GFONT({
  weight: ["400", "900", "500", "100"],
  subsets: ["latin"],
});

/**
 * Meta data for website
 */
export const metadata: Metadata = {
  title: "Music Lyrics Powered By A.I.",
  description:
    "Discover song lyrics easily with our Music Lyrics Finder. Access a wide variety of lyrics by simply entering the song title and artist. Fast, user-friendly, and powered by intelligent search—find your favorite lyrics now!",
};

/**
 * Webapp default layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <html lang="en">
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' class='size-6'%3E%3Cpath fill-rule='evenodd' d='M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z' clip-rule='evenodd' /%3E%3C/svg%3E%0A"
        />
        <body
          style={
            {
              "--copilot-kit-primary-color": "hsl(var(--accent))",
              "--copilot-kit-background-color": "hsl(var(--background))",
              "--copilot-kit-contrast-color": "hsl(var(--foreground))",
              "--copilot-kit-secondary-color": "hsl(var(--secondary))",
              "--copilot-kit-secondary-contrast-color":
                "hsl(var(--secondary-foreground))",
              "--copilot-kit-muted-color": "hsl(var(--muted))",
              "--copilot-kit-separator-color": "hsl(var(--muted))",
              "--copilot-kit-scrollbar-color": "hsl(var(--accent))",
              "--copilot-kit-response-button-color":
                "hsl(var(--destructive-foreground))",
              "--copilot-kit-response-button-background-color":
                "hsl(var(--destructive))",
            } as CopilotKitCSSProperties
          }
          className={`${FONT.className} min-h-screen grid place-items-center bg-background text-foreground antialiased w-screen !overflow-x-hidden`}
        >
          <main className="py-16">
            {children}
            <AlertDialog defaultOpen>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Usage Instructions!</AlertDialogTitle>
                  <AlertDialogDescription>
                    {CONSTANTS.tutorial}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </main>
        </body>
      </html>
    </CopilotKit>
  );
}
