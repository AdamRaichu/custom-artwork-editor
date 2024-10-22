// TODO: Remove when official typings come out.
declare const LocalizationManager: any;
declare const g_PopupManager: any;
declare const appInfoStore: {
  m_mapAppInfo: Map<number, { m_strName: string; m_unAppId: number; m_eAppType: number }>;
};

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
