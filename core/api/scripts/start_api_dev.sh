#!/bin/bash
# Start the api for local development, on port 8000
uvicorn api.api:app --reload --host 0.0.0.0 --port 8000