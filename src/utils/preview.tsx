import fs from "fs";
import path from "path";
import { getHighlighter, highlight } from "./shiki";
import { render } from "@react-email/components";

interface PathObject {
  params: { file: string[] };
}

const ROOT_PATH = "./src/emails";

export function getPaths(
  currentPath: string = ""
): PathObject[] {
  const fullPath = path.join(ROOT_PATH, currentPath);
  const contents = fs.readdirSync(fullPath);

  const paths: PathObject[] = [];

  if (currentPath !== "") {
    paths.push({ params: { file: currentPath.split(path.sep) } });
  }

  for (const item of contents) {
    const itemPath = path.join(currentPath, item);
    const itemFullPath = path.join(ROOT_PATH, itemPath);
    const stats = fs.statSync(itemFullPath);

    if (stats.isDirectory()) {
      paths.push(...getPaths(itemPath));
    } else if (stats.isFile()) {
      paths.push({ params: { file: itemPath.split(path.sep) } });
    }
  }

  return [{ params: { file: [] } }, ...paths];
}

export type FileType = {
  name: string;
  type: "folder" | "file";
  children: FileType[];
};

export function buildFileTree(
  currentPath: string = ""
): FileType {
  const fullPath = path.join(ROOT_PATH, currentPath);
  const contents = fs.readdirSync(fullPath);

  const fileTree: FileType = {
    name: currentPath === "" ? "root" : path.basename(currentPath),
    type: "folder",
    children: [],
  };

  for (const item of contents) {
    const itemPath = path.join(currentPath, item);
    const itemFullPath = path.join(ROOT_PATH, itemPath);
    const stats = fs.statSync(itemFullPath);

    if (stats.isDirectory()) {
      const subTree = buildFileTree(itemPath);
      fileTree.children.push(subTree);
    } else if (stats.isFile()) {
      const fileNode: FileType = {
        name: item,
        type: "file",
        children: [],
      };
      fileTree.children.push(fileNode);
    }
  }

  return fileTree;
}

type Params = { file: string[] };

export const getPreviewProps = async (params: Params) => {
  const highlighter = await getHighlighter();
  const path = params?.file?.join("/");
  const selectedPath = params?.file?.at(-1) ?? "Select a template";
  const isFolder = !selectedPath.includes(".tsx");
  const { children: fileTree } = buildFileTree();
  let html = "";
  let sourceCode = "";
  if (path && !isFolder) {
    const Component = (await import(`src/emails/${path}`)).default;
    html = render(<Component />, { pretty: true });
    const sourceCodeRaw = fs.readFileSync(`${ROOT_PATH}/${path}`, "utf8");
    sourceCode = await highlight(highlighter, sourceCodeRaw, "tsx");
  }

  return {
    fileTree,
    selectedPath,
    isFolder,
    html,
    sourceCode,
  };
};
