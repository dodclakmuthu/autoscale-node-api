#!/bin/bash
set -e

echo "Validating services"

sleep 5
curl -f http://localhost:3000/health

echo "Service validation passed"