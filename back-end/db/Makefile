ifdef DB_HOST
	HOST = $(DB_HOST)
else
	HOST = localhost
endif

ifdef DB_SU_PASSWORD
	SU_PASSWORD = $(DB_SU_PASSWORD)
else
	SU_PASSWORD = ''
endif

build:
	docker-compose down
	docker-compose build

drop-db:
	@psql -U postgres \
		-d postgres \
		-c "select pg_terminate_backend(pid) from pg_stat_activity where datname = 'desk_bookings';" > /dev/null
	dropdb -U postgres desk_bookings

create-schema:
	@PGPASSWORD=$(SU_PASSWORD) createdb -U postgres --host $(HOST) desk_bookings
	@set -e; for migration in ./migrations/*.sql; do \
		echo "## RUNNING MIGRATION $$migration ##"; \
		PGPASSWORD=$(SU_PASSWORD) psql \
			-U postgres \
			--host $(HOST) \
			--dbname=desk_bookings \
			--quiet -f $$migration \
			--set ON_ERROR_STOP=1; \
	done;

start:
	postgres -D /usr/local/var/postgres

reset: drop-db create-schema