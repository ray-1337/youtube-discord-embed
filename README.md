# youtube-discord-embed
Embed YouTube video on Discord, inspired by [FixTweet](https://fixupx.com), powered by [Next.js](https://nextjs.org)/[Vercel](https://vercel.app).

## Disclaimer
Due to recent YouTube preventing adblockers move, these can break at anytime without notice.

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

## License
[MIT](LICENSE)
