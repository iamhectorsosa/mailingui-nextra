import { Homepage } from "@components/preview/Homepage";
import { type FileType, getPaths, getPreviewProps } from "@utils/preview";

export default function Page({
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
}) {
  return (
    <Homepage
      fileTree={fileTree}
      selectedPath={selectedPath}
      isFolder={isFolder}
      html={html}
      sourceCode={sourceCode}
    />
  );
}

export const getStaticPaths = async () => {
  const paths = getPaths();
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: any) => {
  const props = await getPreviewProps(params);
  return { props };
};
