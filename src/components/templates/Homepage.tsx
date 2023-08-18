import { CTA } from "@components/ui/CTA";
import { DownloadIcon, ExternalLinkIcon, ShareIcon } from "lucide-react";
import Image from "next/image";
import { templates } from "@utils/templates";

export const Homepage = () => {
  return (
    <div className="mx-auto max-w-5xl pt-12 space-y-12">
      {templates.map((template) => (
        <div key={template.id}>
          <header className="pb-10 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-x-2 text-sm nx-text-gray-400">
                <span>{template.price}</span>
                <span>·</span>
                <div className="space-x-1">
                  <span>created by</span>
                  <a
                    target="_blank"
                    href={`https://github.com/${
                      template.github === "MailingUI"
                        ? "webscope/mailingui"
                        : template.github
                    }`}
                  >
                    <span className="brand-gradient bg-clip-text font-semibold text-transparent">
                      @{template.github}
                    </span>
                  </a>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight nx-text-slate-100">
                {template.title}
              </h1>
              <p className="nx-text-gray-400">{template.description}</p>
            </div>
            <div className="lg:space-x-2 space-y-2">
              <CTA href="/">
                <DownloadIcon />
                Download
              </CTA>
              <CTA secondary href="/">
                <ShareIcon />
                Share
              </CTA>
            </div>
          </header>
          <section className="space-y-12 border-t border-white/10 py-10">
            {template.categories.map((category) => (
              <div
                key={category.downloadHref}
                className="grid gap-6 grid-cols-1 lg:grid-cols-2 items-center justify-center"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold tracking-tight nx-text-slate-100 text-2xl">
                      {category.title}
                    </h3>
                    <p className="line-clamp-2 nx-text-gray-400">
                      {category.description}
                    </p>
                  </div>
                  <div className="lg:space-x-2 space-y-2">
                    <CTA compact href="/">
                      <ExternalLinkIcon />
                      Preview
                    </CTA>
                    <CTA compact secondary href="/">
                      <DownloadIcon />
                      Download
                    </CTA>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <div className="relative flex w-max gap-x-4">
                    {category.imageUrls.map((image, i) => (
                      <Image
                        key={i}
                        src={image}
                        height={232}
                        width={260}
                        alt={`Minimal - ${category.title} preview`}
                        className="rounded-md"
                      />
                    ))}
                    <div className="absolute bottom-0 h-1/2 w-full bg-[linear-gradient(to_bottom,transparent,#111111)]" />
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      ))}
    </div>
  );
};
