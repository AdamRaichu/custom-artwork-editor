from configparser import ConfigParser
from constants import USER_META_SECTION, CONFIG_FILE_PATH
from log_util import logger

hasLoaded = False


class ConfigManager:
    def reload():
        logger.log("Reloading config.")
        config.read(CONFIG_FILE_PATH)
        if len(config.sections()) == 0:
            ConfigManager._createDefault()
            return

    def _createDefault():
        logger.log("Creating default config.")
        config.add_section(USER_META_SECTION)
        config.set(USER_META_SECTION, "user_id", "0")

    def get(section, key):
        return config.get(section, key)

    def save():
        logger.log("Saving config to " + CONFIG_FILE_PATH)
        with open(CONFIG_FILE_PATH, "w") as f:
            config.write(f)


config = ConfigParser()
ConfigManager.reload()
