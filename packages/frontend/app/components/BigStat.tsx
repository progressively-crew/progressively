export interface BigStateProps {
  value: string | number;
  name: string;
}

export const BigState = ({ name, value }: BigStateProps) => {
  return (
    <div>
      <p>{name}</p>
      <p>{value}</p>
    </div>
  );
};
