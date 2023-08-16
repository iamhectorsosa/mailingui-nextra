import fs from "fs";
import { getHighlighter, highlight } from "@lib/shiki";
import { render } from "@react-email/render";

type getPropsOptions = {
  type: string;
};

export const getProps = async ({ type }: getPropsOptions) => {
  const highlighter = await getHighlighter();

  const sourceCodeRaw = fs.readFileSync(
    `./src/mailingui/components/${type}/${type.charAt(0).toUpperCase() + type.slice(1).replace(/-(\w)/g, (_, letter) => letter.toUpperCase())}.tsx`,
    "utf8"
  );
  const sourceCode = await highlight(highlighter, sourceCodeRaw, "tsx");

  const Component = (await import(`src/examples/${type}/Demo.tsx`)).default;

  const html = render(<Component />, { pretty: true });

  const demoCodeRaw = fs.readFileSync(
    `./src/examples/${type}/Demo.tsx`,
    "utf8"
  );
  const demoCode = await highlight(highlighter, demoCodeRaw, "tsx");

  return {
    type,
    html,
    demoCode,
    sourceCode,
  };
};
