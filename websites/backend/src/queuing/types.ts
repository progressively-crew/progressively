export interface IQueuingService {
  send: (topic: string, message: any) => Promise<void>;
  consume: <T>(
    topic: string,
    groupId: string,
    callback: (parsedMsg: T) => void,
  ) => Promise<void>;
  teardown: () => Promise<void>;
}
