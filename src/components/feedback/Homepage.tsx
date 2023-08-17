import Image from "next/image";
import feedbackImage from "public/images/feedback/feedback.png";
import { CTA } from "@components/ui/CTA";

export const Homepage = () => {
  return (
    <div className="mx-auto max-w-5xl grid place-content-center place-items-center h-full w-full gap-6 lg:grid-cols-2">
      <section className="space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">
          Share your Feedback
        </h1>
        <p className="text-lg leading-relaxed nx-text-gray-400">
          We want to hear what you think about MailingUI! Whether it&apos;s an
          issue you&apos;ve encountered or a new feature suggestion, your
          feedback is important to us.
        </p>
        <div className="lg:space-x-2 space-y-2">
          <CTA href="https://github.com/webscopeio/mailingui/issues">
            Report an issue
          </CTA>
          <CTA secondary href="https://github.com/webscopeio/mailingui/discussions">
            Request a new feature
          </CTA>
        </div>
      </section>
      <Image
        src={feedbackImage}
        alt="Feedback Image"
        quality={100}
        className="lg:max-w-[500px]"
        priority={true}
      />
    </div>
  );
};
