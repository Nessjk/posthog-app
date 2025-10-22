# 🦔 My PostHog Application (a.k.a. "webhog" or "fakehog")

So... I built a fake desktop OS to apply for a job. Normal? Probably not. Fun? Absolutely.

As a Vue.js developer, I needed to "learn" React for this app. I read through the documentation and completed the tic-tac-toe tutorial, which provided a solid foundation. Many concepts transfer smoothly between frameworks, so the learning curve was much much much less steep.

This is an interactive portfolio/resume/application disguised as a retro desktop interface. Highly inspired by [posthog.com](https://posthog.com) I think.

Double click for folders, single click for links and docs.
Click around and hopefully I made you smile, like your website did...I hope I emptied that trash. 🗑️

The image took a lot of trial and error. Midjourney wasn't cooperating but the new nano Banana model managed eventually... to get writing on the blocks!

**Live Demo**: [https://posthog-app.vercel.app/](https://posthog-app.vercel.app/)

## 🎯 What Is This Thing?

It's a React app that simulates a desktop environment where you can:

- Drag windows around like it's 1995 (but smoother)
- Open folders and documents to learn about me
- Click links to external projects
- Experience some PostHog analytics tracking under the hood

Built with: **React 19** (can't believe react 19.2 just got released as I was doing this project!) + **TypeScript** + **Redux Toolkit** + **Vite** + **PostHog Analytics**

## 🐛 The Challenges (a.k.a. "What Broke and How I Fixed It")

### The Z-Index Saga - CSS!

**The Problem:** Windows weren't focusing properly when clicked. The one on top wasn't always... on top.

**The "Clever" Solution:** AI used `Date.now()` for the z-index. I thought that was cool and clever... Time always moves forward, so newer clicks would always have higher values..didn't work. The DOM didn't agree. React's rendering cycle and the actual DOM updates weren't playing nice.

**The Boring Solution That Actually Works:** A simple counter. Just `++state.zCounter` in Redux. Each focus action increments it. No timestamps, no clever tricks, just a number that goes up. Sometimes boring is beautiful.

**Bug that became a feature:** When a new window opens it actually opens behind the bricks image on smaller screens...I thought that was too cool and unexpected..it stayed!

### The Dragging Dance

**The Problem:** Making windows draggable while keeping performance smooth.

**The Solution:** AI helped here. Initially tried handling everything through Redux, but the constant state updates made dragging super laggy. The final approach uses local state for the drag offset and only commits the final position to Redux on mouse up. Much smoother!

## 🤖 The Question you're (probably) all wondering..How much did AI Write?

**Human (me) - ~75%:**

- The entire concept and "creative direction"
- All the content (markdown files, copy, project descriptions)
- The data structure and routing logic
- Problem-solving the z-index issue (after AI's timestamp approach failed)
- The Redux store architecture
- PostHog analytics integration
- All the visual design decisions and styling
- Icon selection and asset curation

**AI - ~25%:**

- Window dragging/positioning logic boilerplate
- Some TypeScript type definitions (for speed)
- Initial Redux setup scaffolding
- Some CSS layout patterns

## ✨ Cool Features You Might Miss

1. **PostHog Analytics Integration**: This app actually tracks interactions! Open the "Behind the scenes" folder to see the PostHog dashboard link.

2. **Smart Window Positioning**: Windows automatically cascade incrementing the x,y position for each new window.

3. **Markdown Rendering**: All the document content is written in Markdown and rendered with the `marked` library. Easy to update, easy to read. Can be edited live just like posthog.com does.

4. **One Window Per Item**: Can't open duplicates.

5. **The Trash Folder**: I really need to empty the trash more regularly.

6. **Responsive(ish)**: The window sizes adapt to viewport dimensions. Is it perfect on mobile? No. Does it work? Mostly!

7. **Real Project Documentation**: The side projects folder contains actual projects I've built, with some screenshots I was able to dig up, and tech stacks.

## 🚀 Running Locally (not sure why you would, but just in case)

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

For PostHog analytics to work, you'll need to set `VITE_POSTHOG_KEY` & `VITE_PUBLIC_POSTHOG_HOST` in your environment ofc!

## 📁 Project Structure

```
src/
├── analytics/       # PostHog tracking helpers
├── components/      # Reusable UI components
├── content/         # All the markdown content
├── data/            # Desktop items and folder structure
├── features/        # Redux slices and feature components
│   ├── documents/   # Document window rendering
│   ├── folders/     # Folder window rendering
│   └── windows/     # Window management (the z-index battlefield)
└── assets/          # Icons and images
```

## 🤔 Why Build This?

Because PostHog's application asked me to "do more weird stuff," and I took that seriously. Also, traditional resumes are boring, and I wanted to ship something that showed rather than told. You are looker for builders after all, right?
