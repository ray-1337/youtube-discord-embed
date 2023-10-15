import "dotenv/config";
import Head from "next/head";

import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import type { YouTubeMetadataBeforeDOM } from "../../typings";
import { useEffect, type FC } from "react";

import { useRouter } from "next/router";
import ms from "ms";
import ytdl from "ytdl-core";

const cachedURL = new Map<string, YouTubeMetadataBeforeDOM>();
const cacheTime = ms("6h");

const WatchPage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const router = useRouter(); 

  const parsedVideoID = router?.query?.v;
  const parsedVideoURL = `https://youtu.be/${parsedVideoID}`;

  const fallbackURLToCircleOfHell = parsedVideoID?.length ? parsedVideoURL : "https://github.com/ray-1337";

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.open(fallbackURLToCircleOfHell, "_self");
    };
  }, []);

  return (
    <Head>
      <meta httpEquiv={"refresh"} content={`0; url=${fallbackURLToCircleOfHell}`} />

      { (typeof props === "object" && props?.url?.length) && (
        <>
          <meta content="#ff0000" name="theme-color" />
          <meta property="description" content={props?.author_name}/>

          <meta property="og:site_name" content="YouTube / ray#1337" />
          <meta property="og:url" content={parsedVideoURL}/>
          <meta property="og:type" content="website"/>
          <meta property="og:title" content={props?.title || ""}/>
          <meta property="og:description" content={props?.author_name}/>
          <meta property="og:video" content={props.url} />
          <meta property="og:video:secure_url" content={props.url} />
          <meta property="og:video:type" content={new URL(props.url).pathname.endsWith("webm") ? "video/webm" : "video/mp4"} />
          <meta property="og:video:width" content={String(props?.width)} />
          <meta property="og:video:height" content={String(props?.height)} />
          <meta property="og:image" content={props?.thumbnail_url || ""} />

          <meta name="twitter:domain" content={"13373333.one"}/>
          <meta name="twitter:url" content={parsedVideoURL}/>
          <meta name="twitter:description" content={props?.author_name}/>
          <meta name="twitter:card" content="player" />
          <meta name="twitter:title" content={props?.title || ""} />
          <meta name="twitter:image" content={props?.thumbnail_url || ""} />
          <meta name="twitter:player:width" content={String(props?.width)} />
          <meta name="twitter:player:height" content={String(props?.height)} />
          <meta name="twitter:player:stream" content={props.url} />
          <meta name="twitter:player:stream:content_type" content={new URL(props.url).pathname.endsWith("webm") ? "video/webm" : "video/mp4"} />
        </>
      ) }
    </Head>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext<{v?: string}>) {
  try {
    const youtubeID = ctx?.query?.v as string | undefined;
    if (!youtubeID?.length || !ytdl.validateID(youtubeID)) return { props: {} };

    if (cachedURL.has(youtubeID)) {
      const cachedURLAfterHas = cachedURL?.get(youtubeID);
      if (!cachedURLAfterHas) return { props: {} };

      return { props: { ...cachedURLAfterHas } };
    };

    const rawYouTubeURL = "https://youtu.be/" + youtubeID;

    // below this code pictures how stupid i am
    const ytVideoInfo = await ytdl.getInfo(rawYouTubeURL, { 
      requestOptions: {
        cookie: process.env.COOKIE_BYPASS
      }
    });

    if (!ytVideoInfo) return { props: {} };
    
    const filteredFormats = ytVideoInfo.formats
    .filter(format => format.hasAudio && format.hasVideo && !format.isLive && !format.isHLS && format.quality === "medium");

    const firstRawVideoURL = filteredFormats?.[0];
    if (!firstRawVideoURL?.url?.length || !firstRawVideoURL?.mimeType?.length) return { props: {} };

    const content: YouTubeMetadataBeforeDOM = {
      author_name: ytVideoInfo?.videoDetails?.author?.name,
      author_url: ytVideoInfo?.videoDetails?.author?.channel_url,
      thumbnail_url: ytVideoInfo?.videoDetails?.thumbnails?.pop()?.url,
      title: ytVideoInfo?.videoDetails?.title,
      url: firstRawVideoURL.url,
      height: firstRawVideoURL.height,
      width: firstRawVideoURL.width,
      host: ctx?.req?.headers?.host
    };

    cachedURL.set(youtubeID, content);

    setTimeout(() => cachedURL.delete(youtubeID), cacheTime);

    return { props: { ...content } };
  } catch (error) {
    console.error(error);
    return { props: {} };
  };
};

export default WatchPage;