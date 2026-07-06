#!/bin/bash
set -e

echo "Starting application"

cd /var/www/autoscale-node-api

pm2 start ecosystem.confih.js
pm2 save

echo "Application started"