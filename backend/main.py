import Millennium, PluginUtils  # type: ignore
import json
import os

# from config import ConfigManager
from log_util import logger
from constants import USER_META_SECTION


# TODO: Refactor required based on new brainstorming.


class CustomArtworkEditorBackend:
    def _load(self):
        # user_id = ConfigManager.get(USER_META_SECTION, "user_id")
        Millennium.ready()
        logger.log("Custom Artwork Editor plugin loaded")
        pass

    def _front_end_loaded(self):
        pass

    def _unload(self):
        logger.log("Custom Artwork Editor plugin unloaded")
        # ConfigManager.save()
        pass


encoder = json.JSONEncoder()


def getGridInfo(id: str):
    userConfigPath = os.path.join(Millennium.steam_path(), "userdata", id, "config")
    configFolderFiles = os.listdir(userConfigPath)

    if not ("grid" in configFolderFiles):
        # User does not yet have any custom artwork.
        return []

    # @see frontend/project.d.ts@GridInfoResponse
    obj = {"jsonFiles": [], "imageFiles": []}

    gridPath = os.path.join(userConfigPath, "grid")
    gridItems = os.listdir(gridPath)
    for item in gridItems:
        if item.endswith(".json"):
            with open(os.path.join(gridPath, item), "r") as f:
                obj["jsonFiles"].append(json.load(f))
        else:
            obj["imageFiles"].append(item)

    return encoder.encode(obj)


plugin = CustomArtworkEditorBackend()
plugin._load()
