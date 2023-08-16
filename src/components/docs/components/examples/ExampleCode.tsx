import * as React from "react";
import { CodeBlock } from "../CodeBlock";

export const ExampleCode = ({ code }: { code: string }) => {
  return <CodeBlock code={code} />;
};
