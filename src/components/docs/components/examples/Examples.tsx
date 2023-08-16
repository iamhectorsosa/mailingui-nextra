import { Tabs, Tab } from "nextra/components";
import { ExamplePreview } from "./ExamplePreview";
import { ExampleCode } from "./ExampleCode";
import { useData } from "nextra/data";

type Example = {
  name: string;
  type: string;
  html: string;
  demoCode: string;
};

export const Examples = () => {
  const { examples } = useData() as { examples: Example[] };
  return (
    <>
      {examples.map((example, id: number) => (
        <div key={id}>
          <h3 className="nx-font-semibold nx-tracking-tight nx-text-slate-900 dark:nx-text-slate-100 nx-mt-8 nx-text-2xl">{transformComponentName(example.name)}</h3>
          <Tabs items={["Preview", "Code"]}>
            <Tab>
              <ExamplePreview type={example.type} html={example.html} />
            </Tab>
            <Tab>
              <ExampleCode code={example.demoCode} />
            </Tab>
          </Tabs>
        </div>
      ))}
    </>
  );
};

function transformComponentName(componentName: string): string {
  const transformedName = componentName
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert space between lowercase and uppercase letters
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2"); // Insert space between uppercase letters followed by lowercase letter

  return transformedName;
}
