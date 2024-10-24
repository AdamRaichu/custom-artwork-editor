import { Millennium } from "millennium-lib";
import { painIconID, paintSvgPath } from "./elements/paint_icon";
import { popupCSS } from "./popup/style";
import { libraryListSelector } from "./classList";

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
    svg.style.transform = "scale(1)";
    svg.innerHTML = paintSvgPath;
    svgContainer.appendChild(clone);
    clone.addEventListener("click", () => openGridMenu(context.m_popup.document));
  }
}

async function openGridMenu(steamDocument: Document) {
  const response = await Millennium.callServerMethod("getGridInfo", { id: g_PopupManager.m_unCurrentAccountID.toString() });
  const gridInfo: GridInfoResponse = JSON.parse(response);
  console.log({ gridInfo });

  // Create popup
  const win = window.open("about:blank");
  // ReactDOM.render(<CustomArtworkEditor gameIds={["12345"]} />, win.document.body);
  const popupDoc = win.document;
  popupDoc.documentElement.id = "adamraichu_custom-artwork-editor_popup";

  const styles = popupDoc.createElement("style");
  styles.innerHTML = popupCSS;
  popupDoc.head.appendChild(styles);

  const body = popupDoc.body;
  const layoutContainer = popupDoc.createElement("div");
  layoutContainer.id = "layout-container";
  body.appendChild(layoutContainer);

  const gameList = popupDoc.createElement("div");
  gameList.id = "game-list";
  layoutContainer.appendChild(gameList);

  const imageContainer = popupDoc.createElement("div");
  imageContainer.id = "image-container";
  layoutContainer.appendChild(imageContainer);

  // Get the games from the library.
  const ids = appInfoStore.m_mapAppInfo.keys();
  const libraryItems: { [name: string]: AppInfo } = {};
  for (const id of ids) {
    const appInfo = appInfoStore.m_mapAppInfo.get(id);
    console.debug(`${appInfo.m_strName} (${id}) is type ${appInfo.m_eAppType}`);
    libraryItems[appInfo.m_strName] = appInfo;
  }

  const _games = steamDocument.querySelectorAll(libraryListSelector + ":not(:has(span)), " + libraryListSelector + " span:has(span)") as NodeListOf<HTMLDivElement | HTMLSpanElement>;
  console.debug({ _games });
  const games: AppInfo[] = [];
  for (const game of _games) {
    let name;
    if (game.tagName === "SPAN") {
      // For "update queued" games.
      const child = game.children[0];
      console.debug({ child });
      steamDocument.body.appendChild(child);
      name = game.innerText;
      console.debug({ child });
      game.appendChild(child);
      console.debug({ child });
    } else {
      name = game.innerText;
    }

    console.debug({ name });
    games.push(libraryItems[name]);
  }
  console.debug({ games });
}
