// TODO: Remove when official typings come out.
declare const LocalizationManager: any;
declare const g_PopupManager: any;

declare interface CustomArtworkDescriptorJSON {
  nVersion: number;
  logoPosition: {
    pinnedPosition: "BottomLeft" | string;
    nWidthPercent: number;
    nHeightPercent: number;
  };
}

declare interface GridInfoResponse {
  jsonFiles: CustomArtworkDescriptorJSON[];
  otherFiles: string[];
}
