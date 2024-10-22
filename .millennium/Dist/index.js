const pluginName = "adamraichu.custom-artwork-editor";
function InitializePlugins() {
    /**
     * This function is called n times depending on n plugin count,
     * Create the plugin list if it wasn't already created
     */
    !window.PLUGIN_LIST && (window.PLUGIN_LIST = {});
    // initialize a container for the plugin
    if (!window.PLUGIN_LIST[pluginName]) {
        window.PLUGIN_LIST[pluginName] = {};
    }
}
InitializePlugins()
async function wrappedCallServerMethod(methodName, kwargs) {
    return new Promise((resolve, reject) => {
        // @ts-ignore
        Millennium.callServerMethod(pluginName, methodName, kwargs).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
}
var millennium_main = (function (exports) {
    'use strict';

    const bgStyle1 = 'background: #8a16a2; color: black;';
    const log = (name, ...args) => {
        console.log(`%c @millennium/ui %c ${name} %c`, bgStyle1, 'background: #b11cce; color: black;', 'background: transparent;', ...args);
    };
    const group = (name, ...args) => {
        console.group(`%c @millennium/ui %c ${name} %c`, bgStyle1, 'background: #b11cce; color: black;', 'background: transparent;', ...args);
    };
    const groupEnd = (name, ...args) => {
        console.groupEnd();
        if (args?.length > 0)
            console.log(`^ %c @millennium/ui %c ${name} %c`, bgStyle1, 'background: #b11cce; color: black;', 'background: transparent;', ...args);
    };
    const debug = (name, ...args) => {
        console.debug(`%c @millennium/ui %c ${name} %c`, bgStyle1, 'background: #1abc9c; color: black;', 'color: blue;', ...args);
    };
    const warn = (name, ...args) => {
        console.warn(`%c @millennium/ui %c ${name} %c`, bgStyle1, 'background: #ffbb00; color: black;', 'color: blue;', ...args);
    };
    const error = (name, ...args) => {
        console.error(`%c @millennium/ui %c ${name} %c`, bgStyle1, 'background: #FF0000;', 'background: transparent;', ...args);
    };
    class Logger {
        constructor(name) {
            this.name = name;
            this.name = name;
        }
        log(...args) {
            log(this.name, ...args);
        }
        debug(...args) {
            debug(this.name, ...args);
        }
        warn(...args) {
            warn(this.name, ...args);
        }
        error(...args) {
            error(this.name, ...args);
        }
        group(...args) {
            group(this.name, ...args);
        }
        groupEnd(...args) {
            groupEnd(this.name, ...args);
        }
    }

    const logger = new Logger('Webpack');
    let modules = [];
    function initModuleCache() {
        const startTime = performance.now();
        logger.group('Webpack Module Init');
        // Webpack 5, currently on beta
        // Generate a fake module ID
        const id = Math.random(); // really should be an int and not a float but who cares
        let webpackRequire;
        // Insert our module in a new chunk.
        // The module will then be called with webpack's internal require function as its first argument
        window.webpackChunksteamui.push([
            [id],
            {},
            (r) => {
                webpackRequire = r;
            },
        ]);
        logger.log('Initializing all modules. Errors here likely do not matter, as they are usually just failing module side effects.');
        // Loop over every module ID
        for (let i of Object.keys(webpackRequire.m)) {
            try {
                const module = webpackRequire(i);
                if (module) {
                    modules.push(module);
                }
            }
            catch (e) {
                logger.debug('Ignoring require error for module', i, e);
            }
        }
        logger.groupEnd(`Modules initialized in ${performance.now() - startTime}ms...`);
    }
    initModuleCache();
    const findModule = (filter) => {
        for (const m of modules) {
            if (m.default && filter(m.default))
                return m.default;
            if (filter(m))
                return m;
        }
    };
    const findModuleDetailsByExport = (filter, minExports) => {
        for (const m of modules) {
            if (!m)
                continue;
            for (const mod of [m.default, m]) {
                if (typeof mod !== 'object')
                    continue;
                for (let exportName in mod) {
                    if (mod?.[exportName]) {
                        const filterRes = filter(mod[exportName], exportName);
                        if (filterRes) {
                            return [mod, mod[exportName], exportName];
                        }
                        else {
                            continue;
                        }
                    }
                }
            }
        }
        return [undefined, undefined, undefined];
    };
    const findModuleByExport = (filter, minExports) => {
        return findModuleDetailsByExport(filter)?.[0];
    };
    const findModuleExport = (filter, minExports) => {
        return findModuleDetailsByExport(filter)?.[1];
    };
    /**
     * @deprecated use findModuleExport instead
     */
    const findModuleChild = (filter) => {
        for (const m of modules) {
            for (const mod of [m.default, m]) {
                const filterRes = filter(mod);
                if (filterRes) {
                    return filterRes;
                }
                else {
                    continue;
                }
            }
        }
    };
    const findAllModules = (filter) => {
        const out = [];
        for (const m of modules) {
            if (m.default && filter(m.default))
                out.push(m.default);
            if (filter(m))
                out.push(m);
        }
        return out;
    };
    const CommonUIModule = modules.find((m) => {
        if (typeof m !== 'object')
            return false;
        for (let prop in m) {
            if (m[prop]?.contextType?._currentValue && Object.keys(m).length > 60)
                return true;
        }
        return false;
    });
    const IconsModule = findModuleByExport((e) => e?.toString && /Spinner\)}\)?,.\.createElement\(\"path\",{d:\"M18 /.test(e.toString()));
    const ReactRouter = findModuleByExport((e) => e.computeRootMatch);

    const CommonDialogDivs = Object.values(CommonUIModule).filter((m) => typeof m === 'object' && m?.render?.toString().includes('createElement("div",{...') ||
        m?.render?.toString().includes('createElement("div",Object.assign({},'));
    const MappedDialogDivs = new Map(Object.values(CommonDialogDivs).map((m) => {
        try {
            const renderedDiv = m.render({});
            // Take only the first class name segment as it identifies the element we want
            return [renderedDiv.props.className.split(' ')[0], m];
        }
        catch (e) {
            console.error("[DFL:Dialog]: failed to render common dialog component", e);
            return [null, null];
        }
    }));
    MappedDialogDivs.get('DialogHeader');
    MappedDialogDivs.get('DialogSubHeader');
    MappedDialogDivs.get('DialogFooter');
    MappedDialogDivs.get('DialogLabel');
    MappedDialogDivs.get('DialogBodyText');
    MappedDialogDivs.get('DialogBody');
    MappedDialogDivs.get('DialogControlsSection');
    MappedDialogDivs.get('DialogControlsSectionHeader');
    Object.values(CommonUIModule).find((mod) => mod?.render?.toString()?.includes('"DialogButton","_DialogLayout","Primary"'));
    const DialogButtonSecondary = Object.values(CommonUIModule).find((mod) => mod?.render?.toString()?.includes('"DialogButton","_DialogLayout","Secondary"'));
    // This is the "main" button. The Primary can act as a submit button,
    // therefore secondary is chosen (also for backwards comp. reasons)
    const DialogButton = DialogButtonSecondary;

    // Button isn't exported, so call DialogButton to grab it
    DialogButton?.render({}).type;

    /**
     * Create a Regular Expression to search for a React component that uses certain props in order.
     *
     * @export
     * @param {string[]} propList Ordererd list of properties to search for
     * @returns {RegExp} RegEx to call .test(component.toString()) on
     */
    function createPropListRegex(propList, fromStart = true) {
        let regexString = fromStart ? "const\{" : "";
        propList.forEach((prop, propIdx) => {
            regexString += `"?${prop}"?:[a-zA-Z_$]{1,2}`;
            if (propIdx < propList.length - 1) {
                regexString += ",";
            }
        });
        // TODO provide a way to enable this
        // console.debug(`[DFL:Utils] createPropListRegex generated regex "${regexString}" for props`, propList);
        return new RegExp(regexString);
    }

    const classMapList = findAllModules((m) => {
        if (typeof m == 'object' && !m.__esModule) {
            const keys = Object.keys(m);
            // special case some libraries
            if (keys.length == 1 && m.version)
                return false;
            // special case localization
            if (keys.length > 1000 && m.AboutSettings)
                return false;
            return keys.length > 0 && keys.every((k) => !Object.getOwnPropertyDescriptor(m, k)?.get && typeof m[k] == 'string');
        }
        return false;
    });
    Object.assign({}, ...classMapList.map(obj => Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, value]))));
    function findClass(name) {
        return classMapList.find((m) => m?.[name])?.[name];
    }
    const findClassHandler = {
        get: (target, prop) => {
            if (typeof prop === "string") {
                return target(prop);
            }
        }
    };
    new Proxy(findClass, findClassHandler);
    function findClassModule(filter) {
        return classMapList.find((m) => filter(m));
    }

    findClassModule((m) => m.Title && m.QuickAccessMenu && m.BatteryDetailsLabels);
    findClassModule((m) => m.ScrollPanel);
    findClassModule((m) => m.GamepadDialogContent && !m.BindingButtons);
    findClassModule((m) => m.BatteryPercentageLabel && m.PanelSection && !m['vr-dashboard-bar-height'] && !m.QuickAccessMenu && !m.QuickAccess && !m.PerfProfileInfo);
    findClassModule((m) => m.OOBEUpdateStatusContainer);
    findClassModule((m) => m.PlayBarDetailLabel);
    findClassModule((m) => m.SliderControlPanelGroup);
    findClassModule((m) => m.TopCapsule);
    findClassModule((m) => m.HeaderLoaded);
    findClassModule((m) => m.BasicUiRoot);
    findClassModule((m) => m.GamepadTabbedPage);
    findClassModule((m) => m.BasicContextMenuModal);
    findClassModule((m) => m.AchievementListItemBase && !m.Page);
    findClassModule((m) => m.AchievementListItemBase && m.Page);
    findClassModule((m) => m.AppRunningControls && m.OverlayAchievements);
    findClassModule((m) => m.AppDetailsRoot);
    findClassModule(m => m.SpinnerLoaderContainer);
    findClassModule(m => m.QuickAccessFooter);
    findClassModule(m => m.PlayButtonContainer);
    findClassModule(m => m.LongTitles && m.GreyBackground);
    findClassModule(m => m.GamepadLibrary);
    findClassModule(m => m.FocusRingRoot);
    findClassModule(m => m.SearchAndTitleContainer);
    findClassModule(m => m.MainBrowserContainer);

    const buttonItemRegex = createPropListRegex(["highlightOnFocus", "childrenContainerWidth"], false);
    Object.values(CommonUIModule).find((mod) => (mod?.render?.toString && buttonItemRegex.test(mod.render.toString())) ||
        mod?.render?.toString?.().includes('childrenContainerWidth:"min"'));

    findModuleExport((e) => e.render?.toString().includes('setFocusedColumn:'));

    findModuleExport((e) => e?.toString && e.toString().includes('().ControlsListChild') && e.toString().includes('().ControlsListOuterPanel'));

    Object.values(findModule((m) => {
        if (typeof m !== 'object')
            return false;
        for (const prop in m) {
            if (m[prop]?.prototype?.GetPanelElementProps)
                return true;
        }
        return false;
    })).find((m) => m.contextType &&
        m.prototype?.render.toString().includes('fallback:') &&
        m?.prototype?.SetChecked &&
        m?.prototype?.Toggle &&
        m?.prototype?.GetPanelElementProps);

    Object.values(CommonUIModule).find((mod) => mod?.prototype?.SetSelectedOption && mod?.prototype?.BuildMenu);
    const dropdownItemRegex = createPropListRegex(["dropDownControlRef", "description"], false);
    Object.values(CommonUIModule).find((mod) => mod?.toString && dropdownItemRegex.test(mod.toString()));

    findModuleExport((e) => e?.render?.toString().includes('"shift-children-below"'));

    const focusableRegex = createPropListRegex(["flow-children", "onActivate", "onCancel", "focusClassName", "focusWithinClassName"]);
    findModuleExport((e) => e?.render?.toString && focusableRegex.test(e.render.toString()));

    findModuleExport((e) => e?.toString()?.includes('.GetShowDebugFocusRing())'));

    var GamepadButton;
    (function (GamepadButton) {
        GamepadButton[GamepadButton["INVALID"] = 0] = "INVALID";
        GamepadButton[GamepadButton["OK"] = 1] = "OK";
        GamepadButton[GamepadButton["CANCEL"] = 2] = "CANCEL";
        GamepadButton[GamepadButton["SECONDARY"] = 3] = "SECONDARY";
        GamepadButton[GamepadButton["OPTIONS"] = 4] = "OPTIONS";
        GamepadButton[GamepadButton["BUMPER_LEFT"] = 5] = "BUMPER_LEFT";
        GamepadButton[GamepadButton["BUMPER_RIGHT"] = 6] = "BUMPER_RIGHT";
        GamepadButton[GamepadButton["TRIGGER_LEFT"] = 7] = "TRIGGER_LEFT";
        GamepadButton[GamepadButton["TRIGGER_RIGHT"] = 8] = "TRIGGER_RIGHT";
        GamepadButton[GamepadButton["DIR_UP"] = 9] = "DIR_UP";
        GamepadButton[GamepadButton["DIR_DOWN"] = 10] = "DIR_DOWN";
        GamepadButton[GamepadButton["DIR_LEFT"] = 11] = "DIR_LEFT";
        GamepadButton[GamepadButton["DIR_RIGHT"] = 12] = "DIR_RIGHT";
        GamepadButton[GamepadButton["SELECT"] = 13] = "SELECT";
        GamepadButton[GamepadButton["START"] = 14] = "START";
        GamepadButton[GamepadButton["LSTICK_CLICK"] = 15] = "LSTICK_CLICK";
        GamepadButton[GamepadButton["RSTICK_CLICK"] = 16] = "RSTICK_CLICK";
        GamepadButton[GamepadButton["LSTICK_TOUCH"] = 17] = "LSTICK_TOUCH";
        GamepadButton[GamepadButton["RSTICK_TOUCH"] = 18] = "RSTICK_TOUCH";
        GamepadButton[GamepadButton["LPAD_TOUCH"] = 19] = "LPAD_TOUCH";
        GamepadButton[GamepadButton["LPAD_CLICK"] = 20] = "LPAD_CLICK";
        GamepadButton[GamepadButton["RPAD_TOUCH"] = 21] = "RPAD_TOUCH";
        GamepadButton[GamepadButton["RPAD_CLICK"] = 22] = "RPAD_CLICK";
        GamepadButton[GamepadButton["REAR_LEFT_UPPER"] = 23] = "REAR_LEFT_UPPER";
        GamepadButton[GamepadButton["REAR_LEFT_LOWER"] = 24] = "REAR_LEFT_LOWER";
        GamepadButton[GamepadButton["REAR_RIGHT_UPPER"] = 25] = "REAR_RIGHT_UPPER";
        GamepadButton[GamepadButton["REAR_RIGHT_LOWER"] = 26] = "REAR_RIGHT_LOWER";
        GamepadButton[GamepadButton["STEAM_GUIDE"] = 27] = "STEAM_GUIDE";
        GamepadButton[GamepadButton["STEAM_QUICK_MENU"] = 28] = "STEAM_QUICK_MENU";
    })(GamepadButton || (GamepadButton = {}));

    findModuleExport((e) => e?.toString && e.toString().includes('.Marquee') && e.toString().includes('--fade-length'));

    // import { fakeRenderComponent } from '../utils';
    findModuleExport((e) => typeof e === 'function' && e.toString().includes('GetContextMenuManagerFromWindow(')
        && e.toString().includes('.CreateContextMenuInstance('));
    findModuleExport((e) => e?.prototype?.HideIfSubmenu && e?.prototype?.HideMenu);
    findModuleExport((e) => e?.render?.toString()?.includes('bPlayAudio:') || (e?.prototype?.OnOKButton && e?.prototype?.OnMouseEnter));
    /*
    all().map(m => {
    if (typeof m !== "object") return undefined;
    for (let prop in m) { if (m[prop]?.prototype?.OK && m[prop]?.prototype?.Cancel && m[prop]?.prototype?.render) return m[prop]}
    }).find(x => x)
    */

    findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (typeof m[prop] === 'function' &&
                m[prop].toString().includes('props.bDisableBackgroundDismiss') &&
                !m[prop]?.prototype?.Cancel) {
                return m[prop];
            }
        }
    });
    findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (typeof m[prop] === 'function' && m[prop].toString().includes('bHideMainWindowForPopouts:!0')) {
                return m[prop];
            }
        }
    });
    findModuleChild((m) => {
        if (typeof m !== 'object')
            return undefined;
        for (let prop in m) {
            if (!m[prop]?.prototype?.OK && m[prop]?.prototype?.Cancel && m[prop]?.prototype?.render) {
                return m[prop];
            }
        }
    });
    // new as of december 2022 on beta
    (Object.values(findModule((m) => {
        if (typeof m !== 'object')
            return false;
        for (let prop in m) {
            if (m[prop]?.m_mapModalManager && Object.values(m)?.find((x) => x?.type)) {
                return true;
            }
        }
        return false;
    }) || {})?.find((x) => x?.type?.toString()?.includes('((function(){')) ||
        // before december 2022 beta
        Object.values(findModule((m) => {
            if (typeof m !== 'object')
                return false;
            for (let prop in m) {
                if (m[prop]?.toString()?.includes('"ModalManager","DialogWrapper"')) {
                    return true;
                }
            }
            return false;
        }) || {})?.find((x) => x?.type?.toString()?.includes('((function(){')) ||
        // old
        findModuleChild((m) => {
            if (typeof m !== 'object')
                return undefined;
            for (let prop in m) {
                if (m[prop]?.prototype?.OK && m[prop]?.prototype?.Cancel && m[prop]?.prototype?.render) {
                    return m[prop];
                }
            }
        }));
    const ModalModule = findModule((mod) => {
        if (typeof mod !== 'object')
            return false;
        for (let prop in mod) {
            if (Object.keys(mod).length > 4 && mod[prop]?.toString().includes('.ModalPosition,fallback:'))
                return true;
        }
        return false;
    });
    const ModalModuleProps = ModalModule ? Object.values(ModalModule) : [];
    ModalModuleProps.find(prop => {
        const string = prop?.toString();
        return string?.includes(".ShowPortalModal()") && string?.includes(".OnElementReadyCallbacks.Register(");
    });
    ModalModuleProps.find(prop => prop?.toString().includes(".ModalPosition,fallback:"));
    var MessageBoxResult;
    (function (MessageBoxResult) {
        MessageBoxResult[MessageBoxResult["close"] = 0] = "close";
        MessageBoxResult[MessageBoxResult["okay"] = 1] = "okay";
    })(MessageBoxResult || (MessageBoxResult = {}));

    const [mod, panelSection] = findModuleDetailsByExport((e) => e.toString()?.includes('.PanelSection'));
    Object.values(mod).filter((exp) => !exp?.toString()?.includes('.PanelSection'))[0];

    findModuleExport((e) => e?.toString()?.includes('.ProgressBar,"standard"=='));
    findModuleExport((e) => e?.toString()?.includes('.ProgressBarFieldStatus},'));
    const progressBarItemRegex = createPropListRegex(["indeterminate", "nTransitionSec", "nProgress"]);
    findModuleExport((e) => e?.toString && progressBarItemRegex.test(e.toString()));

    const sidebarNavigationRegex = createPropListRegex(["pages", "fnSetNavigateToPage", "disableRouteReporting"]);
    findModuleExport((e) => e?.toString && sidebarNavigationRegex.test(e.toString()));

    Object.values(CommonUIModule).find((mod) => mod?.toString()?.includes('SliderField,fallback'));

    // TODO type this and other icons?
    Object.values(IconsModule)?.find((mod) => mod?.toString && /Spinner\)}\)?,.\.createElement\(\"path\",{d:\"M18 /.test(mod.toString()));

    findModuleExport((e) => e?.toString?.()?.includes('Steam Spinner') && e?.toString?.()?.includes('src'));

    let oldTabs;
    try {
        const oldTabsModule = findModuleByExport((e) => e.Unbleed);
        if (oldTabsModule)
            oldTabs = Object.values(oldTabsModule).find((x) => x?.type?.toString()?.includes('((function(){'));
    }
    catch (e) {
        console.error('Error finding oldTabs:', e);
    }

    Object.values(CommonUIModule).find((mod) => mod?.validateUrl && mod?.validateEmail);

    Object.values(CommonUIModule).find((mod) => mod?.render?.toString()?.includes('.ToggleOff)'));

    Object.values(CommonUIModule).find((mod) => mod?.render?.toString()?.includes('ToggleField,fallback'));

    const ScrollingModule = findModuleByExport((e) => e?.render?.toString?.().includes('{case"x":'));
    const ScrollingModuleProps = ScrollingModule ? Object.values(ScrollingModule) : [];
    ScrollingModuleProps.find((prop) => prop?.render?.toString?.().includes('{case"x":'));
    findModuleExport((e) => e?.render?.toString().includes('.FocusVisibleChild()),[])'));

    /**
     * Get the current params from ReactRouter
     *
     * @returns an object with the current ReactRouter params
     *
     * @example
     * import { useParams } from "decky-frontend-lib";
     *
     * const { appid } = useParams<{ appid: string }>()
     */
    Object.values(ReactRouter).find((val) => /return (\w)\?\1\.params:{}/.test(`${val}`));

    // import { sleep } from '../utils';
    var SideMenu;
    (function (SideMenu) {
        SideMenu[SideMenu["None"] = 0] = "None";
        SideMenu[SideMenu["Main"] = 1] = "Main";
        SideMenu[SideMenu["QuickAccess"] = 2] = "QuickAccess";
    })(SideMenu || (SideMenu = {}));
    var QuickAccessTab;
    (function (QuickAccessTab) {
        QuickAccessTab[QuickAccessTab["Notifications"] = 0] = "Notifications";
        QuickAccessTab[QuickAccessTab["RemotePlayTogetherControls"] = 1] = "RemotePlayTogetherControls";
        QuickAccessTab[QuickAccessTab["VoiceChat"] = 2] = "VoiceChat";
        QuickAccessTab[QuickAccessTab["Friends"] = 3] = "Friends";
        QuickAccessTab[QuickAccessTab["Settings"] = 4] = "Settings";
        QuickAccessTab[QuickAccessTab["Perf"] = 5] = "Perf";
        QuickAccessTab[QuickAccessTab["Help"] = 6] = "Help";
        QuickAccessTab[QuickAccessTab["Music"] = 7] = "Music";
        QuickAccessTab[QuickAccessTab["Decky"] = 999] = "Decky";
    })(QuickAccessTab || (QuickAccessTab = {}));
    var DisplayStatus;
    (function (DisplayStatus) {
        DisplayStatus[DisplayStatus["Invalid"] = 0] = "Invalid";
        DisplayStatus[DisplayStatus["Launching"] = 1] = "Launching";
        DisplayStatus[DisplayStatus["Uninstalling"] = 2] = "Uninstalling";
        DisplayStatus[DisplayStatus["Installing"] = 3] = "Installing";
        DisplayStatus[DisplayStatus["Running"] = 4] = "Running";
        DisplayStatus[DisplayStatus["Validating"] = 5] = "Validating";
        DisplayStatus[DisplayStatus["Updating"] = 6] = "Updating";
        DisplayStatus[DisplayStatus["Downloading"] = 7] = "Downloading";
        DisplayStatus[DisplayStatus["Synchronizing"] = 8] = "Synchronizing";
        DisplayStatus[DisplayStatus["ReadyToInstall"] = 9] = "ReadyToInstall";
        DisplayStatus[DisplayStatus["ReadyToPreload"] = 10] = "ReadyToPreload";
        DisplayStatus[DisplayStatus["ReadyToLaunch"] = 11] = "ReadyToLaunch";
        DisplayStatus[DisplayStatus["RegionRestricted"] = 12] = "RegionRestricted";
        DisplayStatus[DisplayStatus["PresaleOnly"] = 13] = "PresaleOnly";
        DisplayStatus[DisplayStatus["InvalidPlatform"] = 14] = "InvalidPlatform";
        DisplayStatus[DisplayStatus["PreloadComplete"] = 16] = "PreloadComplete";
        DisplayStatus[DisplayStatus["BorrowerLocked"] = 17] = "BorrowerLocked";
        DisplayStatus[DisplayStatus["UpdatePaused"] = 18] = "UpdatePaused";
        DisplayStatus[DisplayStatus["UpdateQueued"] = 19] = "UpdateQueued";
        DisplayStatus[DisplayStatus["UpdateRequired"] = 20] = "UpdateRequired";
        DisplayStatus[DisplayStatus["UpdateDisabled"] = 21] = "UpdateDisabled";
        DisplayStatus[DisplayStatus["DownloadPaused"] = 22] = "DownloadPaused";
        DisplayStatus[DisplayStatus["DownloadQueued"] = 23] = "DownloadQueued";
        DisplayStatus[DisplayStatus["DownloadRequired"] = 24] = "DownloadRequired";
        DisplayStatus[DisplayStatus["DownloadDisabled"] = 25] = "DownloadDisabled";
        DisplayStatus[DisplayStatus["LicensePending"] = 26] = "LicensePending";
        DisplayStatus[DisplayStatus["LicenseExpired"] = 27] = "LicenseExpired";
        DisplayStatus[DisplayStatus["AvailForFree"] = 28] = "AvailForFree";
        DisplayStatus[DisplayStatus["AvailToBorrow"] = 29] = "AvailToBorrow";
        DisplayStatus[DisplayStatus["AvailGuestPass"] = 30] = "AvailGuestPass";
        DisplayStatus[DisplayStatus["Purchase"] = 31] = "Purchase";
        DisplayStatus[DisplayStatus["Unavailable"] = 32] = "Unavailable";
        DisplayStatus[DisplayStatus["NotLaunchable"] = 33] = "NotLaunchable";
        DisplayStatus[DisplayStatus["CloudError"] = 34] = "CloudError";
        DisplayStatus[DisplayStatus["CloudOutOfDate"] = 35] = "CloudOutOfDate";
        DisplayStatus[DisplayStatus["Terminating"] = 36] = "Terminating";
    })(DisplayStatus || (DisplayStatus = {}));
    findModuleExport((e) => e.Navigate && e.NavigationManager);
    // try {
    //   (async () => {
    //     let InternalNavigators: any = {};
    //     if (!Router.NavigateToAppProperties || (Router as unknown as any).deckyShim) {
    //       function initInternalNavigators() {
    //         try {
    //           InternalNavigators = findModuleExport((e: Export) => e.GetNavigator && e.SetNavigator)?.GetNavigator();
    //         } catch (e) {
    //           console.error('[DFL:Router]: Failed to init internal navigators, trying again');
    //         }
    //       }
    //       initInternalNavigators();
    //       while (!InternalNavigators?.AppProperties) {
    //         console.log('[DFL:Router]: Trying to init internal navigators again');
    //         await sleep(2000);
    //         initInternalNavigators();
    //       }
    //     }
    //     const newNavigation = {
    //       Navigate: Router.Navigate?.bind(Router),
    //       NavigateBack: Router.WindowStore?.GamepadUIMainWindowInstance?.NavigateBack?.bind(
    //         Router.WindowStore.GamepadUIMainWindowInstance,
    //       ),
    //       NavigateToAppProperties: InternalNavigators?.AppProperties || Router.NavigateToAppProperties?.bind(Router),
    //       NavigateToExternalWeb: InternalNavigators?.ExternalWeb || Router.NavigateToExternalWeb?.bind(Router),
    //       NavigateToInvites: InternalNavigators?.Invites || Router.NavigateToInvites?.bind(Router),
    //       NavigateToChat: InternalNavigators?.Chat || Router.NavigateToChat?.bind(Router),
    //       NavigateToLibraryTab: InternalNavigators?.LibraryTab || Router.NavigateToLibraryTab?.bind(Router),
    //       NavigateToLayoutPreview: Router.NavigateToLayoutPreview?.bind(Router),
    //       NavigateToSteamWeb: Router.WindowStore?.GamepadUIMainWindowInstance?.NavigateToSteamWeb?.bind(
    //         Router.WindowStore.GamepadUIMainWindowInstance,
    //       ),
    //       OpenSideMenu: Router.WindowStore?.GamepadUIMainWindowInstance?.MenuStore.OpenSideMenu?.bind(
    //         Router.WindowStore.GamepadUIMainWindowInstance.MenuStore,
    //       ),
    //       OpenQuickAccessMenu: Router.WindowStore?.GamepadUIMainWindowInstance?.MenuStore.OpenQuickAccessMenu?.bind(
    //         Router.WindowStore.GamepadUIMainWindowInstance.MenuStore,
    //       ),
    //       OpenMainMenu: Router.WindowStore?.GamepadUIMainWindowInstance?.MenuStore.OpenMainMenu?.bind(
    //         Router.WindowStore.GamepadUIMainWindowInstance.MenuStore,
    //       ),
    //       CloseSideMenus: Router.CloseSideMenus?.bind(Router),
    //       OpenPowerMenu: Router.OpenPowerMenu?.bind(Router),
    //     } as Navigation;
    //     Object.assign(Navigation, newNavigation);
    //   })();
    // } catch (e) {
    //   console.error('[DFL:Router]: Error initializing Navigation interface', e);
    // }

    const IPCMain = {
        postMessage: (messageId, contents) => {
            return new Promise((resolve) => {
                const message = { id: messageId, iteration: window.CURRENT_IPC_CALL_COUNT++, data: contents };
                const messageHandler = function (data) {
                    const json = JSON.parse(data.data);
                    /**
                     * wait to receive the correct message id from the backend
                     */
                    if (json.id != message.iteration)
                        return;
                    resolve(json);
                    window.MILLENNIUM_IPC_SOCKET.removeEventListener('message', messageHandler);
                };
                window.MILLENNIUM_IPC_SOCKET.addEventListener('message', messageHandler);
                window.MILLENNIUM_IPC_SOCKET.send(JSON.stringify(message));
            });
        }
    };
    window.MILLENNIUM_BACKEND_IPC = IPCMain;
    window.Millennium = {
        // @ts-ignore (ignore overloaded function)
        callServerMethod: (pluginName, methodName, kwargs) => {
            return new Promise((resolve, reject) => {
                const query = {
                    pluginName,
                    methodName,
                    ...(kwargs && { argumentList: kwargs })
                };
                /* call handled from "src\core\ipc\pipe.cpp @ L:67" */
                window.MILLENNIUM_BACKEND_IPC.postMessage(0, query).then((response) => {
                    if (response?.failedRequest) {
                        reject(` IPC call from [name: ${pluginName}, method: ${methodName}] failed on exception -> ${response.failMessage}`);
                    }
                    const responseStream = response.returnValue;
                    // FFI backend encodes string responses in base64 to avoid encoding issues
                    resolve(typeof responseStream === 'string' ? atob(responseStream) : responseStream);
                });
            });
        },
        AddWindowCreateHook: (callback) => {
            // used to have extended functionality but removed since it was shotty
            g_PopupManager.AddPopupCreatedCallback((e) => {
                callback(e);
            });
        },
        findElement: (privateDocument, querySelector, timeout) => {
            return new Promise((resolve, reject) => {
                const matchedElements = privateDocument.querySelectorAll(querySelector);
                /**
                 * node is already in DOM and doesn't require watchdog
                 */
                if (matchedElements.length) {
                    resolve(matchedElements);
                }
                let timer = null;
                const observer = new MutationObserver(() => {
                    const matchedElements = privateDocument.querySelectorAll(querySelector);
                    if (matchedElements.length) {
                        if (timer)
                            clearTimeout(timer);
                        observer.disconnect();
                        resolve(matchedElements);
                    }
                });
                /** observe the document body for item changes, assuming we are waiting for target element */
                observer.observe(privateDocument.body, {
                    childList: true,
                    subtree: true
                });
                if (timeout) {
                    timer = setTimeout(() => {
                        observer.disconnect();
                        reject();
                    }, timeout);
                }
            });
        },
        exposeObj: function (obj) {
            for (const key in obj) {
                exports[key] = obj[key];
            }
        }
    };
    /**
     * @brief
     * pluginSelf is a sandbox for data specific to your plugin.
     * You can't access other plugins sandboxes and they can't access yours
     *
     * @example
     * | pluginSelf.var = "Hello"
     * | console.log(pluginSelf.var) -> Hello
     */
    window.PLUGIN_LIST[pluginName];
    const Millennium = window.Millennium;

    const painIconID = "adamraichu_custom-artwork-editor_paintIcon";
    const paintSvgPath = `<path d="M25,21v10H11v-4c0-0.276-0.224-0.5-0.5-0.5S10,26.724,10,27v4H9v-8c0-0.276-0.224-0.5-0.5-0.5
	S8,22.724,8,23v8H7V21H25z M26,17v3H6v-3c0-2.2,1.8-4,4-4h1c2.2,0,3.563-1.746,3.03-3.881l-1.06-4.239C12.437,2.746,13.8,1,16,1
	s3.563,1.746,3.03,3.881l-1.06,4.239C17.437,11.254,18.8,13,21,13h1C24.2,13,26,14.8,26,17z M18,4c0-1.105-0.895-2-2-2s-2,0.895-2,2
	c0,1.105,0.895,2,2,2S18,5.105,18,4z"></path>`;

    const popupCSS = `
body {
  background-color: #1f2227;
  color: white;
}

#layout-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
`;

    async function CustomArtworkEditorFrontend() {
        console.log("Custom Artwork Editor Frontend loaded.");
        Millennium.AddWindowCreateHook((context) => {
            if (context.m_strTitle !== LocalizationManager.LocalizeString("#WindowName_SteamDesktop")) {
                console.debug("This is not the window you're looking for.");
                return;
            }
            addButtonToLibrary(context);
        });
    }
    async function addButtonToLibrary(context) {
        const svgContainerSelector = `._1PgAonvorr0o_NMxNKiDFU:not(:has(#${painIconID}))`;
        while (true) {
            const [svgContainer] = await Millennium.findElement(context.m_popup.document, svgContainerSelector);
            const clone = svgContainer.children[1].cloneNode(true);
            clone.id = painIconID;
            const svg = clone.children[0];
            svg.setAttribute("viewBox", "0 0 32 32");
            svg.innerHTML = paintSvgPath;
            svgContainer.appendChild(clone);
            clone.addEventListener("click", () => openGridMenu());
        }
    }
    async function openGridMenu() {
        const response = await wrappedCallServerMethod("getGridInfo", { id: g_PopupManager.m_unCurrentAccountID.toString() });
        const gridInfo = JSON.parse(response);
        console.log({ gridInfo });
        // Create popup
        const win = window.open("about:blank");
        // ReactDOM.render(<CustomArtworkEditor gameIds={["12345"]} />, win.document.body);
        const doc = win.document;
        doc.documentElement.id = "adamraichu_custom-artwork-editor_popup";
        const styles = doc.createElement("style");
        styles.innerText = popupCSS;
        doc.head.appendChild(styles);
        const body = doc.body;
        const layoutContainer = doc.createElement("div");
        layoutContainer.id = "layout-container";
        body.appendChild(layoutContainer);
        // const gameList = doc.createElement("div");
    }

    exports.default = CustomArtworkEditorFrontend;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});

function ExecutePluginModule() {
    // Assign the plugin on plugin list. 
    Object.assign(window.PLUGIN_LIST[pluginName], millennium_main);
    // Run the rolled up plugins default exported function 
    millennium_main["default"]();
    MILLENNIUM_BACKEND_IPC.postMessage(1, { pluginName: pluginName });
}
ExecutePluginModule()