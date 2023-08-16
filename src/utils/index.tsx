import fs from "fs";
import { getHighlighter, highlight } from "@lib/shiki";
import { render } from "@react-email/render";

type getPropsOptions = {
  type: string;
};

export const getProps = async ({ type }: getPropsOptions) => {
  const highlighter = await getHighlighter();

  // Installation
  const sourceCodeRaw = fs.readFileSync(
    `./src/mailingui/components/${type}/${
      type.charAt(0).toUpperCase() +
      type.slice(1).replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
    }.tsx`,
    "utf8"
  );
  const sourceCode = await highlight(highlighter, sourceCodeRaw, "tsx");

  // Basic Usage
  const Component = (await import(`src/examples/${type}/Demo.tsx`)).default;
  const html = render(<Component />, { pretty: true });
  const demoCodeRaw = fs.readFileSync(
    `./src/examples/${type}/Demo.tsx`,
    "utf8"
  );
  const demoCode = await highlight(highlighter, demoCodeRaw, "tsx");

  // Examples
  const filenames = fs
    .readdirSync(`./src/examples/${type}`)
    .filter((file) => file !== "Demo.tsx");
  const examples = await Promise.all(
    filenames.map(async (file) => {
      const name = file.replace(".tsx", "");
      const Component = (await import(`src/examples/${type}/${file}`)).default;
      const html = render(<Component />, { pretty: true });
      const demoCodeRaw = fs.readFileSync(
        `./src/examples/${type}/${file}`,
        "utf8"
      );
      const demoCode = await highlight(highlighter, demoCodeRaw, "tsx");
      return {
        name,
        type,
        html,
        demoCode,
      };
    })
  );

  return {
    type,
    html,
    demoCode,
    sourceCode,
    examples,
  };
};
