import Faq1 from "./component/Faq1"

const FaqSection = ({ setContent, content, webColor }: any) => {
  return (
    <Faq1 content={content} setContent={setContent} webColor={webColor} />
  )
}

export default FaqSection