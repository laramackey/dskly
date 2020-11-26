FROM postgres:10-alpine
ADD ./migrations /docker-entrypoint-initdb.d/
ENV POSTGRES_DB desk_bookings
ENV POSTGRES_PASSWORD='password'