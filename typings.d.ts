type HeightAndWidth = "height" | "width";

export type YouTubeMetadataBeforeDOM = Partial<Record<"host" | "thumbnail_url" | "url" | "title" | `author_${"name" | "url"}`, string> & Record<HeightAndWidth, number>>;