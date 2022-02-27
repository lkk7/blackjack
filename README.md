# blackjack

[![build status](https://img.shields.io/github/workflow/status/lkk7/blackjack/Test?label=build%20and%20tests)](https://github.com/lkk7/blackjack/actions/workflows/test.yml)
[![CodeFactor](https://www.codefactor.io/repository/github/lkk7/blackjack/badge/main)](https://www.codefactor.io/repository/github/lkk7/blackjack/overview/main)

![python 3.10+](https://img.shields.io/badge/python-3.10%2B-darkgreen)
![FastAPI](https://img.shields.io/badge/-FastAPI-teal)
![C++20](https://img.shields.io/badge/-C%2B%2B20-blue)
![TypeScript](https://img.shields.io/badge/-TypeScript-darkblue)
![React](https://img.shields.io/badge/-React-9cf)

An experimental project that explores C++ --> Python bindings (made using [pybind11](https://github.com/pybind/pybind11)) and utilizes them to create a Blackjack game service with Python/FastAPI/React/TypeScript.


![Project diagram](diagram.png)

Note: such C++ --> Python bindings aren't a good idea for a simple blackjack game server. We don't have problems with the game's performance itself, so we're only introducing more complexity. However, it was just an interesting thing for me to develop while learning about the bindings.

- Front-end test coverage: [![codecov](https://codecov.io/gh/lkk7/blackjack/branch/main/graph/badge.svg?token=LMGF0XTSEX)](https://codecov.io/gh/lkk7/blackjack)
- C++ core test coverage: Probably ~99%
- API test coverage: not tested (yet?) :(

## How to start (docker + docker-compose needed)
You have to `git clone` this repository with a `--recursive` flag because it contains the [pybind11](https://github.com/pybind/pybind11) submodule in `core/cpp/extern/pybind11`.
```bash
docker-compose build
docker-compose up -d
cd frontend && npm install
npm start
```
Then, check [http://localhost:3000/](http://localhost:3000/).

## Some screenshots

#1

<img width="1000" alt="Game screenshot" src="https://user-images.githubusercontent.com/14022447/155851418-e3074421-ef99-4c25-a289-fab80e6af257.png">

#2

<img width="1000" alt="Game screenshot" src="https://user-images.githubusercontent.com/14022447/155851456-54b5f421-f8e7-4ef4-be3e-5412cc472469.png">
