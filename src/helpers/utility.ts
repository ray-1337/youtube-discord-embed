import { validateID } from "@distube/ytdl-core";
import { type ParsedUrlQuery } from "node:querystring";

export function dynamicSearchForYouTubeID(query?: ParsedUrlQuery) {
  if (query?.ytID === "watch" && query?.v?.length && validateID(query.v as string)) {
    return String(query.v);
  } else if (validateID(query?.ytID as string)) {
    return String(query?.ytID);
  };

  return null;
};