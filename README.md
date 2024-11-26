# Tech&amp;Pizza Delivery Waiter

> A simple event delivery booking management system

Production: https://tpdw.zavy.im

Development: http://localhost:8080/

## Development

Start developing cloning repository

`git clone https://github.com/gdgvda/tech-pizza-delivery-waiter.git`

Install composer dependencies

`composer install`

Build Docker containers

`make development CUSTOM_PORT=8080`

## Production

### Build production image and test in compose

Build Docker containers for production

`make production CUSTOM_PORT=8090`

### Release and deploy

Release are automatically built with GitHub Actions
