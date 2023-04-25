export type NavHeader = {
  type: "header";
}
export type NavToggle = {
  type: "toggle";
  value: boolean;
  key?: string;
  keybindId?: string;
  action?: () => void | Promise<void>;
}
export type NavButton = {
  type: "button";
  key?: string;
  keybindId?: string;
  action: () => void | Promise<void>;
}
export type NavCollapse = {
  type: "collapse";
  elements: ToggleList;
}
export type NavSlider = {
  type: "slider",
  interval: [min: number, interval: number, max: number];
  value: number;
  numSuffix?: string;
  /**
   * color -> percentage of slider taken up
   */
  colors?: {
    [key: string]: number;
  };
}
export type NavItem = NavHeader | NavToggle | NavButton | NavCollapse | NavSlider;
export type ToggleList = {
  [key: string]: NavHeader | NavToggle | NavButton | NavCollapse | NavSlider;
}