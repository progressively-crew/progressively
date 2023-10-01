declare module "@progressively/types" {
  export interface Fields {
    id?: string | number | boolean | null;
    email?: string;
    clientKey?: string;
  }
  export interface FlagDict {
    background: boolean;
  }
  export interface FlagDictWithCustomString {
    background: string | boolean;
  }
}
