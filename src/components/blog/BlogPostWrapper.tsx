import * as React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { blogPostRegistry } from "@utils/blog";

export const BlogPostWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const slug = pathname.match(/\/([^/]+)$/)?.[1];
  const registry = blogPostRegistry.find((item) => item.slug === slug);

  if (!registry) return null;
  const { title, date, description, github } = registry;

  return (
    <>
      <header className="space-y-2 pt-12">
        <div className="flex items-center gap-x-2 text-sm nx-text-gray-400">
          <time dateTime={date}>{dayjs(date).format("dddd D MMMM YY")}</time>
          <span>·</span>
          <div className="space-x-1">
            <span>by</span>
            <a target="_blank" href={`https://github.com/${github}`}>
              <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text font-semibold text-transparent">
                @{github}
              </span>
            </a>
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        <p className="leading-7 nx-text-gray-400 pt-2">{description}</p>
      </header>
      {children}
      <footer className="flex items-center gap-x-3 pt-12">
        <Image
          width={50}
          height={50}
          alt={github}
          src={
            github
              ? `http://avatars.githubusercontent.com/${github}`
              : "https://github.com/identicons/webscope.png"
          }
          className="overflow-hidden rounded-full"
        />
        <div className="grid gap-1 nx-text-gray-400">
          <div className="space-x-1">
            <span>Written by</span>
            <a target="_blank" href={`https://github.com/${github}`}>
              <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text font-semibold text-transparent">
                {github}
              </span>
            </a>
          </div>
          <time dateTime={date}>{dayjs(date).format("dddd D MMMM YY")}</time>
        </div>
      </footer>
    </>
  );
};
