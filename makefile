# =============================================================================
# Django Map Libre - Makefile
# =============================================================================

# Colors
GREEN  := \033[0;32m
YELLOW := \033[0;33m
BLUE   := \033[0;34m
RED    := \033[0;31m
NC     := \033[0m # No Color

.PHONY: help pc build run

help:
	@printf "$(GREEN)Available commands:$(NC)\n"
	@printf "  $(YELLOW)make pc$(NC)    - Run pre-commit on all files\n"
	@printf "  $(YELLOW)make build$(NC) - Build frontend assets (yarn build)\n"
	@printf "  $(YELLOW)make run$(NC)   - Build assets and run Django development server\n"

pc:
	@printf "$(BLUE)Running pre-commit on all files...$(NC)\n"
	pre-commit run --all-files

build:
	@printf "$(BLUE)Building frontend assets with yarn...$(NC)\n"
	yarn build

run:
	@printf "$(BLUE)Building frontend assets...$(NC)\n"
	yarn build
	@printf "$(GREEN)Starting Django development server...$(NC)\n"
	python manage.py runserver
