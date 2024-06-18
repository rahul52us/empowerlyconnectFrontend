import {
  Grid,
  //   IconButton,
  Image,
  Text,
  FormControl,
  FormLabel,
  useColorModeValue,
} from "@chakra-ui/react";

type ProfileCardI = {
  src?: string;
};

function ProfileCard({ src }: ProfileCardI) {
  const bgColor = useColorModeValue("gray.50", "gray.700");
  //   const iconBgColor = useColorModeValue("gray.100", "gray.600");
  const boxShadow = useColorModeValue(
    "0px 0px 11px rgba(0, 0, 0, 0.2)",
    "0px 0px 11px rgba(255, 255, 255, 0.1)"
  );

  const profileData = [
    { label: "Name", value: "Greg Gonzalez" },
    { label: "Gender", value: "Male" },
    { label: "DOB", value: "18/1/2008" },
    { label: "Admission Id", value: "chippi-chippi-chappa" },
    { label: "Admission Date", value: "18/3/2008" },
    { label: "Class", value: "10" },
    { label: "Section", value: "A" },
  ];

  return (
    <Grid templateColumns={{ md: "2fr 1.25fr 1fr" }}>
      <Grid p={4} rounded={12} bg={bgColor} boxShadow={boxShadow}>
        <Grid templateColumns={{ base: "1fr", md: "2fr 3fr" }} gap={2}>
          <Grid
            templateRows={"6fr 1fr"}
            alignItems="center"
            justifyContent={"center"}
          >
            <Image
              rounded={12}
              boxSize={{ base: "295px", md: "220px" }}
              objectFit={"cover"}
              src={
                src ||
                "https://upload.wikimedia.org/wikipedia/commons/4/40/POS17_%40Kristsll-197_%2835166607974%29.jpg"
              }
              alt="Id Photo"
            />
            <Text textAlign={"center"} fontSize={"2xl"} fontWeight={700}>
              Greg Gonzalez
            </Text>
          </Grid>

          <FormControl>
            {profileData.map(({ label, value }) => (
              <Grid
                templateColumns={{ base: "1fr 1fr", md: "2fr 3fr" }}
                gap={2}
                mb={2}
                key={label}
              >
                <FormLabel>{label}:</FormLabel>
                <Text>{value}</Text>
              </Grid>
            ))}
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
}

ProfileCard.defaultProps = {
  title: "My Children_01",
};

export default ProfileCard;
