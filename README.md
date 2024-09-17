# youtube-discord-embed
Embed YouTube video on Discord, inspired by [FixTweet](https://fixupx.com), powered by [Next.js](https://nextjs.org)/[Vercel](https://vercel.app).

![A final version of YouTube Discord Embed](https://repository-images.githubusercontent.com/704985019/9cc921f6-9f13-4c2b-98b1-001ff738f405)

## Disclaimer (UPDATE II, 17.09.24)
Due to recent YouTube breakdown, setting values of cookies is required.

Please follow the [instructions here](https://github.com/distubejs/ytdl-core?tab=readme-ov-file#how-to-get-cookies), [stringify the JSON value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify), rename the `.env.example` to `.env`, then paste the stringified JSON value to the `COOKIE_BYPASS` key.

If you ever encounter the error message (which one day it will happen), '`Sign in to confirm you’re not a bot`', it means you need to return to step one, which involves renewing the cookies.

It's simple: just go back to where you obtained the cookies and copy them again.

## Motivation
I just hate the current YouTube embed, where in mobile, you'll be redirected outside Discord/to YouTube app just to play a video, which is not a really pleasant experience.

## What does this do?
Basically pulling off YouTube video, and make it playable through embeds with OpenGraph/Twitter meta tags.

This concept is pretty much the same with [FixTweet](https://fixupx.com) or similar.

## Nice, can I use this?
Absolutely, you can fork the repo, host it somewhere else, and change the domain.

- **`youtube.com/watch`**, normal route:
  - https://yt.cdn.13373333.one/watch?v=dQw4w9WgXcQ
  - https://yourdomain.com/watch?v=dQw4w9WgXcQ
- **`youtu.be`**, YouTube URL shortener route:
  - https://yt.cdn.13373333.one/dQw4w9WgXcQ
  - https://yourdomain.com/dQw4w9WgXcQ
- **`youtube.com/shorts`**, shorts route: (NEW)
  - https://yt.cdn.13373333.one/shorts/b1hnji5jPRE
  - https://yourdomain.com/shorts/b1hnji5jPRE

## License
[MIT](LICENSE)
