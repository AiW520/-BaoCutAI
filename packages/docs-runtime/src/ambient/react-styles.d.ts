import type {} from "react";

declare module "react" {
  interface CSSProperties {
    [name: `--${string}`]: string | number | undefined;
  }
}
