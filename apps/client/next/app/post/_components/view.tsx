'use client';

import type { Post } from '@reddit-clone/shared';
import {
  ArrowBigDown,
  ArrowBigUp,
  ArrowLeft,
  Bookmark,
  Check,
  Clock3,
  Edit3,
  Plus,
  Share2,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type Vote = -1 | 0 | 1;

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

function formatDate(value: string) {
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? 'Recently' : dateFormatter.format(date);
}

function getReadingTime(content: string) {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / 200));
}

function PostView({ post }: { post: Post }) {
  const [vote, setVote] = useState<Vote>(0);
  const [isSaved, setIsSaved] = useState(false);
  const [wasCopied, setWasCopied] = useState(false);
  const wasEdited = post.updatedAt !== post.createdAt;

  function castVote(nextVote: Exclude<Vote, 0>) {
    setVote((currentVote) => (currentVote === nextVote ? 0 : nextVote));
  }

  async function sharePost() {
    const shareData = { title: post.title, url: window.location.href };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setWasCopied(true);
    } catch {
      setWasCopied(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Link
        href="/"
        className="group inline-flex items-center gap-2 rounded-full text-xs font-semibold text-black/50 transition hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee5a2f]/40"
      >
        <ArrowLeft
          className="size-4 transition-transform group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
        Back to the feed
      </Link>

      <div className="mt-6 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_230px] lg:gap-7">
        <article className="overflow-hidden rounded-3xl border border-black/8 bg-white shadow-[0_18px_60px_rgba(42,37,28,0.07)]">
          <header className="border-b border-black/7 px-5 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[11px] font-semibold text-black/45">
              <span className="rounded-full bg-[#ffede7] px-2.5 py-1 uppercase tracking-[0.12em] text-[#c64220]">
                Community post
              </span>
              <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
              <span className="size-0.5 rounded-full bg-black/25" aria-hidden="true" />
              <span className="inline-flex items-center gap-1">
                <Clock3 className="size-3" aria-hidden="true" />
                {getReadingTime(post.content)} min read
              </span>
            </div>

            <h1 className="mt-6 max-w-3xl text-3xl font-semibold leading-[1.05] tracking-[-0.05em] text-balance sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {wasEdited ? (
              <p className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-medium text-black/38">
                <Edit3 className="size-3" aria-hidden="true" />
                Last edited {formatDate(post.updatedAt)}
              </p>
            ) : null}
          </header>

          <div className="px-5 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
            <div className="max-w-3xl whitespace-pre-wrap break-words text-[15px] leading-8 text-black/70 sm:text-base">
              {post.content}
            </div>
          </div>

          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-black/7 bg-[#fbfaf7] px-5 py-4 sm:px-9 lg:px-12">
            <div
              className="inline-flex items-center rounded-full bg-[#eeece7] p-0.5"
              aria-label="Post voting"
            >
              <button
                type="button"
                onClick={() => castVote(1)}
                className={`grid size-8 place-items-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee5a2f]/40 ${
                  vote === 1
                    ? 'bg-[#ff6842] text-white shadow-sm'
                    : 'text-black/45 hover:bg-white hover:text-[#e44e27]'
                }`}
                aria-label="Upvote post"
                aria-pressed={vote === 1}
              >
                <ArrowBigUp className="size-4" aria-hidden="true" />
              </button>
              <span
                className={`min-w-8 text-center text-xs font-bold tabular-nums ${
                  vote === 0 ? 'text-black/55' : 'text-[#c64220]'
                }`}
                aria-label={`${vote} votes`}
              >
                {vote}
              </span>
              <button
                type="button"
                onClick={() => castVote(-1)}
                className={`grid size-8 place-items-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6558c7]/40 ${
                  vote === -1
                    ? 'bg-[#6558c7] text-white shadow-sm'
                    : 'text-black/45 hover:bg-white hover:text-[#6558c7]'
                }`}
                aria-label="Downvote post"
                aria-pressed={vote === -1}
              >
                <ArrowBigDown className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsSaved((currentValue) => !currentValue)}
                className={`inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee5a2f]/40 ${
                  isSaved
                    ? 'bg-[#fff0eb] text-[#c64220]'
                    : 'text-black/50 hover:bg-black/5 hover:text-black/75'
                }`}
                aria-pressed={isSaved}
              >
                <Bookmark
                  className={`size-3.5 ${isSaved ? 'fill-current' : ''}`}
                  aria-hidden="true"
                />
                {isSaved ? 'Saved' : 'Save'}
              </button>
              <button
                type="button"
                onClick={sharePost}
                className="inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-xs font-semibold text-black/50 transition hover:bg-black/5 hover:text-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee5a2f]/40"
              >
                {wasCopied ? (
                  <Check className="size-3.5 text-[#17674f]" aria-hidden="true" />
                ) : (
                  <Share2 className="size-3.5" aria-hidden="true" />
                )}
                {wasCopied ? 'Copied' : 'Share'}
              </button>
            </div>
          </footer>
        </article>

        <aside className="rounded-2xl border border-black/8 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.04)] lg:sticky lg:top-6">
          <div className="grid size-9 place-items-center rounded-xl bg-[#e6f3ee] text-[#17674f]">
            <span className="size-2.5 rounded-full bg-current" />
          </div>
          <h2 className="mt-5 text-base font-semibold tracking-[-0.02em]">
            Have something to add?
          </h2>
          <p className="mt-2 text-xs leading-5 text-black/48">
            Keep the ideas moving. Share a question, lesson, or discovery of your own.
          </p>
          <Link
            href="/post/create"
            className="mt-5 inline-flex h-9 w-full items-center justify-center gap-2 rounded-full bg-[#20211f] px-4 text-xs font-semibold text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ee5a2f]/50"
          >
            <Plus className="size-3.5" aria-hidden="true" />
            Create a post
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default PostView;
