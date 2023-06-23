FROM php:8.2.7-fpm

ENV COMPOSER_MEMORY_LIMIT='-1'

RUN apt-get update && \
    apt-get install -y --force-yes \
    unzip \
    libmemcached-dev \
    libmcrypt-dev \
    libreadline-dev \
    libgmp-dev \
    libzip-dev \
    libz-dev \
    libpq-dev \
    libjpeg-dev \
    libpng-dev \
    libfreetype6-dev \
    libssl-dev \
    libjpeg62-turbo-dev \
    openssh-server \
    libmagickwand-dev \
    git \
    cron \
    nano \
    telnet \
    libxml2-dev \
    mariadb-client \
    libaio1 \
    libldap2-dev \
    supervisor

# Install soap extention
RUN docker-php-ext-install soap

# Install for image manipulation
RUN docker-php-ext-install exif

# Install the PHP pcntl extention
RUN docker-php-ext-install pcntl

# Install the PHP intl extention
RUN docker-php-ext-install intl

# Install the PHP gmp extention
RUN docker-php-ext-install gmp

# Install the PHP zip extention
RUN docker-php-ext-install zip

# Install the PHP pdo_mysql extention
RUN docker-php-ext-install pdo_mysql

# Install the PHP pdo_pgsql extention
RUN docker-php-ext-install pdo_pgsql

# Install the PHP bcmath extension
RUN docker-php-ext-install bcmath

# Install the PHP opcache extension
RUN docker-php-ext-install opcache

# Install the PHP PDO extension
RUN docker-php-ext-install pdo

# Install the PHP mysqli extension
RUN docker-php-ext-install mysqli

#####################################
# PHPRedis:
#####################################
RUN pecl uninstall redis
RUN pecl install redis && docker-php-ext-enable redis

#####################################
# Imagick:
#####################################
RUN pecl uninstall imagick
RUN pecl install imagick && docker-php-ext-enable imagick

#####################################
# GD:
#####################################
RUN docker-php-ext-install gd && \
    docker-php-ext-configure gd \
    --with-jpeg=/usr/lib \
    --with-freetype=/usr/include/freetype2 && \
    docker-php-ext-install gd

#####################################
# xDebug:
#####################################

# Install the xdebug extension
RUN pecl uninstall xdebug
RUN pecl install xdebug

#####################################
# PHP Memcached:
#####################################

# Install the php memcached extension
RUN pecl uninstall memcached
RUN pecl install memcached && docker-php-ext-enable memcached


# Install Oracle instantclient
ADD ./docker/php/lib/instantclient-basiclite-linux.x64-21.10.0.0.0dbru.zip /tmp/
ADD ./docker/php/lib/instantclient-sdk-linux.x64-21.10.0.0.0dbru.zip /tmp/
ADD ./docker/php/lib/instantclient-sqlplus-linux.x64-21.10.0.0.0dbru.zip /tmp/

RUN unzip /tmp/instantclient-basiclite-linux.x64-21.10.0.0.0dbru.zip -d /usr/local/
RUN unzip /tmp/instantclient-sdk-linux.x64-21.10.0.0.0dbru.zip -d /usr/local/
RUN unzip /tmp/instantclient-sqlplus-linux.x64-21.10.0.0.0dbru.zip -d /usr/local/

ENV LD_LIBRARY_PATH /usr/local/instantclient_21_10/

RUN ln -s /usr/local/instantclient_21_10 /usr/local/instantclient
RUN ln -s /usr/local/instantclient/sqlplus /usr/bin/sqlplus

RUN echo 'export LD_LIBRARY_PATH="/usr/local/instantclient"' >> /root/.bashrc
RUN echo 'umask 002' >> /root/.bashrc

RUN pecl uninstall oci8
RUN echo 'instantclient,/usr/local/instantclient' | pecl install oci8
RUN docker-php-ext-configure pdo_oci --with-pdo-oci=instantclient,/usr/local/instantclient
RUN docker-php-ext-install pdo_oci
RUN docker-php-ext-enable oci8


#####################################
# Composer:
#####################################

# Install composer and add its bin to the PATH.
RUN curl -s http://getcomposer.org/installer | php && \
    echo "export PATH=${PATH}:/var/www/vendor/bin" >> ~/.bashrc && \
    mv composer.phar /usr/local/bin/composer
# Source the bash
RUN . ~/.bashrc

#####################################
# Supervisor Laravel worker:
#####################################
# ADD ./php/laravel-worker.conf /etc/supervisor/conf.d/laravel-worker.conf

# RUN touch /var/run/supervisor.sock && chmod 775 /var/run/supervisor.sock
# RUN unlink /var/run/supervisor.sock
# RUN supervisord -c /etc/supervisor/supervisord.conf
# RUN supervisorctl reread && supervisorctl update && supervisorctl start laravel-worker:*

#
#--------------------------------------------------------------------------
# Final Touch
#--------------------------------------------------------------------------
#

WORKDIR /var/www/ktnn

# RUN chmod -R 775 /var/www/ktnn
RUN chown -R www-data:www-data /var/www/ktnn

# COPY ./php/supervisord.conf /etc/supervisor/supervisord.conf
COPY ./docker/php/startup.sh /startup.sh

EXPOSE 9000

CMD ["sh", "/startup.sh"]