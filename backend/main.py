import Millennium, PluginUtils  # type: ignore
from config import ConfigManager
from log_util import logger
from constants import USER_META_SECTION


user_id = ""

# TODO: Refactor required based on new brainstorming.


class CustomArtworkEditorBackend:
    def _load(self):
        user_id = ConfigManager.get(USER_META_SECTION, "user_id")
        Millennium.ready()
        logger.log("Custom Artwork Editor plugin loaded")
        logger.log(user_id)
        pass

    def _unload(self):
        logger.log("Custom Artwork Editor plugin unloaded")
        ConfigManager.save()
        pass


plugin = CustomArtworkEditorBackend()
plugin._load()
