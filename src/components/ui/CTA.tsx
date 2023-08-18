import cn from "clsx";
import Link from "next/link";

type CTAProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  secondary?: boolean;
  compact?: boolean;
  dynamicWidth?: boolean;
};

type CTASlot = React.PropsWithChildren<{ className: string }>;

export const CTA = ({
  children,
  href,
  onClick,
  secondary,
  compact,
  dynamicWidth = true,
}: CTAProps) => {
  const Component = href
    ? (props: CTASlot) => <Link href={href} {...props} />
    : (props: CTASlot) => <button onClick={onClick} {...props} />;
  return (
    <Component
      className={`inline-flex items-center justify-center gap-x-2 rounded-xl font-medium text-center ${cn(
        !secondary && "bg-white text-black",
        !secondary
          ? "hover-brand-gradient hover:text-white transition-colors"
          : "border border-transparent hover:border-white",
        compact ? "px-6 h-12 text-sm" : "px-8 h-14",
        dynamicWidth ? "w-full lg:w-fit" : "w-fit"
      )}`}
    >
      {children}
    </Component>
  );
};
