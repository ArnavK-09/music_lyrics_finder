"use client";

/**
 * Imports required
 */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { CONSTANTS } from "@/lib/utils";
import { useCopilotAction } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import { useState } from "react";

export default function Home() {
  /**
   * State management
   */
  const [musicLyrics, setMusicLyrics] = useState<string>("");

  /**
   * Copilotkit stuff
   */
  useCopilotAction(
    {
      name: "getLyrics",
      description: "Fetch lyrics of song by song and artist name...",
      parameters: [
        {
          name: "REQ_PARAMS",
          type: "object",
          description: "Artist as well as song name...",
          attributes: [
            {
              name: "song_name",
              type: "string",
              description: "The title of the song...",
              required: true,
            },
            {
              name: "artist_name",
              type: "string",
              description: "The exact name of the artist...",
              required: false,
            },
          ],
          required: true,
        },
      ],
      handler: async ({
        REQ_PARAMS,
      }: {
        REQ_PARAMS: { artist_name?: string; song_name: string };
      }) => {
        const { artist_name, song_name } = REQ_PARAMS;

        setMusicLyrics(JSON.stringify({ artist_name, song_name }));
        return { artist_name, song_name };
      },
      render: "Writting up there....please wait....",
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
        className="w-screen px-5 flex gap-10 h-auto align-middle items-center justify-center"
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
          <h1 className="text-4xl tracking-wide break-all font-semibold">
            No Song Choosen...
          </h1>
        </div>
      </section>
      <section id="lyrics" className="my-20 w-screen px-10">
        <Textarea
          className="py-5 min-h-[50vh] text-center text-xl font-medium"
          spellCheck={false}
          readOnly
          value={musicLyrics}
          placeholder="Song lyrics will appear here..."
        />
      </section>
    </>
  );
}
