# youtube-discord-embed
Embed YouTube video on Discord, inspired by [FixTweet](https://fixupx.com), powered by [Next.js](https://nextjs.org)/[Vercel](https://vercel.app).

![A final version of YouTube Discord Embed](https://repository-images.githubusercontent.com/704985019/9cc921f6-9f13-4c2b-98b1-001ff738f405)

## Disclaimer (UPDATE, 08.08.24)
Due to recent YouTube breakdown, setting values of cookies is required.

Please follow the [instructions here](https://github.com/distubejs/ytdl-core?tab=readme-ov-file#how-to-get-cookies), [stringify the JSON value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify), rename the `.env.example` to `.env`, then paste the stringified JSON value to the `COOKIE_BYPASS` key.

## Motivation
I just hate the current YouTube embed, where in mobile, you'll be redirected outside Discord/to YouTube app just to play a video, which is not a really pleasant experience.

## What does this do?
Basically pulling off YouTube video, and make it playable through embeds with OpenGraph/Twitter meta tags.

This concept is pretty much the same with [FixTweet](https://fixupx.com) or similar.

## Nice, can I use this?
Absolutely, you can fork the repo, host it somewhere else, and change the domain.

- https://www.youtube.com/watch?v=dQw4w9WgXcQ (with `/watch` route)
  - https://yt.cdn.13373333.one/watch?v=dQw4w9WgXcQ, or https://yourdomain.com/watch?v=dQw4w9WgXcQ
- https://youtu.be/dQw4w9WgXcQ (with `youtu.be` / official YouTube URL shortener)
  - https://yt.cdn.13373333.one/dQw4w9WgXcQ, or https://yourdomain.com/dQw4w9WgXcQ
- https://youtube.com/shorts/b1hnji5jPRE (with YouTube shorts)
  - https://yt.cdn.13373333.one/shorts/b1hnji5jPRE, or https://yourdomain.com/shorts/dQw4w9WgXcQ
## License
[MIT](LICENSE)
