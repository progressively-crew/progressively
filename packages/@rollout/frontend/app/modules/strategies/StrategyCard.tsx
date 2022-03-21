import {
  Box,
  Button,
  Flex,
  Heading,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  UnorderedList,
  VisuallyHidden,
} from "@chakra-ui/react";
import { MdOutlineMoreVert } from "react-icons/md";
import { Link } from "remix";
import { StrategyRetrieveDTO } from "./types";

export interface StrategyCardProps {
  flagId: string;
  projectId: string;
  envId: string;
  strat: StrategyRetrieveDTO;
}

const StrategyAudience = ({ strat }: { strat: StrategyRetrieveDTO }) => {
  let targetedUsers = "all the people";
  let fieldName = undefined;

  if (strat.activationType === "percentage") {
    targetedUsers = `${strat.rolloutPercentage}% of the people`;
  }

  if (strat.strategyRuleType === "field") {
    fieldName = strat.fieldName;
  }

  return (
    <Text>
      Serve the flag to <strong>{targetedUsers}</strong>{" "}
      {fieldName ? (
        <span>
          with <strong>email</strong> <strong>equals</strong>{" "}
          <span>to one of:</span>
        </span>
      ) : null}
    </Text>
  );
};

const StrategyTargetConstraints = ({
  strat,
}: {
  strat: StrategyRetrieveDTO;
}) => {
  if (strat.strategyRuleType === "default") {
    return null;
  }

  if (strat.strategyRuleType === "field") {
    const targets = strat.fieldValue?.split("\n");

    return (
      <UnorderedList pl={2}>
        {targets?.map((target) => (
          <ListItem key={target}>{target}</ListItem>
        ))}
      </UnorderedList>
    );
  }

  return null;
};

export const StrategyCard = ({
  flagId,
  projectId,
  envId,
  strat,
}: StrategyCardProps) => {
  return (
    <Box
      p={4}
      as="article"
      aria-labelledby={strat.uuid}
      borderTopWidth={1}
      borderColor="background"
    >
      <Flex alignItems={"flex-start"} mb={2} justifyContent="space-between">
        <Box mr={4}>
          <Heading as="h3" id={strat.uuid} size="md" color="brand.600">
            {strat.name}
          </Heading>

          <StrategyAudience strat={strat} />
        </Box>

        <Menu>
          <MenuButton
            as={Button}
            size="sm"
            rightIcon={<MdOutlineMoreVert aria-hidden />}
          >
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem
              as={Link}
              to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/strategies/1/edit`}
            >
              Edit<VisuallyHidden> {strat.name}</VisuallyHidden>
            </MenuItem>
            <MenuItem
              as={Link}
              to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/strategies`}
            >
              Remove<VisuallyHidden> {strat.name}</VisuallyHidden>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <StrategyTargetConstraints strat={strat} />
    </Box>
  );
};
