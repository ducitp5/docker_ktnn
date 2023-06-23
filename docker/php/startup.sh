#!/bin/bash

/usr/bin/supervisord -n -c /etc/supervisor/supervisord.conf
sudo chown -R www-data:www-data /var/www/ktnn