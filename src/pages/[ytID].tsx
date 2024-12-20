import Head from "next/head";
import type { InferGetServerSidePropsType } from "next";
import type { YouTubeMetadataBeforeDOM, ServerSidePropsWithV } from "../helpers/typings";
import { useEffect, type FC, Fragment } from "react";
import ms from "ms";
import ytdl from "@distube/ytdl-core";
import { dynamicSearchForYouTubeID } from "@/helpers/utility";

const cache = new Map<string, YouTubeMetadataBeforeDOM>();
const cacheTime = ms("6h");

let cookiesList: ytdl.Cookie[] = [];

if (cookiesList.length <= 0) {
  if (typeof process.env?.COOKIE_BYPASS === "string") {
    cookiesList = JSON.parse(process.env.COOKIE_BYPASS);
  };
};

const agent = ytdl.createAgent(cookiesList);

const WatchPage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const defaultFallbackValueURL: string = "https://github.com/ray-1337/youtube-discord-embed";
  const fallbackURL = props?.url || defaultFallbackValueURL;

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.open(fallbackURL, "_self");
    };
  }, []);

  // discord
  const title = props?.author_name;
  const description = props?.title;
  const authorText = "YouTube / 13373333.one"
  const image = props?.thumbnail_url || "";

  return (
    <Head>
      <meta httpEquiv={"refresh"} content={`0; url=${fallbackURL}`} />

      {
        (typeof props === "object" && props?.video_url?.length) && (
          <Fragment>
            <link rel="canonical" href={fallbackURL} />

            <meta name="theme-color" content="#ff0000" />

            <meta property="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={fallbackURL} />
            <meta property="og:image" content={image} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={authorText} />

            <meta property="og:video" content={props?.video_url} />
            <meta property="og:video:secure_url" content={props?.video_url} />
            <meta property="og:video:type" content={props?.mime_type || "video/mp4"} />
            <meta property="og:video:width" content={String(props?.width)} />
            <meta property="og:video:height" content={String(props?.height)} />

            <meta name="twitter:domain" content={"yt.cdn.13373333.one"} />
            <meta name="twitter:url" content={fallbackURL} />
            <meta name="twitter:description" content={title} />
            <meta name="twitter:card" content="player" />
            <meta name="twitter:title" content={description} />
            <meta name="twitter:image" content={"0"} />

            <meta name="twitter:player" content={fallbackURL} />
            <meta name="twitter:player:width" content={String(props?.width)} />
            <meta name="twitter:player:height" content={String(props?.height)} />
            <meta name="twitter:player:stream" content={props?.video_url} />
            <meta name="twitter:player:stream:content_type" content={props?.mime_type || "video/mp4"} />

            <link rel="alternate" href={`https://${props?.host}/api/oembed?text=${props?.title}&url=${fallbackURL}`} type="application/json+oembed" title={authorText} />
          </Fragment>
        )
      }
    </Head>
  );
};

export async function getServerSideProps(ctx: ServerSidePropsWithV) {
  try {
    const youtubeID = dynamicSearchForYouTubeID(ctx);
    if (!youtubeID?.length || !ytdl.validateID(youtubeID)) return { props: {} };

    if (cache.has(youtubeID)) {
      const cachedURL = cache.get(youtubeID) as YouTubeMetadataBeforeDOM; 

      return { props: { ...cachedURL } };
    };

    const rawYouTubeURL = "https://youtu.be/" + youtubeID;

    // below this code pictures how stupid i am
    const ytVideoInfo = await ytdl.getInfo(rawYouTubeURL, { agent });

    if (!ytVideoInfo) return { props: {} };
    
    const liteFilteredFormats = ytVideoInfo.formats
    .filter(format => format.hasAudio && format.hasVideo && !format.isLive && !format.isHLS);

    const filteredFormats = liteFilteredFormats.filter(format => format.quality === "medium" || format.quality === "hd720");

    let highestFormat = filteredFormats.find(format => format.quality === "hd720");
    if (!highestFormat) {
      const lowest = filteredFormats.find(format => format.quality === "medium");
      if (!lowest) {
        return { props: {} };
      };

      highestFormat = lowest;
    };


    const firstRawVideoURL = highestFormat;
    if (!firstRawVideoURL?.url?.length || !firstRawVideoURL?.mimeType?.length) return { props: {} };

    const content: YouTubeMetadataBeforeDOM = {
      author_name: `${ytVideoInfo?.videoDetails?.author?.name} (${ytVideoInfo?.videoDetails?.author?.user})`,
      author_url: ytVideoInfo?.videoDetails?.author?.channel_url,
      thumbnail_url: ytVideoInfo?.videoDetails?.thumbnails?.pop()?.url,
      title: ytVideoInfo?.videoDetails?.title,
      video_url: firstRawVideoURL.url,
      url: `https://youtu.be/${youtubeID}`,
      height: firstRawVideoURL.height,
      width: firstRawVideoURL.width,
      host: ctx?.req?.headers?.host,
      mime_type: firstRawVideoURL?.mimeType
    };

    cache.set(youtubeID, content);

    setTimeout(() => cache.delete(youtubeID), cacheTime);

    return { props: { ...content } };
  } catch (error) {
    console.error(error);
    return { props: {} };
  };
};

export default WatchPage;