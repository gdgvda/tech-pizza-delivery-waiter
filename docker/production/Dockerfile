#
# PHP Dependencies Stage
#
FROM composer:1.10 AS vendor
COPY composer.json composer.json
COPY composer.lock composer.lock
RUN composer install \
 --ignore-platform-reqs \
 --no-interaction \
 --no-plugins \
 --no-scripts \
 --no-dev \
 --prefer-dist
#
# Final Stage
#
FROM php:8.3-apache

RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/*.conf \
 && sed -ri -e 's!/var/www/!/var/www/html/public!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN /usr/sbin/a2enmod rewrite \
 && /usr/sbin/a2enmod headers \
 && /usr/sbin/a2enmod expires

COPY --from=vendor /app/vendor/ /var/www/html/vendor/
COPY . /var/www/html/

RUN apt-get update && apt-get install -y tzdata \
 && ln -sf /usr/share/zoneinfo/Europe/Rome /etc/localtime \
 && dpkg-reconfigure -f noninteractive tzdata \
 && echo "date.timezone = Europe/Rome" > /usr/local/etc/php/conf.d/timezone.ini \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN chown -R www-data:www-data /var/www/html

WORKDIR /var/www/html/public

USER www-data
