import React, { useState, useCallback, useEffect } from "react";
import {
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  VStack,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import CustomInput from "../CustomInput/CustomInput";

interface DropdownOption {
  value: string;
  label: string;
}

interface Dropdown {
  label: string;
  options: DropdownOption[];
  placeholder?: string;
}

interface MultiDropdownProps {
  search?: any;
  title?: string;
  dropdowns: Dropdown[];
  selectedOptions: { [key: string]: DropdownOption[] };
  onDropdownChange: (value: any, label: string) => void;
  onApply: () => void;
  resetFilters?: any;
  minH?: any;
}

const MultiDropdown = ({
  search,
  title,
  dropdowns,
  selectedOptions,
  onDropdownChange,
  onApply,
  resetFilters,
}: MultiDropdownProps) => {
  const [inputValue, setInputValue] = useState(search?.searchValue || "");
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  useEffect(() => {
    const debouncedHandler = debounce((value: string) => {
      if(search?.onSearchChange){
        search?.onSearchChange(value);
      }
    }, 1000);

    const timeoutId = setTimeout(() => {
      debouncedHandler(inputValue);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue, search]);


  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
    },
    [setInputValue]
  );

  const resetFilterss = () => {
    resetFilters();
    setInputValue("");
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      onClose={handlePopoverClose}
      placement="bottom-start"
    >
      <PopoverTrigger>
        <Button
          fontSize="sm"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          variant="outline"
          border="2px solid"
          borderColor="teal.300"
          bg="white"
          // color="gray.600"
          _hover={{ bg: "teal.400", borderColor: "teal.400", color: "white" }}
        >
          {title ? title : "Apply Filter"}
        </Button>
      </PopoverTrigger>
      <PopoverContent p={3} bg="white" borderColor="gray.300" boxShadow="md">
        <PopoverHeader
          mt={-1}
          fontWeight="bold"
          borderBottomWidth="1px"
          color="teal.400"
        >
          Select Options
        </PopoverHeader>
        <PopoverBody>
          <VStack rowGap={1} align="stretch">
            {search && search?.visible && (
              <Input
                placeholder={search?.placeholder || "Search"}
                value={inputValue}
                onChange={handleInputChange}
                borderRadius="md"
                bg="white"
                borderColor="gray.300"
                _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
              />
            )}
            {dropdowns.map((dropdown: Dropdown, index: number) => {
              return (
                <CustomInput
                  label={dropdown.label}
                  isClear
                  isSearchable={false}
                  name="select"
                  type="select"
                  isMulti={true}
                  key={index}
                  options={dropdown.options}
                  placeholder={dropdown.placeholder || "Select Option"}
                  value={selectedOptions[dropdown.label] || null}
                  onChange={(selected : any) => {
                    onDropdownChange(selected, dropdown.label);
                  }}
                />
              );
            })}
            <Button
              colorScheme="teal"
              // _hover={{ bg: "blue.500" }}
              onClick={() => {
                onApply();
                handlePopoverClose();
              }}
              mt={2}
            >
              Apply
            </Button>
            {resetFilters && (
              <Button
                variant="outline"
                mt={1}
                onClick={() => resetFilterss()}
                // bg="white"
                // color="teal.500"
                border="2px solid"
                // borderColor="teal.400"
                colorScheme="red"
                // _hover={{ bg: "teal.50" }}
              >
                Reset Filter
              </Button>
            )}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default MultiDropdown;
