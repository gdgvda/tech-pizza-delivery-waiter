# Tech&amp;Pizza Delivery Waiter

> A simple event delivery booking management system

Production: https://tpdw.zavy.im

Development: http://localhost:8080/

Docker Image: https://hub.docker.com/r/gdgvda/tech-pizza-delivery-waiter

## Development

Start developing cloning repository

`git clone https://github.com/gdgvda/tech-pizza-delivery-waiter.git`

Install composer dependencies

`composer install`

Build Docker containers (you can choose any port)

`make development CUSTOM_PORT=8080`

## Production

### Build production image and test in compose

Build Docker containers for production (you can choose any port)

`make production CUSTOM_PORT=8090`

### Release and deploy

Release are automatically built with GitHub Actions and available in Packages
