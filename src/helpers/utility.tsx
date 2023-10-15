import { validateID } from "ytdl-core";
import { ServerSidePropsWithV } from "../../typings";

export function dynamicSearchForYouTubeID(context: ServerSidePropsWithV) {
  if (context?.query?.ytID === "watch" && context?.query?.v?.length && validateID(context.query.v as string)) {
    return String(context.query.v);
  } else if (validateID(context?.query?.ytID as string)) {
    return String(context.query.ytID);
  };

  return null;
};