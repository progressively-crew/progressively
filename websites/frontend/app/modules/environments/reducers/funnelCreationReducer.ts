import { FlagEnv } from "~/modules/flags/types";
import { CreateFunnelEntryDTO } from "../types";

export type ActionType =
  | { type: "SET_FLAG"; flagId: string }
  | { type: "SET_EVENT"; eventName: string };

export interface FunnelCreationState {
  funnelEntries: Array<CreateFunnelEntryDTO>;
  flagEnvsOptions: Array<{ label: string; value: string }>;
  eventNameOptions: Array<{ label: string; value: string }>;
}

export const initialState: FunnelCreationState = {
  funnelEntries: [],
  flagEnvsOptions: [],
  eventNameOptions: [],
};

export const getInitialState = (
  flagEnvs: Array<FlagEnv>,
  eventNames: Array<string>
): FunnelCreationState => ({
  funnelEntries: [],
  flagEnvsOptions: flagEnvs.map((flagEnv) => ({
    label: flagEnv.flag.name,
    value: flagEnv.flagId,
  })),
  eventNameOptions: eventNames.map((ev) => ({ label: ev, value: ev })),
});

export const funnelCreationReducer = (
  state: FunnelCreationState,
  action: ActionType
): FunnelCreationState => {
  switch (action.type) {
    case "SET_EVENT": {
      const nextEntry: CreateFunnelEntryDTO = { eventName: action.eventName };
      const funnelEntries = [...state.funnelEntries, nextEntry];
      const eventNameOptions = state.eventNameOptions.filter(
        (ev) => ev.value !== action.eventName
      );

      return { ...state, funnelEntries, eventNameOptions };
    }

    case "SET_FLAG": {
      const flagOpts = state.flagEnvsOptions.find(
        (x) => x.value === action.flagId
      );

      const nextEntry: CreateFunnelEntryDTO = {
        flagUuid: action.flagId,
        flagName: flagOpts?.label,
      };

      const funnelEntries = [...state.funnelEntries, nextEntry];
      const flagEnvsOptions = state.flagEnvsOptions.filter(
        (f) => f.value !== action.flagId
      );

      return { ...state, funnelEntries, flagEnvsOptions };
    }

    default: {
      return state;
    }
  }
};
