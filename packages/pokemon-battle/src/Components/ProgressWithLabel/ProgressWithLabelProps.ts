export interface ProgressWithLabelProps {
  label: string;
  color?: muiColors;
  healthBar?: boolean;
  value: number;
}

export type muiColors =
  | "inherit"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";
