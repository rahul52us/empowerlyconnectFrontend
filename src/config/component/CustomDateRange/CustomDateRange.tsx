import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./CustomDateRangeMobile.css";
import "./CustomDateRangePicker.css";
import { DateRange, DateRangePicker } from "react-date-range";
import format from "date-fns/format";
import {
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useBreakpointValue,
} from "@chakra-ui/react";

interface CustomDateRangeProps {
  startDate: any;
  endDate: any;
  onStartDateChange: (startDate: Date) => void;
  onEndDateChange: (endDate: Date) => void;
  isMobile?: boolean;
  months?: number;
}

export default function CustomDateRange({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  isMobile = false,
  months = 2,
}: CustomDateRangeProps): JSX.Element {

  const LargerThanMd = useBreakpointValue({ md: true });

  return (isMobile || !LargerThanMd ) ? (
    <Popover placement="auto-end">
      <PopoverTrigger>
        <Input
          name="datePicker"
          value={`${format(startDate, "dd/MM/yyyy")} to ${format(
            endDate,
            "dd/MM/yyyy"
          )}`}
          width={{ base: "14rem", lg: "14rem" }}
          textAlign="center"
        />
      </PopoverTrigger>
      <PopoverContent width="auto">
        <PopoverBody>
          <DateRange
            onChange={(item: any) => {
              onStartDateChange(item.selection.startDate);
              onEndDateChange(item.selection.endDate);
            }}
            showPreview={true}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={[
              {
                startDate: startDate,
                endDate: endDate,
                key: "selection",
              },
            ]}
            months={1}
            direction="horizontal"
            className="calendarElementMobile"
            rangeColors={["#38B2AC"]}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  ) : (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Input
          name="datePicker"
          value={`${format(startDate, "dd/MM/yyyy")} to ${format(
            endDate,
            "dd/MM/yyyy"
          )}`}
          width={{ lg: "18rem" }}
          textAlign="center"
        />
      </PopoverTrigger>
      <PopoverContent width="auto">
        <PopoverBody>
          <DateRangePicker
            onChange={(item: any) => {
              onStartDateChange(item.selection.startDate);
              onEndDateChange(item.selection.endDate);
            }}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            showPreview={true}
            ranges={[
              {
                startDate: startDate,
                endDate: endDate,
                key: "selection",
              },
            ]}
            months={months}
            direction="horizontal"
            className="calendarElement"
            rangeColors={["#38B2AC"]}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
