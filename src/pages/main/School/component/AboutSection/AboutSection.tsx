import { Suspense, lazy } from "react";

const loadComponent = (key: string) => {
  switch (key) {
    case "about1":
      return lazy(() => import("./component/About1/About1"));
    case "about2":
      return lazy(() => import("./component/About2/About2"));
    default:
      return lazy(() => import("./component/About1/About1"));
  }
};

const AboutSection = ({
  content,
  setContent,
  webColor,
  selectedLayout,
  isEditable = false,
}: any) => {
  const Component = loadComponent(selectedLayout?.key);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component
        content={content}
        setContent={setContent}
        webColor={webColor}
        isEditable={isEditable}
      />
    </Suspense>
  );
};

export default AboutSection;
