import { Box, Grid, SimpleGrid } from "@chakra-ui/react";
import MyCoursesCard from "./MyCourseCard";
import StudentActivityChart from "./StudentActivityChart";
// import NewDashboardCard from "./Cards/NewDashboardCard";
import { IoPeopleSharp } from "react-icons/io5";
import { NewDashboardCard } from "./Cards/NewDashboardCard";
import QuizScoresChart from "./Charts/QuizScoreChart";
// import UserActivityFeed from "./UserActivityFeed";
// import TodayActivityCalendar from "./Cards/UserProfileCard";
import UserActivityFeed from "./UserActivityFeed";
// import DynamicCalendar from "./Timeline";
import CalendarApp from "./Timeline";

const coursesData = [
  {
    name: "Figma",
    imageUrl: "https://cdn-icons-png.flaticon.com/128/5968/5968705.png",
    title: "Figma UI UX Design",
    academy: "Abcd Academy",
    completion: 64,
    timeLeft: "3 hr 20 min left",
    colorScheme: "purple",
  },
];

const quizcore = [
  { label: "quiz1", data: 30 },
  { label: "he he", data: 20 },
  { label: "quiz3", data: 75 },
  { label: "quiz4", data: 45 },
];

export default function NewDash() {
  return (
    <Box>
      <Grid templateColumns={"2fr 1fr"} gap={8}>
        {coursesData.map((course, index) => (
          <MyCoursesCard key={index} course={course} />
        ))}
        <StudentActivityChart />
        {/* <TodayActivityCalendar activities={activities} /> */}
        <UserActivityFeed/>
        <CalendarApp />
        {/* <DynamicCalendar /> */}
      </Grid>
      <SimpleGrid columns={2}>
        <NewDashboardCard
          icon={<IoPeopleSharp fontSize="24px" />}
          value="1,475"
          label="No of Students"
          colorScheme="purple"
          bgColor={{ light: "purple.100", dark: "gray.700" }}
        />
        <Box>
          <QuizScoresChart quizScores={quizcore} />
          {/* <StudentPerformanceTracker performanceData={performanceData} /> */}
        </Box>
      </SimpleGrid>
    </Box>
  );
}
