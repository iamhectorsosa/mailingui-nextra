import cn from "clsx";
import Link from "next/link";

type CTAProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  secondary?: boolean;
  compact?: boolean;
};

type CTASlot = React.PropsWithChildren<{ className: string }>;

export const CTA = ({
  children,
  secondary,
  compact,
  href,
  onClick,
}: CTAProps) => {
  const Component = href
    ? (props: CTASlot) => <Link href={href} {...props} />
    : (props: CTASlot) => <button onClick={onClick} {...props} />;
  return (
    <Component
      className={`inline-flex items-center justify-center gap-x-2 w-full lg:w-fit rounded-xl font-medium  text-center ${cn(
        !secondary && "bg-white text-black",
        !secondary
          ? "hover-brand-gradient hover:text-white transition-colors"
          : "border border-transparent hover:border-white",
        compact ? "px-6 h-12 text-sm" : "px-8 h-14"
      )}`}
    >
      {children}
    </Component>
  );
};
