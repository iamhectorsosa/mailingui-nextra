import Image from "next/image";
import Link from "next/link";

import { type StaticImageData } from "next/image";

import SocialIcons from "public/images/components-preview/social_icons.png";
import Paragraphs from "public/images/components-preview/paragraphs.png";
import Lists from "public/images/components-preview/listing.png";
import Heroes from "public/images/components-preview/heroes.png";
import Emojis from "public/images/components-preview/emojis.png";
import Dividers from "public/images/components-preview/dividers.png";
import Buttons from "public/images/components-preview/buttons.png";
import Badges from "public/images/components-preview/badges.png";

interface ComponentMetadataType {
  type: string;
  title: string;
  subtitle: string;
  image: StaticImageData;
  dependencies?: string[];
}

export const componentTypes: ComponentMetadataType[] = [
  {
    type: "hero-sections",
    title: "Hero section",
    subtitle: "Beautiful headers to showcase your message",
    image: Heroes,
  },
  {
    type: "lists",
    title: "Lists",
    subtitle: "Organize information with simple lists",
    image: Lists,
  },
  {
    type: "badges",
    title: "Badges",
    subtitle: "Highlight key information with attention-grabbing badges",
    image: Badges,
  },
  {
    type: "buttons",
    title: "Buttons",
    subtitle: "Drive user action with clickable buttons",
    image: Buttons,
  },
  {
    type: "emojis",
    title: "Emojis",
    subtitle: "Add personality and emotion to your messages",
    image: Emojis,
  },
  {
    type: "social-icons",
    title: "Social icons",
    subtitle: "Increase engagement with clickable social icons",
    image: SocialIcons,
  },
  {
    type: "texts",
    title: "Paragraphs",
    subtitle: "Craft compelling content with easy-to-read paragraphs",
    image: Paragraphs,
  },
  {
    type: "dividers",
    title: "Dividers",
    subtitle: "Create visual separation for a clean, professional look",
    image: Dividers,
  },
];

export const ComponentsOverview = () => (
  <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 md:gap-12 lg:grid-cols-4">
    {componentTypes.map(({ image, title, subtitle, type }, index) => (
      <li
        className="group relative rounded-2xl hover:opacity-90 list-item"
        key={title}
      >
        <Image
          src={image}
          alt={title}
          quality={100}
          className="relative w-full"
          priority={true}
        />
        <h3 className="mt-4 text-base font-medium text-white">
          <Link href={`/docs/components/${type}`} className="hover:opacity-70">
            <span className="absolute -inset-2.5 z-10 cursor-pointer" />
            <span>{title}</span>
          </Link>
        </h3>
        <p className="mt-1 text-sm text-dark-100">{subtitle}</p>
      </li>
    ))}
  </ul>
);
