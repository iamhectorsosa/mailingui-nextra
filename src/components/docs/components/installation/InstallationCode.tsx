import * as React from "react";
import { useData } from "nextra/data";
import { CodeBlock } from "../CodeBlock";

export const InstallationCode = () => {
  const { sourceCode } = useData();
  return <CodeBlock code={sourceCode} />;
};
