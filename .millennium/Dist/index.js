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
(function () {
	'use strict';



})();

function ExecutePluginModule() {
    // Assign the plugin on plugin list. 
    Object.assign(window.PLUGIN_LIST[pluginName], millennium_main);
    // Run the rolled up plugins default exported function 
    millennium_main["default"]();
    MILLENNIUM_BACKEND_IPC.postMessage(1, { pluginName: pluginName });
}
ExecutePluginModule()