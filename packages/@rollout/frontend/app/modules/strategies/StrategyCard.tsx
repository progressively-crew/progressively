import {
  Box,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { Button } from "~/components/Button";
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
    <Text color="textlight">
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
          <ListItem key={target} color="textlight">
            {target}
          </ListItem>
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
      pt={4}
      pb={4}
      pl={4}
      as="article"
      aria-labelledby={strat.uuid}
      borderTopWidth={1}
      borderColor="background"
    >
      <Flex
        alignItems={"flex-start"}
        justifyContent="space-between"
        direction={["column", "row"]}
      >
        <Box mr={4}>
          <Heading as="h3" id={strat.uuid} size="md" mb={1}>
            {strat.name}
          </Heading>

          <StrategyAudience strat={strat} />
        </Box>

        <Button
          colorScheme="error"
          variant="outline"
          leftIcon={<FaTrash aria-hidden />}
          mt={[2, 0]}
          to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/strategies/${strat.uuid}/delete`}
        >
          Remove<VisuallyHidden> {strat.name}</VisuallyHidden>
        </Button>
      </Flex>

      <StrategyTargetConstraints strat={strat} />
    </Box>
  );
};
