export interface IPubsubService {
  notifyChannel: (channel: string, message: any) => Promise<void>;
  subscribe: <T>(channel: string, callback: (parsedMsg: T) => void) => void;
  teardown: () => Promise<void>;
}
