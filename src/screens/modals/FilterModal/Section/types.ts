import type { ReactNode } from "react";

export interface SectionProps {
  title: string;
  selectedCount: number;
  children: ReactNode;
}
