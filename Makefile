BACKEND = backend
FRONTEND = frontend

APPS = $(BACKEND) $(FRONTEND)

.PHONY: migrate-db
migrate-db:
	@echo "Start DB Migration"
	cd ${BACKEND} && pnpm run db:migrate
	@echo "DB Migration Done."

.PHONY: create-db-seeder
create-db-seeder:
	@echo "Create DB Seeder"
	cd ${BACKEND} && pnpm run db:seed
	@echo "Create DB Seeder Done."

.PHONY: start
start:
	@echo "Starting backend and frontend..."
	pm2 start ecosystem.config.js
	@echo "Backend and frontend started."

.PHONY: delete
delete:
	@echo "Deleting frontend and backend from pm2..."
	@for app in $(APPS); do \
		echo "Deleting $$app..."; \
		pm2 delete "$$app" || true; \
	done
	@echo "All apps have been deleted from pm2."

.PHONY: stop
stop:
	@echo "Stopping frontend and backend from pm2..."
	@for app in $(APPS); do \
		echo "Stopping $$app..."; \
		pm2 stop "$$app" || true; \
	done
	@echo "All apps have been stop from pm2."

.PHONY: clean
clean:
	@echo "Cleaning up build artifacts and dependencies..."
	@echo "Cleaning apps..."
	rm -rf **/*build **/*dist **/*dist **/*.output **/*node_modules
	@echo "Cleaning root workspace..."
	rm -rf *node_modules
	@echo "Clean up completed."