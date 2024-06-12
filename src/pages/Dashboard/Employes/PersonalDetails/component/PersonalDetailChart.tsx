import { useEffect, useState } from "react";
import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import store from "../../../../../store/store";
import { getStatusType } from "../../../../../config/constant/statusCode";

const PersonalDetailUsersChart = observer(() => {
  const { id } = useParams();
  const { Employe: { getEmployesSubOrdinateActionsDetails }, auth: { openNotification } } = store;
  const [treeData, setTreeData] = useState<any[]>([]);

  const transformDataToTree = (data: any) => {
    const userMap: Record<string, any> = {};

    // Merge userDetails with users
    const mergedUsers = data.users.map((user: any) => {
      const details = data.userDetails.find((detail: any) => detail._id === user._id);
      return {
        ...user,
        userDetails: {
          ...user.userDetails,
          ...details,
        },
      };
    });

    mergedUsers.forEach((user: any) => {
      userMap[user._id] = {
        id: user._id,
        name: user.userDetails.name,
        title: user.userDetails.title,
        username: user.userDetails.username,
        code: user.userDetails.code,
        subordinates: [],
      };
    });

    mergedUsers.forEach((user: any) => {
      // Check if companydetail exists and has managers
      if (user.companydetail && user.companydetail.managers) {
        user.companydetail.managers.forEach((manager: any) => {
          if (userMap[manager._id]) {
            userMap[manager._id].subordinates.push(userMap[user._id]);
          }
        });
      }
    });

    // Return the top-level nodes (those without managers)
    return mergedUsers
      .filter((user: any) => !user.companydetail || !user.companydetail.managers || user.companydetail.managers.length === 0)
      .map((user: any) => userMap[user._id]);
  };


  const getEmployesActionsDetails = async () => {
    try {
      const { data } = await getEmployesSubOrdinateActionsDetails({ id });
      console.log(data);
      const tree = transformDataToTree(data);
      setTreeData(tree);
    } catch (err: any) {
      console.log(err)
      openNotification({
        type: getStatusType(err.status),
        title: "Failed to get details",
        message: err?.message,
      });
    }
  };

  useEffect(() => {
    getEmployesActionsDetails();
  }, [id]);

  return (
    <VStack align="start" spacing={4}>
      {treeData.map(manager => (
        <TreeNode key={manager.id} node={manager} />
      ))}
    </VStack>
  );
});

const TreeNode = ({ node }: { node: any }) => (
  <Box pl={4} borderLeft="1px solid" borderColor="gray.200">
    <NodeLabel node={node} />
    {node.subordinates && node.subordinates.length > 0 && (
      <VStack align="start" spacing={2} pl={4}>
        {node.subordinates.map((sub: any) => (
          <TreeNode key={sub.id} node={sub} />
        ))}
      </VStack>
    )}
  </Box>
);

const NodeLabel = ({ node }: { node: any }) => (
  <HStack spacing={2}>
    <Text fontWeight="bold">{node.name}</Text>
    <Text fontSize="sm" color="gray.500">{node.title}</Text>
    <Text fontSize="xs" color="gray.400">{node.username}</Text>
  </HStack>
);

export default PersonalDetailUsersChart;
