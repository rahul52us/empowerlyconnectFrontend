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
  } from "@chakra-ui/react";
  import { observer } from "mobx-react-lite";
  import { useState } from "react";
  import { HiOutlineShoppingCart } from "react-icons/hi"; // Import empty cart icon
  import CustomDrawer from "../../../../../../component/Drawer/CustomDrawer";
  import store from "../../../../../../../store/store";
  import { FaShoppingCart } from "react-icons/fa";

  const CartContainer = observer(() => {
    const [openCart, setOpenCart] = useState({ open: false, loading: false });

    const closeCart = () => setOpenCart({ open: false, loading: false });

    // Access the CartStore and userAddedItems
    const { CartStore } = store;
    const users: any = CartStore.userAddedItems.users || {};
    const hasCartData = Object.keys(users).length > 0;

    const bg = useColorModeValue("gray.50", "gray.800"); // Background color for light and dark mode
    const textColor = useColorModeValue("gray.600", "white"); // Text color for light and dark mode
    const subTextColor = useColorModeValue("gray.500", "gray.400"); // Subtext color for light and dark mode
    const iconColor = useColorModeValue("blue.400", "blue.300"); // Icon color

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
            {CartStore.userAddedItems?.totalItems}
          </Badge>
        </Flex>

        <CustomDrawer
          title="All Users' Carts"
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
                    bg="white"
                    boxShadow="md"
                  >
                    <Text fontSize="lg" fontWeight="bold" mb={2} color="blue.600">
                      User ID: {userId}
                    </Text>
                    {Object.entries(userCart).map(([itemId, item]: any) => (
                      <Box key={itemId} mb={4}>
                        <Box
                          display="flex"
                          alignItems="center"
                          borderWidth="1px"
                          borderRadius="md"
                          p={2}
                          mb={2}
                          bg="gray.50"
                          _hover={{ bg: "gray.100" }}
                        >
                          <Image
                            src={item.coverImage?.url}
                            alt={item.title}
                            boxSize="50px"
                            mr={4}
                            fallbackSrc="https://via.placeholder.com/50" // Fallback image if no cover image
                          />
                          <Box flex="1">
                            <Text fontWeight="bold">{item.title}</Text>
                            <Text fontSize="sm" color="gray.600">
                              {item.author}
                            </Text>
                            <Text fontSize="sm">
                              Quantity: {item.TotalNoOfQuantities}
                            </Text>
                          </Box>
                          <Button
                            colorScheme="red"
                            // Implement the remove functionality here
                            // onClick={() => CartStore.adminRemoveItem(item, userId)}
                          >
                            Remove
                          </Button>
                        </Box>
                      </Box>
                    ))}
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
                  bg={bg} // Background color based on color mode
                  p={5} // Add padding for spacing
                >
                  <Flex justifyContent="center" mb={4}>
                    <HiOutlineShoppingCart size={250} color={iconColor} />{" "}
                    {/* Icon color based on color mode */}
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
