import Link from "next/link";
import Image from "next/image";
import feedbackImage from "public/images/feedback/feedback.png";

export const Homepage = () => {
  return (
    <div className="mx-auto grid place-content-center place-items-center h-full w-full gap-6 md:grid-cols-2">
      <section className="space-y-6">
        <h1 className="text-4xl font-semibold md:text-6xl">
          Share your Feedback
        </h1>
        <p className="text-lg leading-relaxed text-neutral-500">
          We want to hear what you think about MailingUI! Whether it&apos;s an
          issue you&apos;ve encountered or a new feature suggestion, your
          feedback is important to us.
        </p>
        <div className="w-full md:flex md:gap-4">
          <Link
            href={"https://github.com/webscopeio/mailingui/issues"}
            className="border block w-full md:w-fit px-8 py-4 rounded-xl bg-white text-black font-medium"
          >
            Report an issue
          </Link>
          <Link
            href={"https://github.com/webscopeio/mailingui/discussions"}
            className="w-full block md:w-fit px-8 py-4 border border-transparent rounded-xl font-medium"
          >
            Request a new feature
          </Link>
        </div>
      </section>
      <Image
        src={feedbackImage}
        alt="Feedback Image"
        quality={100}
        className="md:max-w-[500px]"
        priority={true}
      />
    </div>
  );
};
