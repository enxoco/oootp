#!/bin/sh
set -e

node ace migration:run --force

exec node bin/server.js
