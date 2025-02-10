import type { GetServerSidePropsContext } from "next";

export type YouTubeMetadataBeforeDOM = Partial<Record<"host" | `${"thumbnail_" | "video_" | ""}url` | "title" | "mime_type" | `author_${"name" | "url"}`, string>> & { resolution: [number, number] };

export type ServerSidePropsWithV = GetServerSidePropsContext<{v?: string}>;