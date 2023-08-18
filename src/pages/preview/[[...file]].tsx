import { Homepage } from "@components/preview/Homepage";
import { type FileType, buildFileTree, getPaths } from "@utils/preview";

export default function Page({ fileTree }: { fileTree: FileType[] }) {
  return <Homepage fileTree={fileTree} />;
}

export const getStaticPaths = async () => {
  const PATHNAME = "./src/emails";
  const paths = [{ params: { file: [] } }, ...getPaths(PATHNAME)];
  return { paths, fallback: false };
};

export const getStaticProps = async (context: any) => {
  console.log(context);
  const PATHNAME = "./src/emails";
  const { children: fileTree } = buildFileTree(PATHNAME);
  return {
    props: {
      fileTree,
    },
  };
};
