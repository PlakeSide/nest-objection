#!/usr/bin/env bash

set -e

psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" <<-EOSQL
  CREATE USER nest_objection_development;
  CREATE DATABASE nest_objection_development ENCODING UTF8;
  GRANT ALL PRIVILEGES ON DATABASE nest_objection_development TO nest_objection_development;

  ALTER USER nest_objection_development WITH PASSWORD 'password123';
  ALTER USER nest_objection_development WITH SUPERUSER;
EOSQL
