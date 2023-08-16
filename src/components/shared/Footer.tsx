import Link from "next/link";
import { MailingUILogo } from "../MailingUILogo";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-stone-900">
      <footer className="pt-12 pb-24 max-w-[90rem] mx-auto px-6">
        <div>
          <Link href="/" className="hover:opacity-70">
            <MailingUILogo />
          </Link>
          <div className="mt-4">
            &copy; {currentYear} MailingUI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
