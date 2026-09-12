# =============================================================================
# Django Map Libre - Makefile
# =============================================================================

# Colors
GREEN  := \033[0;32m
YELLOW := \033[0;33m
BLUE   := \033[0;34m
RED    := \033[0;31m
NC     := \033[0m # No Color

.PHONY: help pc install install-vscode build run

help:
	@printf "$(GREEN)Available commands:$(NC)\n"
	@printf "  $(YELLOW)make pc$(NC)             - Run pre-commit on all files\n"
	@printf "  $(YELLOW)make install$(NC)        - Install frontend dependencies (yarn install)\n"
	@printf "  $(YELLOW)make install-vscode$(NC) - Set up Yarn OnP SDK for VS Code\n"
	@printf "  $(YELLOW)make build$(NC)          - Build frontend assets (yarn build)\n"
	@printf "  $(YELLOW)make run$(NC)            - Build assets and run Django development server\n"

pc:
	@printf "$(BLUE)Running pre-commit on all files...$(NC)\n"
	pre-commit run --all-files

install:
	@printf "$(BLUE)Installing frontend dependencies with yarn...$(NC)\n"
	yarn install
	@printf "$(BLUE)Rebuilding esbuild native binary for OnP...$(NC)\n"
	yarn rebuild esbuild

install-vscode:
	@printf "$(BLUE)Setting up Yarn OnP SDK for VS Code...$(NC)\n"
	yarn dlx @yarnpkg/sdks vscode
	@printf "$(GREEN)Done! Now open VS Code, run 'Select TypeScript Version' and pick 'Use Workspace Version'.$(NC)\n"

build:
	@printf "$(BLUE)Building frontend assets with yarn...$(NC)\n"
	yarn build

run:
	@printf "$(BLUE)Building frontend assets...$(NC)\n"
	yarn build
	@printf "$(GREEN)Starting Django development server...$(NC)\n"
	python manage.py runserver
