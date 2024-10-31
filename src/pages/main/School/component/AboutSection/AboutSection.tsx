import About1 from "./component/About1/About1";

const AboutSection = ({
  content,
  setContent,
  webColor,
  isEditable = false,
}: any) => {


  return (
    <About1
      content={content}
      setContent={setContent}
      webColor={webColor}
      isEditable={isEditable}
    />
  );
};

export default AboutSection;
