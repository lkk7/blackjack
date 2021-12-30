# build:
# docker build -t blackjack/core .

# run a container with bash:
# docker run -p 80:8000 -it --name blackjack-core blackjack/core /bin/bash

# run a container with bash for general development 
# (overwrite everything with the local repo):
# docker run -p 80:8000 -it --name blackjack-core --mount type=bind,source="$(pwd)",target=/core blackjack/core /bin/bash

# run a container with bash for python api development 
# (overwrite the api with the local repo):
# docker run -p 80:8000 -it --name blackjack-core --mount type=bind,source="$(pwd)/api",target=/core/api blackjack/core /bin/bash

FROM python:3.10-bullseye
COPY . /core/
WORKDIR /core
ENV PYTHONPATH="/core/api" \
    POETRY_VERSION=1.1.11
RUN DEBIAN_FRONTEND='noninteractive' \
    apt-get update -y && apt-get install -y --no-install-recommends \
    cmake \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && pip install --no-cache-dir "poetry==$POETRY_VERSION" \
    && cd /core/cpp && scripts/build_bindings.sh \
    && cd /core/api && scripts/get_cpp_module.sh \
    && poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi
