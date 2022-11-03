export interface UlProps {
  children: React.ReactNode;
}

export const Ul = ({ children }: UlProps) => {
  return <ul className="list-disc pl-10">{children}</ul>;
};

export interface LiProps {
  children: React.ReactNode;
  id?: string;
}

export const Li = ({ children, id }: LiProps) => {
  return <li id={id}>{children}</li>;
};
