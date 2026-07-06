#!/bin/bash
set -e

echo "After install started"

cd /var/www/autoscale-node-api

npm install --omit=dev

echo "After install completed"