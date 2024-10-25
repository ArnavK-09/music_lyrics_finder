"use client";

/**
 * Imports required
 */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { CONSTANTS } from "@/lib/utils";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import { useState } from "react";

export default function Home() {
  /**
   * State management
   */
  const [musicLyrics, setMusicLyrics] = useState<string>("");
  const [musicTitle, setMusicTitle] = useState<string>(
    "Please select a song to view the lyrics!",
  );

  /**
   * Copilotkit stuff
   */
  useCopilotReadable({
    description: "Strict Prompt for LLM",
    value:
      "Act as a dedicated music lyrics finder bot. Accept any song title or artist name provided by the user without double-checking. Only reply with, 'Retrieving lyrics for you—please watch the web UI for updates.' unless the user asks for something unrelated to music lyrics, in which case, politely decline.",
  });
  useCopilotAction(
    {
      name: "getLyrics",
      description:
        "Retrieve the lyrics of a song when provided with the song title and the artist's name.",
      parameters: [
        {
          name: "params",
          type: "object",
          description: "Both the artist's name and the song title.",
          attributes: [
            {
              name: "song_name",
              type: "string",
              description: "The title of the song to be fetched...",
              required: true,
            },
            {
              name: "artist_name",
              type: "string",
              description:
                "The exact name of the artist of the song to be fetched...",
              required: false,
            },
          ],
          required: true,
        },
      ],
      handler: async ({
        params,
      }: {
        params: { artist_name?: string; song_name: string };
      }) => {
        try {
          const { artist_name, song_name } = params;
          const url = `https://lrclib.net/api/search?q=${song_name}${
            artist_name ? `'&artist_name=${artist_name}'` : ""
          }`;
          const res = await fetch(url);
          const data = await res.json();
          setMusicLyrics(data[0].plainLyrics);
          setMusicTitle(data[0].trackName ?? song_name);
          return 'Retrieving lyrics for you—please watch the web UI for updates.'
        } catch (e) {
          console.error(e);
          setMusicTitle("An internal error has occurred.");
          return "An internal error has occurred.";
        }
      },
      render: "Fetching the lyrics... Please hold on!",
    },
    [],
  );
  return (
    <>
      <CopilotPopup
        clickOutsideToClose={false}
        defaultOpen
        labels={{
          title: "Find Your Music",
          initial: CONSTANTS.tutorial,
        }}
      />
      <section
        id="player"
        className="w-screen px-5 md:flex-row flex flex-col gap-10 h-auto align-middle items-center justify-center"
      >
        <div>
          <Avatar className="h-20 w-20 aspect-square animate-spin">
            <AvatarFallback>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="size-10"
              >
                <path
                  fillRule="evenodd"
                  d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z"
                  clipRule="evenodd"
                />
              </svg>
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl tracking-wide break-words font-semibold">
            {musicTitle}
          </h1>
        </div>
      </section>
      <section id="lyrics" className="my-20 w-screen px-4 md:px-10">
        <Textarea
          className="py-5 min-h-[50vh] text-center text-xl font-medium"
          spellCheck={false}
          readOnly
          value={musicLyrics}
          placeholder="Song lyrics will be shown here..."
        />
      </section>
    </>
  );
}
