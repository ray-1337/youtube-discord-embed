import Head from "next/head";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useEffect, type FC, Fragment } from "react";
import ms from "ms";
import ytdl from "@distube/ytdl-core";

import type { YouTubeMetadataBeforeDOM } from "../helpers/typings";
import { dynamicSearchForYouTubeID } from "@/helpers/utility";

const cacheTime = ms("1h");

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

  const [width, height] = props.resolution;

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
  const host = props?.host || "yt.cdn.13373333.one";

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
            <meta property="og:video:type" content={"video/mp4"} />
            <meta property="og:video:width" content={String(width)} />
            <meta property="og:video:height" content={String(height)} />

            <meta name="twitter:domain" content={host} />
            <meta name="twitter:url" content={fallbackURL} />
            <meta name="twitter:description" content={title} />
            <meta name="twitter:card" content="player" />
            <meta name="twitter:title" content={description} />
            <meta name="twitter:image" content={image} />

            <meta name="twitter:player" content={fallbackURL} />
            <meta name="twitter:player:width" content={String(width)} />
            <meta name="twitter:player:height" content={String(height)} />
            <meta name="twitter:player:stream" content={props?.video_url} />
            <meta name="twitter:player:stream:content_type" content={"video/mp4"} />

            <link rel="alternate" href={`https://${host}/api/oembed?text=${props?.title}&url=${fallbackURL}`} type="application/json+oembed" title={authorText} />
          </Fragment>
        )
      }
    </Head>
  );
};

export async function getServerSideProps({req, res, query}: GetServerSidePropsContext<Partial<Record<"v" | "watch", string>>>) {
  try {
    const youtubeID = dynamicSearchForYouTubeID(query);
    if (!youtubeID?.length || !ytdl.validateID(youtubeID)) {
      return {
        notFound: true
      };
    };

    const rawYouTubeURL = "https://youtu.be/" + youtubeID;

    // below this code pictures how stupid i am
    const ytVideoInfo = await ytdl.getInfo(rawYouTubeURL, { agent });
    if (!ytVideoInfo) {
      return {
        notFound: true
      };
    }
    
    const liteFilteredFormats = ytVideoInfo.formats
    .filter(format => format.hasAudio && format.hasVideo && !format.isLive && !format.isHLS);

    const filteredFormats = liteFilteredFormats.filter(format => format.quality === "medium" || format.quality === "hd720");

    let highestFormat = filteredFormats.find(format => format.quality === "hd720");
    if (!highestFormat) {
      const lowest = filteredFormats.find(format => format.quality === "medium");
      if (!lowest) {
        return {
          notFound: true
        };
      };

      highestFormat = lowest;
    };

    const firstRawVideoURL = highestFormat;
    if (!firstRawVideoURL?.url?.length || !firstRawVideoURL?.mimeType?.length) {
      return {
        notFound: true
      };
    };

    const isShort = (typeof firstRawVideoURL.height === "number" && typeof firstRawVideoURL?.width === "number") && (firstRawVideoURL.height > firstRawVideoURL.width);

    const content: YouTubeMetadataBeforeDOM = {
      author_name: `${ytVideoInfo?.videoDetails?.author?.name} (${ytVideoInfo?.videoDetails?.author?.user})`,
      author_url: ytVideoInfo?.videoDetails?.author?.channel_url,
      thumbnail_url: isShort === true ? `https://i.ytimg.com/vi/${youtubeID}/oardefault.jpg` : (ytVideoInfo?.videoDetails?.thumbnails?.pop()?.url || `https://img.youtube.com/vi/${youtubeID}/maxresdefault.jpg`),
      title: ytVideoInfo?.videoDetails?.title,
      video_url: firstRawVideoURL.url,
      url: rawYouTubeURL,
      resolution: [firstRawVideoURL?.width ?? 0, firstRawVideoURL?.height ?? 0],
      host: req?.headers?.host
    };

    const convertedCacheTime = Math.round(cacheTime / 1000);

    res.setHeader(
      'Cache-Control',
      `public, max-age=${convertedCacheTime}, s-maxage=${convertedCacheTime}, stale-while-revalidate=30, immutable`
    );

    return {
      props: { ...content }
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true
    };
  };
};

export default WatchPage;