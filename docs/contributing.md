
# Contributing

## Requirements

- Python 3.14+
- Django 5.0+
- Node.js 24 LTS (managed via [nvm](https://github.com/nvm-sh/nvm))
- Corepack (for Yarn package management)

## Setup

Clone the repository:

```bash
git clone git@github.com:TheRealVizard/django-map-libre.git
cd django-map-libre
```

Set up the Python environment with [uv](https://github.com/astral-sh/uv):

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
uv sync
```

Install Node.js 24 LTS with nvm:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 24
nvm use 24
```

Set up Yarn:

```bash
corepack enable
corepack prepare yarn@stable --activate
yarn install
```

Install pre-commit hooks:

```bash
pre-commit install
pre-commit run --all-files
```

Run the development server:

```bash
make run
```

## Make commands

| Command | Description |
| :--- | :--- |
| `make help` | Show the help message. |
| `make install` | Install frontend dependencies with Yarn. |
| `make install-vscode` | Set up the Yarn SDK for VS Code. |
| `make build` | Build frontend assets (`yarn build`). |
| `make pc` | Run pre-commit hooks on all files. |
| `make run` | Build assets and start the Django server. |
```
