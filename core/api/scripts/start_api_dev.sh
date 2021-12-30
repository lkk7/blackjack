#!/bin/bash
# Start the api 
uvicorn api.api:app --reload --host 0.0.0.0 --port 8000