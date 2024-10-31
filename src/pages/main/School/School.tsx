import { Box, Center, Image } from "@chakra-ui/react";
import React, {
  useRef,
  useState,
  useEffect,
  Suspense,
  createContext,
  useContext,
} from "react";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { GiLaurelsTrophy } from "react-icons/gi";
import { imageUrls } from "./Constant/constants";
import { largeHeaderHeight } from "./layout/common/constant";
import { useQueryParams } from "../../../config/component/customHooks/useQuery";
import WebLoader from "../../../config/component/Loader/WebLoader";
import { observer } from "mobx-react-lite";
import store from "../../../store/store";
import { useParams } from "react-router-dom";

// Lazy-loaded components
const Contact = React.lazy(() => import("./component/ContactUs/Contact"));
const AboutSection = React.lazy(
  () => import("./component/AboutSection/AboutSection")
);
const GallerySection = React.lazy(
  () => import("./component/GallerySection/GallerySection")
);
const HeroCarousal = React.lazy(
  () => import("./component/HeroCarousal/HeroCarousal")
);
const MapSection = React.lazy(
  () => import("./component/MapSection/MapSection")
);
const Navbar = React.lazy(() => import("./layout/Navbar/Navbar"));
const PrincipalSection = React.lazy(
  () => import("./component/PrincipalSection/PrincipalSection")
);
const TopperSlider = React.lazy(
  () => import("./component/ToppersCard/TopperSlider")
);
const StatisticsCounter = React.lazy(
  () => import("./component/StatisticsCounter/StatisticsCounter")
);
const TeacherSection = React.lazy(
  () => import("./component/TeacherSection/TeacherSection")
);
const SchoolFeatureSection = React.lazy(
  () => import("./component/SchoolFeatureSection/SchoolFeatureSection")
);
const FaqSection = React.lazy(
  () => import("./component/FaqSection/FaqSection")
);
const CurriculumSection = React.lazy(
  () => import("./component/curriculumSection/CurriculumSection")
);
const TestimonialsSection = React.lazy(
  () => import("./component/TestimonialSection/TestimonialSection")
);

// Metrics data
interface Metric {
  id: number;
  label: string;
  target: number;
  icon: React.ElementType;
}

// Section configuration
interface SectionConfig {
  id: string;
  component: React.FC<any>;
  props: any;
}

// Create a context for sections and colors
const SectionColorContext = createContext<any>(null);

const metrics: Metric[] = [
  { id: 1, label: "Students", target: 1500, icon: FaUserGraduate },
  { id: 2, label: "Teachers", target: 100, icon: FaChalkboardTeacher },
  { id: 3, label: "Awards", target: 30, icon: GiLaurelsTrophy },
];

const initialSectionsConfig: SectionConfig[] = [
  { id: "hero", component: HeroCarousal, props: {} },
  { id: "about", component: AboutSection, props: {} },
  { id: "principal", component: PrincipalSection, props: {} },
  { id: "curriculum", component: CurriculumSection, props: {} },
  { id: "statistics", component: StatisticsCounter, props: { metrics } },
  { id: "topper", component: TopperSlider, props: {} },
  { id: "teachers", component: TeacherSection, props: {} },
  { id: "features", component: SchoolFeatureSection, props: {} },
  { id: "gallery", component: GallerySection, props: { images: imageUrls } },
  { id: "testimonial", component: TestimonialsSection, props: {} },
  { id: "faq", component: FaqSection, props: {} },
  { id: "contact", component: Contact, props: {} },
  { id: "map", component: MapSection, props: {} },
];

const School = observer(() => {
  const [fetchData, setFetchData] = useState({
    loading: true,
    data: {},
  });

  const { title } = useParams();
  const {
    WebTemplateStore: { getWebTemplate },
    auth: { openNotification },
  } = store;
  const { getQueryParam } = useQueryParams();

  const [sectionColorSettings, setSectionColorSettings] = useState<any>({
    sectionLayout: [],
    sections: initialSectionsConfig,
    colors: {
      headingColor: { light: "teal.500", dark: "teal.300" },
      subHeadingColor: { light: "gray.600", dark: "gray.400" },
    },
    websiteMode: null,
  });

  const sectionRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>(
    initialSectionsConfig.reduce((acc, section) => {
      acc[section.id] = React.createRef<HTMLDivElement>();
      return acc;
    }, {} as Record<string, React.RefObject<HTMLDivElement>>)
  );

  useEffect(() => {
    setFetchData({ loading: true, data: {} });
    getWebTemplate(title)
      .then((dt: any) => {
        const orderedSections = dt.data?.sectionsLayout
          .map((preferenceId: any) => {
            const section = initialSectionsConfig.find(
              (section) => section.id === preferenceId.page
            );
            if (section) {
              return {
                ...section,
                props: dt?.data?.webInfo?.sections[section.id],
              };
            }
            return undefined;
          })
          .filter(
            (section: any): section is SectionConfig => section !== undefined
          );

        setSectionColorSettings((prev: any) => ({
          ...prev,
          sections: dt?.data?.webInfo?.sections,
          sectionLayout: orderedSections,
          colors: dt.data?.webInfo?.colorSetting,
          websiteMode: getQueryParam("mode") ? true : false,
        }));
        setFetchData({ loading: false, data: dt?.data });
      })
      .catch(() => {
        setFetchData({ loading: false, data: {} });
        // openNotification({
        //   title: "GET TEMPLATE SUCCESSFULLY",
        //   message: err.message,
        //   type: "error",
        // });
      })
      .finally(() => {});
  }, [openNotification]);

  const scrollToSection = (sectionId: string) => {
    const ref = sectionRefs.current[sectionId];
    if (ref && ref.current) {
      const navbarHeight = 60;
      const sectionTop =
        ref.current.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: sectionTop, behavior: "smooth" });
    }
  };

  const activeSectionIds = sectionColorSettings.sectionLayout.map((section : any) => section.id);

  return (fetchData.loading === false &&
    Object.keys(fetchData.data || {}).length === 0) ? (
    <Center mt={'25vh'}>
    <Image src="/img/emptyData.jpg" alt="" w={350} h={350} borderRadius={50}/>
    </Center>
  ) : fetchData.loading === false ? (
    <SectionColorContext.Provider value={sectionColorSettings}>
      <Suspense fallback={<WebLoader />}>
        <Box>
          <Navbar
            scrollToSection={scrollToSection}
            linksConfig={activeSectionIds.map((item : any) => ({
              id: item,
              name: item.charAt(0).toUpperCase() + item.slice(1),
            }))}
            colors={sectionColorSettings.colors}
          />
          <Box marginTop={largeHeaderHeight}>
            {sectionColorSettings.sectionLayout
              .filter(({ id }: any) => activeSectionIds.includes(id))
              .map(({ id, component: Component, props }: any) => {
                let sectionProps = {
                  ...props,
                  content: props,
                  webColor: sectionColorSettings.colors,
                  colors: sectionColorSettings.colors,
                };

                if (id === "curriculum") {
                  sectionProps = {
                    ...props,
                    colors: {
                      ...sectionColorSettings.colors,
                      titleColor:
                        sectionColorSettings.colors.curriculumTitleColor,
                      sectionBgColor:
                        sectionColorSettings.colors.curriculumSectionBgColor,
                      borderColor:
                        sectionColorSettings.colors.curriculumBorderColor,
                      textColor:
                        sectionColorSettings.colors.curriculumTextColor,
                    },
                  };
                }

                if (id === "statistics") {
                  sectionProps = {
                    ...props,
                    backgroundImage:
                      sectionColorSettings.colors.statisticsBackgroundImage,
                  };
                }

                return (
                  <Box key={id} ref={sectionRefs.current[id]} my={7} id={id}>
                    <Component {...sectionProps} />
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Suspense>
    </SectionColorContext.Provider>
  ) : (
    <WebLoader />
  );
});

// Custom hooks to use the context
export const useSectionColorContext = () => useContext(SectionColorContext);

export default School;
