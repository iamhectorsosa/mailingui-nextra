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

export const Homepage = ({
  fileTree,
  selectedPath,
  isFolder,
  html,
}: {
  fileTree: FileType[];
  selectedPath: string;
  isFolder: boolean;
  html?: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div className="max-h-screen h-screen w-screen flex bg-[#111111] text-slate-100 relative">
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
      <div className="flex-1 flex flex-col h-full w-full">
        <nav className="flex w-full items-center justify-between gap-2 p-2 h-24 border-b border-white/10 px-6">
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
          <div className="items-center gap-x-4 hidden lg:flex opacity-50">
            <div className="bg-stone-900 rounded-full p-1.5">
              <button className="brand-gradient rounded-full gap-x-2 px-1.5 h-8 hover:bg-stone-800">
                <EyeIcon className="h-5 w-5" />
              </button>
              <button className="rounded-full gap-x-2 px-1.5 h-8 hover:bg-stone-800">
                <Code2Icon className="h-5 w-5" />
              </button>
            </div>
            <CTA compact dynamicWidth={false} href="/docs/guide/introduction">
              <MailIcon />
              <span className="hidden lg:inline">Send</span>
            </CTA>
          </div>
        </nav>
        {/* Preview Pane */}
        <div className="flex-1 ">
          {!isFolder && (
            <iframe
              className="w-full h-full"
              id={selectedPath}
              title={selectedPath}
              srcDoc={html}
            />
          )}
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
