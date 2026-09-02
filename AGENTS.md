<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# KeiChan's Personal Website

## Build
```bash
npm run build     # Static export to out/
npm run dev       # Dev server
npm run lint      # Lint
```

## Deploy
Push to main branch → GitHub Actions auto-deploys to GitHub Pages.

## Author field
When adding a new blog post via AI, make sure to add `author: "Your Name"` to the markdown frontmatter. This will be displayed under the post title and used in OpenGraph metadata.

## AI Editorial Disclaimer
When creating or editing blog posts via AI, always include a footnote at the bottom of the article stating that it was edited with AI assistance (e.g. `*Bài viết được biên tập lại với sự hỗ trợ của AI.*` for Vietnamese or `*This article was edited with the assistance of AI.*` for English).
