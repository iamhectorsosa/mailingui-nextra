import { Homepage } from "@components/preview/Homepage";
import { render } from "@react-email/components";
import { type FileType, buildFileTree, getPaths } from "@utils/preview";

export default function Page({
  fileTree,
  selectedPath,
  isFolder,
  html
}: {
  fileTree: FileType[];
  selectedPath: string;
  isFolder: boolean;
  html: string
}) {
  return (
    <Homepage
      fileTree={fileTree}
      selectedPath={selectedPath}
      isFolder={isFolder}
      html={html}
    />
  );
}

export const getStaticPaths = async () => {
  const PATHNAME = "./src/emails";
  const paths = [{ params: { file: [] } }, ...getPaths(PATHNAME)];
  return { paths, fallback: false }; 
};

export const getStaticProps = async ({ params }: any) => {
  const path = params?.file?.join("/");
  const selectedPath = params?.file?.at(-1) ?? "Select a template";
  const isFolder = !selectedPath.includes(".tsx");
  const PATHNAME = "./src/emails";
  const { children: fileTree } = buildFileTree(PATHNAME);
  let html = '';
  if (path && !isFolder) {
    const Component = (await import(`src/emails/${path}`)).default;
    html = render(<Component />, { pretty: true });
  }
  return {
    props: {
      fileTree,
      selectedPath,
      isFolder,
      html
    },
  };
};
