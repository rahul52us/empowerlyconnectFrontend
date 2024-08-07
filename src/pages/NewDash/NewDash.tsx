import { Box, Grid, VStack } from "@chakra-ui/react";
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
import React from "react";

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
  {
    name: "Figma",
    imageUrl: "https://cdn-icons-png.flaticon.com/128/5968/5968705.png",
    title: "Figma UI UX Design",
    academy: "Abcd Academy",
    completion: 64,
    timeLeft: "3 hr 20 min left",
    colorScheme: "purple",
  },
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

const cardColor = ["purple", "orange", "green", "red"];

export default function NewDash() {
  return (
    <Box>
      <Grid templateColumns={"3.3fr 1fr"} columnGap={6}>
        <Box>
          <Grid gap={4} templateColumns={"repeat(4, 1fr)"}>
            {[1, 2, 3, 4].map((item) => (
              <React.Fragment key={item}>
                <NewDashboardCard
                  icon={<IoPeopleSharp fontSize="24px" />}
                  value="1,475"
                  label="No of Students"
                  colorScheme={cardColor[item - 1]}
                  bgColor={{
                    light: `${cardColor[item - 1]}.100`,
                    dark: "gray.700",
                  }}
                />
              </React.Fragment>
            ))}
          </Grid>

          <Grid templateColumns={"1fr 1fr"}  mt={6} gap={4}>
            <StudentActivityChart />
            <QuizScoresChart quizScores={quizcore} />
          </Grid>


        </Box>

        <VStack align={"stretch"} spacing={4}>
          <CalendarApp />
          <UserActivityFeed />
        </VStack>
      </Grid>
      <Grid templateColumns={"1fr 1fr 1fr"} gap={4}  mt={6}>
        {coursesData.map((course, index) => (
          <MyCoursesCard key={index} course={course} />
        ))}
        
      </Grid>
    </Box>
  );
}
