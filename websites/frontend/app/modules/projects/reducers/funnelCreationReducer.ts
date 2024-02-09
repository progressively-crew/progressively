import { Flag } from "~/modules/flags/types";
import { CreateFunnelEntryDTO } from "../types";

export type ActionType =
  | { type: "SET_FLAG"; flagId: string }
  | { type: "SET_EVENT"; eventName: string }
  | { type: "SET_VARIANT"; flagId: string; variant: string }
  | { type: "SET_PAGE_VIEW_URL"; url: string };

export interface FunnelCreationState {
  funnelEntries: Array<CreateFunnelEntryDTO>;
  flagOptions: Array<{ label: string; value: string }>;
  eventNameOptions: Array<{ label: string; value: string }>;
}

export const initialState: FunnelCreationState = {
  funnelEntries: [],
  flagOptions: [],
  eventNameOptions: [],
};

export const getInitialState = (
  flags: Array<Flag>,
  eventNames: Array<string>
): FunnelCreationState => ({
  funnelEntries: [],
  flagOptions: flags.map((flag) => ({
    label: flag.name,
    value: flag.uuid,
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
      const flagOpts = state.flagOptions.find((x) => x.value === action.flagId);

      const nextEntry: CreateFunnelEntryDTO = {
        flagUuid: action.flagId,
        flagName: flagOpts?.label,
      };

      const funnelEntries = [...state.funnelEntries, nextEntry];
      const flagOptions = state.flagOptions.filter(
        (f) => f.value !== action.flagId
      );

      return { ...state, funnelEntries, flagOptions };
    }

    case "SET_VARIANT": {
      const funnelEntryIndex = state.funnelEntries.findIndex(
        (x) => x.flagUuid === action.flagId
      );

      const prevFunnels = state.funnelEntries.slice(0, funnelEntryIndex);
      const actualFunnel = state.funnelEntries[funnelEntryIndex];
      const updatedFunnel = { ...actualFunnel, variant: action.variant };
      const postFunnels = state.funnelEntries.slice(funnelEntryIndex + 1);

      const nextFunnelEntries = [...prevFunnels, updatedFunnel, ...postFunnels];

      return { ...state, funnelEntries: nextFunnelEntries };
    }

    case "SET_PAGE_VIEW_URL": {
      const funnelEntryIndex = state.funnelEntries.findIndex(
        (x) => x.eventName === "Page View"
      );

      const prevFunnels = state.funnelEntries.slice(0, funnelEntryIndex);
      const actualFunnel = state.funnelEntries[funnelEntryIndex];
      const updatedFunnel = { ...actualFunnel, pageViewUrl: action.url };
      const postFunnels = state.funnelEntries.slice(funnelEntryIndex + 1);

      const nextFunnelEntries = [...prevFunnels, updatedFunnel, ...postFunnels];

      return { ...state, funnelEntries: nextFunnelEntries };
    }

    default: {
      return state;
    }
  }
};
