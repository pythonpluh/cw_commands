export type Role = "PS_OWNER" | "MOD" | "ADMIN" | "DEV" | "EVERYONE";

export type Arg = {
  Required: boolean;

  Label: string;
  Description: string;

  Type?: string;
};

export type Command = {
  Name: string;
  Args?: Arg[];

  Description: string;
  Note?: string;

  Bugged?: boolean;

  Aliases?: string[];
  Roles?: Role[];
};

export type Category = {
  Id: string;
  Name: string;

  Blurb?: string;

  Commands: Command[];
};
