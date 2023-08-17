import { blogPostRegistry } from "@utils/blog";
import dayjs from "dayjs";
import Link from "next/link";

const posts = blogPostRegistry.reverse();

export const Homepage = () => {
  return (
    <div className="mx-auto w-full max-w-[900px] pt-12">
      <header className="grid gap-y-8 pb-10">
        <div className="space-y-2">
          <h1 className="nx-mt-2 nx-text-4xl nx-font-bold nx-tracking-tight nx-text-slate-100">
            From the blog
          </h1>
          <p className="nx-text-gray-400">
            More news and blog posts coming soon...
          </p>
        </div>
      </header>
      <section className="grid grid-cols-1 gap-x-4 gap-y-8 border-t border-white/10 py-10 lg:grid-cols-2">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="group relative grid place-content-start space-y-2 transition-color"
          >
            <div className="flex items-center gap-x-2 text-sm nx-text-gray-400">
              <time dateTime={post.date}>
                {dayjs(post.date).format("D MMM YY")}
              </time>
              <span>·</span>
              <div className="space-x-1">
                <span>by</span>
                <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text font-semibold text-transparent">
                  @{post.github}
                </span>
              </div>
            </div>
            <h3 className="nx-font-semibold nx-tracking-tight nx-text-slate-100 text-2xl hover:nx-text-primary-600">
              <Link href={`/blog/${post.slug}`}>
                <span className="absolute inset-0" />
                {post.title}
              </Link>
            </h3>
            <p className="line-clamp-2 nx-text-gray-400">{post.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};
