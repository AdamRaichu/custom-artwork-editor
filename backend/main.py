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
    dirNames = os.listdir(os.path.join(Millennium.steam_path(), "userdata"))
    obj = {"dirs": dirNames}
    return encoder.encode(obj)


plugin = CustomArtworkEditorBackend()
plugin._load()
