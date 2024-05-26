import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  useBreakpointValue,
  Tooltip,
  Flex,
  Heading,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
} from "@chakra-ui/react";
import TableLoader from "./TableLoader";
import { formatDate } from "../../constant/dateUtils";
import Pagination from "../pagination/Pagination";
import { MdAddCircleOutline, MdEdit, MdUndo } from "react-icons/md";
import { FiTrash } from "react-icons/fi";
import CustomDateRange from "../CustomDateRange/CustomDateRange";
import MultiDropdown from "../multiDropdown/MultiDropdown";
import { BiComment, BiInfoSquare, BiSearch } from "react-icons/bi";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { FaEye } from "react-icons/fa";

interface Column {
  headerName: string;
  key: string;
  type?: string;
  function?: any;
  addkey?: any;
  props?: any;
}

interface RowData {
  [key: string]: any;
}

interface searchProps {
  show: boolean;
  searchValue: any;
  onSearchChange: any;
}

interface CustomTableProps {
  title?: string;
  columns: Column[];
  data: RowData[];
  serial?: any;
  loading: boolean;
  totalPages?: number;
  actions?: any;
  extraProps?: any;
  search?: searchProps;
}

interface TableActionsProps {
  actions: any;
  column: any;
  row: any;
}

const Approvals = ({ row, column }: TableActionsProps) => {
  return (
    <Td>
      <Flex justify="center">
        {Array.isArray(row[column.key]) ? (
          <Tooltip
            label={
              <>
                {row[column.key].map((item: any, index: number) => (
                  <Box key={index}>{item.reason}</Box>
                ))}
              </>
            }
          >
            <IconButton aria-label="Comments" borderRadius={"50%"}>
              <BiComment />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip label={"No Remarks Found"}>
            <IconButton aria-label="Comments" borderRadius={"50%"}>
              <BiComment />
            </IconButton>
          </Tooltip>
        )}
      </Flex>
    </Td>
  );
};

const TableActions: React.FC<TableActionsProps> = ({
  actions,
  column,
  row,
}) => {
  if (!actions) {
    actions = {};
  }
  const { actionBtn } = actions;
  return (
    <Td {...column?.props?.row}>
      <Flex columnGap={2} justifyContent="center">
        {actionBtn?.viewKey?.showViewButton && (
          <IconButton
            // size="sm"
            // p={0}
            borderRadius={"50%"}
            onClick={() => {
              if (actionBtn?.addKey?.function) actionBtn?.viewKey.function(row);
            }}
            aria-label=""
            title={
              actionBtn?.viewKey?.title
                ? actionBtn?.viewKey?.title
                : "View Data"
            }
          >
            <FaEye />
          </IconButton>
        )}
        {actionBtn?.editKey?.showEditButton && (
          <IconButton
            // size="sm"
            // p={0}
            borderRadius={"50%"}
            onClick={() => {
              if (actionBtn?.editKey?.function)
                actionBtn?.editKey.function(row);
            }}
            aria-label=""
            title={
              actionBtn?.editKey?.title
                ? actionBtn?.editKey?.title
                : "Edit Data"
            }
          >
            <MdEdit />
          </IconButton>
        )}
        {actionBtn?.deleteKey?.showDeleteButton && (
          <IconButton
            // size="sm"
            // p={0}
            borderRadius={"50%"}
            onClick={() => {
              if (actionBtn?.addKey?.function)
                actionBtn?.deleteKey.function(row);
            }}
            aria-label=""
            title={
              actionBtn?.deleteKey?.title
                ? actionBtn?.deleteKey?.title
                : "Delete Data"
            }
          >
            <FiTrash />
          </IconButton>
        )}
      </Flex>
    </Td>
  );
};

const GenerateRows: React.FC<{
  column: Column;
  row: RowData;
  action: any;
}> = ({ column, row, action }) => {
  switch (column.type) {
    case "date":
      return (
        <Td
          whiteSpace="normal"
          cursor="pointer"
          fontSize="sm"
          {...column?.props?.row}
        >
          {row[column.key] ? formatDate(row[column.key]) : "--"}
        </Td>
      );
    case "link":
      return (
        <Td
          whiteSpace="normal"
          cursor="pointer"
          fontSize="sm"
          color="blue.400"
          textDecoration="underline"
          {...column?.props?.row}
          onClick={() => {
            if (column?.function) {
              column?.function(row);
            }
          }}
        >
          {row[column.key] || "--"}
        </Td>
      );
    case "tooltip":
      return (
        <Td
          whiteSpace="normal"
          cursor="pointer"
          fontSize="sm"
          {...column?.props?.row}
        >
          <Tooltip label={row[column.key]}>
            {typeof row[column.key] === "string"
              ? row[column.key].substring(0, 15) || "--"
              : "-"}
          </Tooltip>
        </Td>
      );
    case "array":
      return (
        <Td
          whiteSpace="normal"
          cursor="pointer"
          fontSize="sm"
          {...column?.props?.row}
        >
          <Tooltip label={JSON.stringify(row[column.key])}>
            <IconButton aria-label="" borderRadius={"50%"} fontSize="sm">
              <BiInfoSquare />
            </IconButton>
          </Tooltip>
        </Td>
      );
    case "table-actions":
      return <TableActions actions={action} column={column} row={row} />;
    case "approvals":
      return <Approvals actions={action} column={column} row={row} />;
    case "combineKey":
      return (
        <Td
          whiteSpace="normal"
          cursor="pointer"
          fontSize="sm"
          {...column?.props?.row}
          isTruncated={true}
        >
          {row[column.key] || "--"}
        </Td>
      );
    default:
      return (
        <Td
          whiteSpace="normal"
          cursor="pointer"
          fontSize="sm"
          {...column?.props?.row}
          isTruncated={true}
        >
          {row[column.key] || "--"}
        </Td>
      );
  }
};

const CustomTable: React.FC<CustomTableProps> = ({
  title,
  columns,
  data,
  serial,
  loading,
  actions,
  search,
  extraProps,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Box border="3px solid lightgray" borderRadius={5} pb={2} shadow="lg">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        p={title ? 4 : 0}
        borderRadius="md"
        columnGap={2}
      >
        <Heading fontSize={isMobile ? "sm" : "xl"}>{title || ""}</Heading>
        <Flex alignItems="center" columnGap={2}>
          {actions?.datePicker?.show && actions?.datePicker?.date && (
            <Box display={isMobile ? "none" : undefined}>
              <CustomDateRange
                isMobile={actions?.datePicker?.isMobile}
                startDate={actions?.datePicker?.date.startDate}
                endDate={actions?.datePicker?.date.endDate}
                onStartDateChange={(e) => {
                  if (actions?.datePicker?.onDateChange) {
                    actions?.datePicker?.onDateChange(e, "startDate");
                  }
                }}
                onEndDateChange={(e) => {
                  if (actions?.datePicker?.onDateChange) {
                    actions?.datePicker?.onDateChange(e, "endDate");
                  }
                }}
              />
            </Box>
          )}
          {search?.show && (
            <Box>
              <Input
                placeholder="Search"
                fontSize="sm"
                value={search.searchValue}
                onChange={search.onSearchChange}
              />
            </Box>
          )}
          {actions?.multidropdown?.show && (
            <Box display={isMobile ? "none" : undefined}>
              <MultiDropdown
                title={actions?.multidropdown?.title}
                dropdowns={actions?.multidropdown?.dropdowns || []}
                onDropdownChange={actions?.multidropdown?.onDropdownChange}
                selectedOptions={actions?.multidropdown?.selectedOptions}
                onApply={actions?.multidropdown?.onApply}
                search={{
                  visible: actions?.multidropdown?.search?.visible,
                  placeholder: actions?.multidropdown?.search?.placeholder,
                  searchValue: actions?.multidropdown?.search?.searchValue,
                  onSearchChange:
                    actions?.multidropdown?.search?.onSearchChange,
                }}
              />
            </Box>
          )}
          {actions?.applyFilter?.show && (
            <IconButton
              aria-label="Apply Filter"
              onClick={() => actions?.applyFilter?.function?.()}
            >
              <BiSearch />
            </IconButton>
          )}

          {/* Move Reset button into a dropdown menu */}
          {actions?.resetData?.show && (
            <Menu>
              <MenuButton
                as={Button}
                size="sm"
                variant="solid"
                colorScheme="red"
                rightIcon={<IoChevronDownCircleOutline />}
                _hover={{ bg: "red.500", color: "white" }}
                _active={{ bg: "red.600", color: "white" }}
              >
                Actions
              </MenuButton>
              <MenuList
                zIndex={15}
                bg="white"
                border="1px solid"
                borderColor="gray.200"
                boxShadow="lg"
                rounded="md"
              >
                {actions?.actionBtn?.addKey?.showAddButton && (
                  <MenuItem
                    onClick={() =>
                      actions?.actionBtn?.addKey?.function?.("add")
                    }
                    icon={<MdAddCircleOutline />}
                    _hover={{ bg: "gray.100", color: "black" }}
                    _focus={{ bg: "gray.200", color: "black" }}
                  >
                    Add
                  </MenuItem>
                )}
                {actions?.resetData?.show && (
                  <MenuItem
                    onClick={actions?.resetData?.function}
                    icon={<MdUndo />}
                    _hover={{ bg: "gray.100", color: "black" }}
                    _focus={{ bg: "gray.200", color: "black" }}
                  >
                    {actions?.resetData?.text || "Reset Data"}
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
      <Box
        overflowX="auto"
        minH={"65vh"}
        maxH={"65vh"}
        overflowY={"auto"}
        {...extraProps}
      >
        <Table
          variant="striped"
          colorScheme="teal"
          size={isMobile ? "sm" : "sm"}
          borderWidth="1px"
          borderRadius="lg"
        >
          <Thead
            bg="gray.700"
            position="sticky"
            top="0"
            zIndex="9"
            height="50px"
          >
            <Tr fontSize="xs">
              {serial?.show && (
                <Th color="white" w={serial?.width || undefined}>
                  {serial?.text || "S.No."}
                </Th>
              )}
              {columns.map((column, colIndex) => (
                <Th
                  key={colIndex}
                  textAlign="center"
                  color="white"
                  {...column?.props?.column}
                >
                  {column.headerName}
                </Th>
              ))}
            </Tr>
          </Thead>
          <TableLoader loader={loading} show={data.length}>
            <Tbody overflowY="scroll">
              {data.map((row, rowIndex) => (
                <Tr fontSize="xs" key={rowIndex}>
                  {serial?.show && (
                    <Td fontWeight="bold" w={serial?.width || undefined}>
                      {rowIndex + 1}
                    </Td>
                  )}
                  {columns.map((column, colIndex) => (
                    <GenerateRows
                      key={colIndex}
                      column={column}
                      row={row || {}}
                      action={actions}
                    />
                  ))}
                </Tr>
              ))}
            </Tbody>
          </TableLoader>
        </Table>
      </Box>
      {actions?.pagination?.show && (
        <Pagination
          currentPage={actions?.pagination?.currentPage || 1}
          onPageChange={(e) => {
            if (actions?.pagination?.onClick) {
              actions?.pagination?.onClick(e);
            }
          }}
          totalPages={actions?.pagination?.totalPages || 1}
          props={{ style: { marginTop: "15px" } }}
        />
      )}
    </Box>
  );
};

export default CustomTable;
