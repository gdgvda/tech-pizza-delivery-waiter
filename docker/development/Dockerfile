FROM php:8.3-apache

RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/*.conf \
 && sed -ri -e 's!/var/www/!/var/www/html/public!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN /usr/sbin/a2enmod rewrite \
 && /usr/sbin/a2enmod headers \
 && /usr/sbin/a2enmod expires

RUN pecl install xdebug \
 && docker-php-ext-enable xdebug

RUN apt-get update && apt-get install -y tzdata \
 && ln -sf /usr/share/zoneinfo/Europe/Rome /etc/localtime \
 && dpkg-reconfigure -f noninteractive tzdata \
 && echo "date.timezone = Europe/Rome" > /usr/local/etc/php/conf.d/timezone.ini \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
