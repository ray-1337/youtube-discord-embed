# YouTube Discord Embed
Embed YouTube video on Discord by pulling off YouTube video, and make it playable through embeds with OpenGraph/Twitter meta tags.

This project is highly inspired by [FixTweet](https://fixupx.com), and powered with [Next.js](https://nextjs.org)/[Vercel](https://vercel.app).

![A final version of YouTube Discord Embed](https://repository-images.githubusercontent.com/704985019/9cc921f6-9f13-4c2b-98b1-001ff738f405)

# Setup
- Run `pnpm install` to install the dependencies.
- Edit `.env.example` to `.env`
- Edit `COOKIE_BYPASS` value by:
  - following the [instructions here](https://github.com/distubejs/ytdl-core?tab=readme-ov-file#how-to-get-cookies),
  - [stringify the JSON value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify),
  - and, paste the value.
- Then, use:
  - `pnpm dev` for development.
  - `pnpm build` and then `pnpm start` for production-ready.

# Error Handling
In a week or two, YouTube starts to show an error such as '`Sign in to confirm you’re not a bot`'.

You can handle this by:
- Open your browser (a browser where you previously export those cookies above), login to your YouTube account, and starts by doing something such as watching a YouTube video.
- Or, reset the `COOKIE_BYPASS` key value by redoing the **Setup** above.

# Self-host
You can fork the repository, host it somewhere else, and change the domain.

# Cloud-hosted domain
I also hosted the project for free on the cloud. You can use it by replacing `youtube.com/watch` or `youtu.be` with my domain.

- **`youtube.com/watch`**, normal route:
  - https://yt.cdn.13373333.one/watch?v=dQw4w9WgXcQ
  - https://yourdomain.com/watch?v=dQw4w9WgXcQ
- **`youtu.be`**, YouTube URL shortener route:
  - https://yt.cdn.13373333.one/dQw4w9WgXcQ
  - https://yourdomain.com/dQw4w9WgXcQ
- **`youtube.com/shorts`**, shorts route:
  - https://yt.cdn.13373333.one/shorts/b1hnji5jPRE
  - https://yourdomain.com/shorts/b1hnji5jPRE

## License
[MIT](LICENSE)
