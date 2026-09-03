# 🗺️ django-map-libre

[![Django version](https://img.shields.io/badge/django-5.0+-green.svg)](https://www.djangoproject.com/)
[![Python version](https://img.shields.io/badge/python-3.14+-blue.svg)](https://www.python.org/)
[![License: 0BSD](https://img.shields.io/badge/License-0BSD-blueviolet)](https://opensource.org/licenses/0BSD)
[![Code style: Ruff](https://img.shields.io/badge/code%20style-ruff-000000)](https://github.com/astral-sh/ruff)
[![Built with uv](https://img.shields.io/badge/built%20with-uv-236B4E)](https://github.com/astral-sh/uv)

---

**django-map-libre** is a lightweight integration package that brings [MapLibre GL](https://maplibre.org/) into your Django project with minimal effort.

---

## 🧰 Requirements

- Python 3.14+
- Django 5.0+
- Node.js 20+ (for frontend tooling)
- Corepack (for Yarn package management)

---

## 🛠️ Development Setup

1. Clone the repository

```bash
git clone git@github.com:TheRealVizard/django-map-libre.git
cd django-map-libre
```

2. Set up Python environment with `uv`
We use [uv](https://github.com/astral-sh/uv) for fast Python dependency management.

```bash
# Install uv if you don't have it
curl -LsSf https://astral.sh/uv/install.sh | sh

# Create a virtual environment and install dependencies
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
uv sync
```
3. Set up frontend tooling with Corepack

We use Yarn (via Corepack) to manage JavaScript dependencies linters.
```bash
# Enable Corepack (Node.js >= 20)
corepack enable

# Install Yarn dependencies
yarn install
```

4. Install pre-commit hooks
We use [pre-commit](https://pre-commit.com/) to enforce code quality before each commit.

```bash
# Install pre-commit hooks
pre-commit install

# (Optional) Run against all files
pre-commit run --all-files
```