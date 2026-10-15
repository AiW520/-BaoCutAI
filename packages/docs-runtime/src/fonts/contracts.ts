/** Font metadata consumed by the parent page and transferred to the editor iframe. */
export interface FontAsset {
  family: string;
  path: string;
  format: string;
  desc?: string;
  style?: string;
}
