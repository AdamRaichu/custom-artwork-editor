import { Millennium } from "millennium-lib";
import { painIconID, paintSvgPath } from "./elements/paint_icon";

// TODO: Remove when official typings come out.
declare const LocalizationManager: any;

export default async function CustomArtworkEditorFrontend() {
  console.log("Custom Artwork Editor Frontend loaded.");
  Millennium.AddWindowCreateHook((context: any) => {
    if (context.m_strTitle !== LocalizationManager.LocalizeString("#WindowName_SteamDesktop")) {
      console.debug("This is not the window you're looking for.");
      return;
    }

    addButtonToLibrary(context);
  });
}

async function addButtonToLibrary(context: any) {
  const svgContainerSelector = `._1PgAonvorr0o_NMxNKiDFU:not(:has(#${painIconID}))`;

  while (true) {
    const [svgContainer] = await Millennium.findElement(context.m_popup.document, svgContainerSelector);
    const clone = svgContainer.children[1].cloneNode(true) as HTMLDivElement;
    clone.id = painIconID;
    const svg = clone.children[0] as SVGSVGElement;
    svg.setAttribute("viewBox", "0 0 32 32");
    svg.innerHTML = paintSvgPath;
    svgContainer.appendChild(clone);
    clone.addEventListener("click", async () => {
      const response = await Millennium.callServerMethod("getGridInfo");
      const gridInfo: { dirs: string[] } = JSON.parse(response);
      console.log({ gridInfo });
    });
    // svgContainer.appendChild(parser.parseFromString(paintIcon, "text/xml").children[0]);
  }
}
