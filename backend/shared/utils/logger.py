import logging

from shared.config.environment import is_production


streamer = logging.StreamHandler()

formatter = logging.Formatter('%(asctime)s  - %(levelname)s: %(message)s')


def create_logger():
    logger = logging.getLogger()

    if is_production():
        logger.setLevel(logging.INFO)
    else:
        logger.setLevel(logging.DEBUG)

    streamer.setFormatter(formatter)

    logger.addHandler(streamer)

    return logger
