import type { NextApiRequest, NextApiResponse } from 'next';

export const defaultEmbed = {
  "author_name": "YouTube Discord Embed, inspired by FixTwitter.",
  "author_url": "https://13373333.one",
  "provider_name": "YouTube / 13373333.one",
  "provider_url": "https://github.com/ray-1337/youtube-discord-embed",
  "title": "YouTube Discord Embed, inspired by FixTwitter.",
  "type": "link",
  "version": "1.0"
};

const safelySlice = (str: string) => str.slice(0, 256);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let forwardedEmbed = defaultEmbed;

  if (req?.query?.text?.length) {
    forwardedEmbed.author_name = safelySlice(req.query.text as string);
    forwardedEmbed.title = safelySlice(req.query.text as string);
  };

  if (req?.query?.url?.length) {
    forwardedEmbed.author_url = safelySlice(req.query.url as string);
  };

  return new Response(JSON.stringify(forwardedEmbed), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};