#!/bin/bash
set -e

if [ "$(id -u)" = "0" ]; then
    if [ -d "/var/www/html/storage" ]; then
        chown -R www-data:www-data /var/www/html/storage
        chmod -R 775 /var/www/html/storage
    fi
    
    if [ -d "/var/www/html/bootstrap/cache" ]; then
        chown -R www-data:www-data /var/www/html/bootstrap/cache
        chmod -R 775 /var/www/html/bootstrap/cache
    fi
fi

if [ ! -f "/var/www/html/.env" ] && [ -f "/var/www/html/.env.example" ]; then
    cp /var/www/html/.env.example /var/www/html/.env
fi

if [ ! -d "/var/www/html/vendor" ]; then
    composer install --no-interaction --no-progress
fi

if grep -q "APP_KEY=" "/var/www/html/.env" && ! grep -q "APP_KEY=.*[^\s]" "/var/www/html/.env"; then
    php artisan key:generate
fi

# php artisan migrate --force

exec "$@"