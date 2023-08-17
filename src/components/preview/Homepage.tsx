import { CTA } from "@components/ui/CTA";

export const Homepage = () => {
  return (
    <div className="mx-auto grid place-content-center place-items-center h-full w-full gap-6 text-center">
      <section className="space-y-6">
        <h1 className="text-4xl font-semibold md:text-6xl">
          Welcome to Preview
        </h1>
        <p className="text-lg leading-relaxed text-neutral-500">
          This page is still under construction! Thanks for your patience!
        </p>
        <div className="lg:space-x-2 space-y-2">
          <CTA href="/docs">Documentation</CTA>
          <CTA secondary href="/templates">
            Templates
          </CTA>
        </div>
      </section>
    </div>
  );
};
