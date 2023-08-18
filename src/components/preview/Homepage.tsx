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
  Undo2Icon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

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
  return (
    <div className="max-h-screen h-screen w-screen flex bg-[#111111] text-slate-100">
      {/* Preview File Explorer */}
      <aside className="w-[300px] bg-stone-900/25 px-5 py-6 space-y-4 hidden lg:block">
        <header>
          <h1 className="font-bold uppercase text-gray-400">Preview Mode</h1>
        </header>
        <span className="text-lg font-bold">src/emails</span>
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
      {/* Preview Toolbar */}
      <div className="flex-1 h-full flex flex-col">
        <nav className="flex justify-between gap-2 p-2">
          <div className="flex items-center gap-4">
            <CTA secondary dynamicWidth={false} compact href="/templates">
              <Undo2Icon />
              <span className="hidden lg:inline">Back Templates</span>
            </CTA>
            <h3 className="text-slate-100 font-medium text-sm inline-flex items-center gap-x-2">
              {isFolder ? (
                <FolderIcon className="h-5 w-5" />
              ) : (
                <FileIcon className="h-5 w-5" />
              )}
              {selectedPath}
            </h3>
          </div>
          <div className="items-center gap-4 hidden lg:flex opacity-50">
            <div className="bg-stone-900 rounded-full p-2">
              <button className="brand-gradient rounded-full gap-x-2 px-2 h-9 hover:bg-stone-800">
                <EyeIcon />
              </button>
              <button className="rounded-full gap-x-2 px-2 h-9 hover:bg-stone-800">
                <Code2Icon />
              </button>
            </div>
            <CTA compact dynamicWidth={false} href="/docs/guide/introduction">
              <MailIcon />
              <span className="hidden lg:inline">Send</span>
            </CTA>
          </div>
        </nav>
        {/* Preview Pane */}
        <div className="h-full">
          <iframe
            className="w-full h-full"
            id={selectedPath}
            title={selectedPath}
            srcDoc={html}
          />
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
