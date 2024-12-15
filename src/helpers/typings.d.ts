import type { GetServerSidePropsContext } from "next";

type HeightAndWidth = "height" | "width";

export type YouTubeMetadataBeforeDOM = Partial<Record<"host" | `${"thumbnail_" | "video_" | ""}url` | "title" | "mime_type" | `author_${"name" | "url"}`, string> & Record<HeightAndWidth, number>>;

export type ServerSidePropsWithV = GetServerSidePropsContext<{v?: string}>;