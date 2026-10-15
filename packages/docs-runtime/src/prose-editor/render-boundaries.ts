import type { ReactNode } from "react";
export interface ChartBoundaryProps {
  readonly cell: { readonly id: unknown };
}
export interface WidgetBoundaryProps {
  readonly children?: ReactNode;
  onError(error: unknown): void;
}
export interface RevisionBoundaryProps {
  readonly rev: unknown;
  readonly children?: ReactNode;
  onError?(error: unknown): void;
}

export interface StaticSparkProps {
  readonly size?: number | string;
  readonly color?: string;
  readonly className?: string;
}
