import fs from 'fs';
import path from 'path';

interface PathObject {
  params: { file: string[] };
}

export function getPaths(rootPath: string, currentPath: string = ''): PathObject[] {
  const fullPath = path.join(rootPath, currentPath);
  const contents = fs.readdirSync(fullPath);

  const paths: PathObject[] = [];

  if (currentPath !== '') {
    paths.push({ params: { file: currentPath.split(path.sep) } });
  }

  for (const item of contents) {
    const itemPath = path.join(currentPath, item);
    const itemFullPath = path.join(rootPath, itemPath);
    const stats = fs.statSync(itemFullPath);

    if (stats.isDirectory()) {
      paths.push(...getPaths(rootPath, itemPath));
    } else if (stats.isFile()) {
      paths.push({ params: { file: itemPath.split(path.sep) } });
    }
  }

  return paths;
}

export type FileType = {
  name: string;
  type: "folder" | "file";
  children: FileType[];
};

export function buildFileTree(rootPath: string, currentPath: string = ''): FileType {
  const fullPath = path.join(rootPath, currentPath);
  const contents = fs.readdirSync(fullPath);

  const fileTree: FileType = {
    name: currentPath === '' ? 'root' : path.basename(currentPath),
    type: 'folder',
    children: []
  };

  for (const item of contents) {
    const itemPath = path.join(currentPath, item);
    const itemFullPath = path.join(rootPath, itemPath);
    const stats = fs.statSync(itemFullPath);

    if (stats.isDirectory()) {
      const subTree = buildFileTree(rootPath, itemPath);
      fileTree.children.push(subTree);
    } else if (stats.isFile()) {
      const fileNode: FileType = {
        name: item,
        type: 'file',
        children: []
      };
      fileTree.children.push(fileNode);
    }
  }

  return fileTree;
}