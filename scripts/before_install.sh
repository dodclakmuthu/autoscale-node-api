#!/bin/bash
set -e

echo "Before install start"

mkdir -p /var/www/autoscale-node-api

if pm2 list | grep -q autoscale-node-api; then
    pm2 stop autoscale-node-api || true
    pm2 delete autoscale-node-api || true
fi

echo "Before install completed"
