"""
Module to handle directory paths and configurations.

This module provides variables/constants to store directory paths for data, logs, backend, 
and requirements. It also includes a function to determine the base directory depending on whether
the script is running in a bundled environment or a normal Python environment.

Constants:
- BASE_DIR: Base directory path of the project.
- DATA_DIR: Directory path for storing data files.
- DATA_ENTITIES_DIR: Directory path for storing entities data.
- DATA_EXPOSURES_DIR: Directory path for storing exposures data.
- DATA_HAZARDS_DIR: Directory path for storing hazards data.
- DATA_TEMP_DIR: Directory path for storing temporary data.
- LOG_DIR: Directory path for storing log files.
- BACKEND_DIR: Directory path for the backend code.
- REQUIREMENTS_DIR: Directory path for storing requirements files.

Functions:
- get_base_dir(): Function to determine the base directory path depending on the environment.

Author: [SWORD] Georgios Kalomalos
Email: georgios.kalomalos@sword-group.com
Date: 23/4/2024
"""

from pathlib import Path
import sys


def get_base_dir():
    if getattr(sys, "frozen", False):
        # We are running in a bundle (packaged by Electron)
        return Path(sys.executable).parent.parent
    else:
        # We are running in a normal Python environment (development)
        return Path(__file__).resolve().parent.parent


BASE_DIR = get_base_dir()

# DATA
DATA_DIR = BASE_DIR / "data"
DATA_ENTITIES_DIR = DATA_DIR / "entities"
DATA_EXPOSURES_DIR = DATA_DIR / "exposures"
DATA_HAZARDS_DIR = DATA_DIR / "hazards"
DATA_TEMP_DIR = DATA_DIR / "temp"

# LOGS
LOG_DIR = BASE_DIR / "logs"

# BACKEND
BACKEND_DIR = BASE_DIR / "backend"

# REQUIREMENTS
REQUIREMENTS_DIR = BASE_DIR / "requirements"
