import {
  IconButton,
  Box,
  Text,
  Image,
  VStack,
  Button,
  Flex,
  useColorModeValue,
  Badge,
  HStack,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import CustomDrawer from "../../../../../../component/Drawer/CustomDrawer";
import store from "../../../../../../../store/store";
import { FaShoppingCart } from "react-icons/fa";
import { HiPlus, HiMinus } from "react-icons/hi";

const CartContainer = observer(() => {
  const [openCart, setOpenCart] = useState({ open: false, loading: false });

  const closeCart = () => setOpenCart({ open: false, loading: false });

  const {
    CartStore: { userAddedItems, setUserAddedItems },
    auth: { user },
  } = store;
  const users: any = userAddedItems.users || {};
  const hasCartData = Object.keys(users).length > 0;

  const bg = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.600", "white");
  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const iconColor = useColorModeValue("blue.400", "blue.300");
  const cartItemBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleAddQuantity = (item: any) => {
    setUserAddedItems({...item, user : item.user}, "add", item.user);
  };

  const handleSubtractQuantity = (item: any) => {
    setUserAddedItems({...item, user : item.user}, "remove", item.user);
  };

  return (
    <>
      <Flex
        position="relative"
        justifyContent="center"
        alignItems="center"
        zIndex={9999999999}
      >
        <IconButton
          icon={<FaShoppingCart />}
          fontSize="2xl"
          position="relative"
          bg="transparent"
          variant="ghost"
          color="white"
          _hover={{ color: "blue.500", bg: "gray.700" }}
          _active={{ bg: "gray.800" }}
          aria-label="cart-icon"
          _focus={{ boxShadow: "outline" }}
          onClick={() => setOpenCart({ open: true, loading: false })}
        />
        <Badge
          colorScheme="red"
          borderRadius="full"
          position="absolute"
          top="-3px"
          right="-4px"
        >
          {userAddedItems?.totalItems}
        </Badge>
      </Flex>

      <CustomDrawer
        title="All Carts"
        open={openCart.open}
        close={closeCart}
      >
        <Box p={4}>
          <VStack spacing={6} align="stretch">
            {hasCartData ? (
              Object.entries(users).map(([userId, userCart]: any) => (
                <Box
                  key={userId}
                  borderWidth="1px"
                  borderRadius="md"
                  p={4}
                  bg={cartItemBg}
                  boxShadow="md"
                  borderColor={borderColor}
                >
                  <Text fontSize="md" fontWeight="bold" mb={4} color="blue.600">
                    {userId}
                  </Text>
                  {Object.entries(userCart).length ? (
                    Object.entries(userCart).map(([itemId, item]: any) => (
                      <Box key={itemId} mb={4}>
                        <Box
                          display="flex"
                          alignItems="center"
                          borderWidth="1px"
                          borderRadius="md"
                          p={2}
                          mb={2}
                          bg={bg}
                          _hover={{ bg: useColorModeValue("gray.200", "gray.800") }} // Change on hover
                          borderColor={borderColor} // Apply border color
                          transition="background-color 0.2s, box-shadow 0.2s" // Smooth transition
                          boxShadow="sm"
                        >
                          <Image
                            src={item.coverImage?.url}
                            alt={item.title}
                            boxSize="50px"
                            mr={4}
                            fallbackSrc="https://via.placeholder.com/50"
                            borderRadius="md" // Rounded corners for image
                          />
                          <Box flex="1">
                            <Text fontWeight="bold">{item.title}</Text>
                            <Text fontSize="sm" color="gray.600">
                              {item.author}
                            </Text>
                            <HStack spacing={2} mt={2}>
                              <Text fontSize="sm">Quantity:</Text>
                              <Text fontWeight="bold">
                                {item.TotalNoOfQuantities}
                              </Text>
                            </HStack>
                          </Box>

                          <Flex alignItems="center" gap={2}>
                            <Tooltip
                              label="Add Quantity"
                              placement="top"
                              fontSize="md"
                            >
                              <Button
                                colorScheme="teal"
                                size="md"
                                onClick={() => handleAddQuantity(item)}
                                aria-label="Add quantity"
                                leftIcon={<Icon as={HiPlus} boxSize={4} />}
                                _hover={{ bg: "teal.600", color: "white" }}
                                borderRadius="md"
                                boxShadow="sm"
                                transition="all 0.2s"
                              >
                                Add
                              </Button>
                            </Tooltip>
                            <Tooltip
                              label="Subtract Quantity"
                              placement="top"
                              fontSize="md"
                            >
                              <Button
                                colorScheme="orange"
                                size="md"
                                onClick={() => handleSubtractQuantity(item)}
                                isDisabled={item.TotalNoOfQuantities <= 1}
                                aria-label="Subtract quantity"
                                leftIcon={<Icon as={HiMinus} boxSize={4} />}
                                _hover={{ bg: "orange.600", color: "white" }}
                                borderRadius="md"
                                boxShadow="sm"
                                transition="all 0.2s"
                              >
                                Subtract
                              </Button>
                            </Tooltip>
                            <Tooltip
                              label="Remove Item"
                              placement="top"
                              fontSize="md"
                            >
                              <Button
                                colorScheme="red"
                                onClick={() => {
                                  setUserAddedItems({...item, user : user}, "removeAll", item.user);
                                }}
                                aria-label="Remove item"
                                variant="outline"
                                borderColor="red.500"
                                _hover={{ bg: "red.100", color: "red.600" }}
                                borderRadius="md"
                                boxShadow="sm"
                                transition="all 0.2s"
                                size="md"
                              >
                                Remove
                              </Button>
                            </Tooltip>
                          </Flex>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Flex justifyContent="center" mb={4}>
                      <Flex direction="column" alignItems="center">
                        <HiOutlineShoppingCart size={80} color={iconColor} />
                        <Text
                          textAlign="center"
                          color={textColor}
                          mt={2}
                          fontSize="sm"
                          cursor="pointer"
                        >
                          No Data Exists
                        </Text>
                      </Flex>
                    </Flex>
                  )}
                </Box>
              ))
            ) : (
              <Flex
                textAlign="center"
                borderRadius="md"
                boxShadow="sm"
                height="82vh"
                justifyContent="center"
                direction="column"
                bg={bg}
                p={5}
              >
                <Flex justifyContent="center" mb={4}>
                  <HiOutlineShoppingCart size={250} color={iconColor} />
                </Flex>
                <Text fontSize="lg" mt={4} color={textColor}>
                  Your cart is empty.
                </Text>
                <Text fontSize="sm" color={subTextColor}>
                  Add items to your cart to see them here.
                </Text>
              </Flex>
            )}
          </VStack>
        </Box>
      </CustomDrawer>
    </>
  );
});

export default CartContainer;
