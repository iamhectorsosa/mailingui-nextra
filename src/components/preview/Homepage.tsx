import * as React from "react";
import { CTA } from "@components/ui/CTA";
import { FileType } from "@utils/preview";
import {
  Code2Icon,
  EyeIcon,
  FileIcon,
  FolderIcon,
  FolderMinusIcon,
  FolderPlusIcon,
  MailIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MailingUILogo } from "@components/MailingUILogo";
import { CodeBlock } from "@components/docs/components/CodeBlock";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/Popover";

export const Homepage = ({
  fileTree,
  selectedPath,
  isFolder,
  html,
  sourceCode,
}: {
  fileTree: FileType[];
  selectedPath: string;
  isFolder: boolean;
  html: string;
  sourceCode: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [isPreview, setIsPreview] = React.useState(true);
  return (
    <div className="h-screen w-screen flex bg-[#111111] text-slate-100">
      {/* Preview File Explorer */}
      {isOpen && (
        <aside className="lg:w-[300px] bg-stone-900 absolute lg:relative w-full h-full z-50 px-6">
          <header className="flex items-center justify-between h-24">
            <Link href="/">
              <MailingUILogo />
            </Link>
            <CTA
              secondary
              dynamicWidth={false}
              compact
              onClick={() => setIsOpen(!isOpen)}
              className="px-4"
            >
              {isOpen ? <PanelLeftCloseIcon /> : <PanelLeftOpenIcon />}
            </CTA>
          </header>
          <div className="space-y-3">
            {fileTree.map((file) => (
              <FileComponent
                key={file.name}
                file={file}
                href={`/preview/${file.name}`}
              />
            ))}
          </div>
        </aside>
      )}
      {/* Preview Toolbar */}
      <div className="flex-1 flex flex-col overflow-scroll">
        <nav className="flex w-full flex-shrink-0 items-center justify-between gap-2 p-2 h-24 border-b border-white/10 px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {!isOpen && (
                <CTA
                  secondary
                  dynamicWidth={false}
                  compact
                  onClick={() => setIsOpen(!isOpen)}
                  className="px-4"
                >
                  {isOpen ? <PanelLeftCloseIcon /> : <PanelLeftOpenIcon />}
                </CTA>
              )}
            </div>
            <h3 className="text-slate-100 text-sm inline-flex items-center gap-x-2">
              {isFolder ? (
                <FolderIcon className="h-5 w-5 stroke-1" />
              ) : (
                <FileIcon className="h-5 w-5 stroke-1" />
              )}
              {selectedPath}
            </h3>
          </div>
          <div className="items-center gap-x-4 flex">
            <div className="bg-stone-900 rounded-full p-1.5">
              <button
                onClick={() => setIsPreview(true)}
                className={`rounded-full gap-x-2 px-1.5 h-8 hover:bg-stone-800 ${
                  isPreview ? "brand-gradient" : ""
                }`}
              >
                <EyeIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsPreview(false)}
                className={`rounded-full gap-x-2 px-1.5 h-8 hover:bg-stone-800 ${
                  !isPreview ? "brand-gradient" : ""
                }`}
              >
                <Code2Icon className="h-5 w-5" />
              </button>
            </div>
            <Popover>
              <PopoverTrigger>
                <CTA
                  className="hidden lg:inline-flex"
                  compact
                  dynamicWidth={false}
                >
                  <MailIcon />
                  <span className="hidden lg:inline">Send</span>
                </CTA>
              </PopoverTrigger>
              <PopoverContent className="w-[320px]" align="end">
                <form className="space-y-4 font-sans" action="/" method="post">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-gray-400 block">Email</label>
                    <input
                      className="rounded-xl p-4 w-full bg-stone-900"
                      type="email"
                      id="email"
                      placeholder="Your email"
                      aria-label="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-gray-400 block">Subject</label>
                    <input
                      className="rounded-xl p-4 w-full bg-stone-900"
                      type="text"
                      id="subject"
                      placeholder="Hello from MailingUI"
                      aria-label="subject"
                    />
                  </div>
                  <footer className="flex justify-between items-start">
                    <p className="text-gray-400 text-xs">Powered by React.email</p>
                    <CTA compact>Send</CTA>
                  </footer>
                </form>
              </PopoverContent>
            </Popover>
          </div>
        </nav>
        {/* Preview Pane */}
        <div className="flex-1 overflow-y-scroll overflow-x-scroll">
          {!isFolder &&
            (isPreview ? (
              <iframe
                className="w-full h-full"
                id={selectedPath}
                title={selectedPath}
                srcDoc={html}
              />
            ) : (
              <div className="relative h-full overflow-auto [&_pre]:rounded-none [&_pre]:mb-0">
                <CodeBlock code={sourceCode} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const FileComponent = ({
  file,
  href = "",
}: {
  file: FileType;
  href?: string;
}) => {
  const { asPath } = useRouter();
  return (
    <details
      className="text-gray-400 text-sm space-y-3"
      open={asPath.includes(href)}
    >
      <summary
        className={`inline-flex items-center gap-x-2 cursor-pointer hover:opacity-75 ${
          asPath === href ? "text-slate-100" : ""
        }`}
      >
        {file.type === "folder" ? (
          <Link
            className="inline-flex gap-x-2 items-center"
            href={asPath === href ? href.replace(file.name, "") : href}
          >
            {file.children.length ? (
              asPath.includes(href) ? (
                <FolderMinusIcon className="h-5 w-5 stroke-1" />
              ) : (
                <FolderPlusIcon className="h-5 w-5 stroke-1" />
              )
            ) : (
              <FolderIcon className="h-5 w-5 stroke-1" />
            )}
            {file.name}
          </Link>
        ) : (
          <Link className="inline-flex gap-x-2 items-center" href={href}>
            <FileIcon className="h-5 w-5 stroke-1" />
            {file.name}
          </Link>
        )}
      </summary>
      {file.children.length > 0 && (
        <div className="pl-3 ml-2 border-l border-dotted border-white/10 space-y-3">
          {file.children.map((f) => (
            <FileComponent key={f.name} file={f} href={`${href}/${f.name}`} />
          ))}
        </div>
      )}
    </details>
  );
};
