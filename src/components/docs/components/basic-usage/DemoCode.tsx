import * as React from "react";
import { useData } from "nextra/data";
import { CodeBlock } from "../CodeBlock";

export const DemoCode = () => {
  const { demoCode } = useData();
  return <CodeBlock code={demoCode} />;
};
