import {
  Box,
  Image,
  Card,
  Heading,
  Flex,
  Text,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import styled from "styled-components";
import { BiBookmark } from "react-icons/bi";
import { useState } from "react";
import { observer } from "mobx-react-lite";

const ThumbnailWrapper = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
`;

const ThumbnailElementNoImage = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: lightgray;
`;

const ThumbnailCard = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: lightgray;
`;

const TripCard = observer(({ setTripFormData, item, handleClick }: any) => {
  const [thumbnailLoadError, setThumbnailLoadError] = useState(false);
  const bookmarkColor = useColorModeValue("gray.600", "gray.500");
  const { title, description, thumbnail } = item;

  return (
    <Card p={2} borderRadius="8px" overflow="hidden">
      <ThumbnailWrapper>
        {thumbnailLoadError ? (
          <ThumbnailElementNoImage />
        ) : (
          <ThumbnailCard
            src={thumbnail?.url}
            alt={thumbnail?.name || "Image Not Found"}
            onError={() => {
              setThumbnailLoadError(true);
            }}
          />
        )}
      </ThumbnailWrapper>
      <Flex mt={5} justify="space-between" alignItems="center">
        <IconButton
          icon={<BiBookmark />}
          aria-label="Bookmark"
          borderRadius={20}
          title="Bookmark"
        />
      </Flex>
      <Flex mt={3} justifyContent="space-between" alignItems="center">
        <Heading
          fontSize="lg"
          cursor="pointer"
          color={bookmarkColor}
          _hover={{ color: "blue" }}
          transition="0.5s ease-in-out"
          onClick={() => {
            handleClick && handleClick(item);
            setTripFormData({ open: true, data: item, type: "edit" });
          }}
        >
          {title}
        </Heading>
      </Flex>
      <Text
        textAlign="start"
        mt={4}
        mb={1}
        color="gray.500"
        fontSize="sm"
        noOfLines={2}
      >
        {description}
      </Text>
      <Text mt={2} fontSize="sm" color="gray.500">
        Total Travels {item?.travelDetails?.length}
      </Text>
    </Card>
  );
});

export default TripCard;
