import Image from "next/image";
import Link from "next/link";
import { componentTypes } from "@utils/components";

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
