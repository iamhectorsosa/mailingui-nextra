import cn from "clsx";
import Link from "next/link";

type CTAProps = {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
};

export const CTA = ({ href, children, secondary }: CTAProps) => {
  return (
    <Link
      href={href}
      className={`border block w-full md:w-fit px-8 py-4 rounded-xl font-medium border-transparent text-center ${cn(
        !secondary && "bg-white text-black"
      )}`}
    >
      {children}
    </Link>
  );
};
