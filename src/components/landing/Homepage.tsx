import Image from "next/image";
import homepageHeroImage from "public/images/homepage-hero.png";
import newsletterDove from "public/images/newsletter-dove.png";
import minimalHeroImage from "public/images/minimal-hero.png";
import { CTA } from "@components/ui/CTA";
import { StarIcon } from "lucide-react";
import { ComponentsOverview } from "@components/docs/components/ComponentsOverview";

/** ID of our form in ConvertKit. */
const FORM_ID = "5117081";

export const Homepage = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-24 pt-36">
      {/* MAIN HERO SECTION */}
      <div className="grid place-content-center place-items-center h-full w-full gap-x-12 gap-y-6 lg:grid-cols-2 -mb-16">
        <div className="space-y-6">
          <div className="space-x-2">
            <GradientBadge>React</GradientBadge>
            <GradientBadge>HTML</GradientBadge>
          </div>
          <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight">
            Create emails powered by open-source
          </h1>
          <p className="text-lg leading-relaxed nx-text-gray-400">
            Build emails effortlessly with our stunning open-sourced components
            and templates
          </p>
          <div className="flex flex-col lg:flex-row gap-2">
            <CTA href="/docs/guide/introduction">Get Started</CTA>
            <CTA
              secondary
              href="https://github.com/webscopeio/mailingui/stargazers"
            >
              <StarIcon />
              GitHub Stars
            </CTA>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <Image
            src={homepageHeroImage}
            alt="Homepage hero image"
            quality={100}
            className="lg:max-w-[500px]"
            priority={true}
          />
          <div className="absolute bottom-0 h-1/3 w-full bg-[linear-gradient(to_bottom,transparent,#111111_80%)]" />
        </div>
      </div>
      {/* NEWSLETTER SECTION */}
      <div className="space-y-6">
        <Image
          src={newsletterDove}
          alt="Dove with a letter image"
          quality={100}
          priority={true}
          className="mx-auto"
        />
        <header className="mx-auto lg:text-center">
          <h2 className="font-semibold uppercase nx-text-gray-400">
            Newsletter
          </h2>
          <h3 className="max-w-2xl lg:mx-auto text-3xl lg:text-4xl font-semibold tracking-tight">
            Enter your email address and stay tuned
          </h3>
        </header>
        <form
          className="flex flex-col gap-x-2 gap-y-3 lg:flex-row lg:justify-center"
          action={`https://app.convertkit.com/forms/${FORM_ID}/subscriptions`}
          method="post"
        >
          <input
            className="w-full rounded-xl p-4 text-base lg:w-96"
            type="email"
            name="email_address"
            placeholder="Your email"
            aria-label="email"
          />
          <CTA>Subscribe</CTA>
        </form>
      </div>
      {/* COMPONENTS SECTION */}
      <div className="space-y-12">
        <header className="mx-auto lg:text-center">
          <h2 className="font-semibold uppercase nx-text-gray-400">
            Components
          </h2>
          <h3 className="mx-auto text-5xl lg:text-6xl font-semibold tracking-tight">
            Build an eye-catching email with pre-made components
          </h3>
        </header>
        <div>
          <ComponentsOverview />
        </div>
        <div className="lg:flex gap-2 justify-center">
          <CTA href="/docs/guide/introduction">Components</CTA>
        </div>
      </div>
      {/* TEMPLATES SECTION */}
      <div className="space-y-12">
        <header className="mx-auto lg:text-center">
          <h2 className="font-semibold uppercase nx-text-gray-400">
            Templates
          </h2>
          <h3 className="mx-auto text-5xl lg:text-6xl font-semibold tracking-tight">
            Modern email templates, crafted with MailingUI
          </h3>
        </header>
        <div className="grid lg:place-content-center lg:place-items-center h-full w-full gap-x-12 gap-y-6  lg:grid-cols-2">
          <div className="relative overflow-hidden order-last lg:order-1">
            <Image
              src={minimalHeroImage}
              alt="Minimal Templates"
              quality={100}
              className="lg:max-w-[500px]"
              priority={true}
            />
            <div className="absolute bottom-0 h-1/3 w-full bg-[linear-gradient(to_bottom,transparent,#111111_80%)]" />
          </div>
          <div className="space-y-4 order-1 lg:order-last">
            <div className="space-x-2">
              <GradientBadge>New</GradientBadge>
              <GradientBadge>Open-sourced</GradientBadge>
            </div>
            <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight">Minimal</h1>
            <p className="text-lg leading-relaxed nx-text-gray-400">
              Minimal calls for a simple and clean design.
            </p>
            <div className="lg:flex gap-2">
              <CTA href="/templates">Explore template</CTA>
            </div>
          </div>
        </div>
        <div className="lg:flex gap-2 justify-center">
          <CTA href="/templates">Templates</CTA>
        </div>
      </div>
    </div>
  );
};

const GradientBadge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="inline-flex rounded-full brand-gradient p-px">
      <div className="inline-flex h-full w-full rounded-full bg-[#1E0312] text-[#C71679] px-4 py-2">
        <span className="inline-flex gap-2 brand-gradient bg-clip-text text-sm font-medium text-transparent">
          {children}
        </span>
      </div>
    </div>
  );
};
