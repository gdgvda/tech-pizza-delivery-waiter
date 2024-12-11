# Tech&amp;Pizza Delivery Waiter

> A simple event delivery booking management system

Production: https://tpdw.zavy.im

Development: http://localhost:3000/

Docker Image: https://hub.docker.com/r/gdgvda/tech-pizza-delivery-waiter

## Development

Start developing cloning repository

`git clone https://github.com/gdgvda/tech-pizza-delivery-waiter.git`

Install node dependencies

`npm install`

Run in watch mode

`npm run watch`

############################ todo
## Production

### Build production image and test in compose

Build Docker containers for production (you can choose any port)

`make production CUSTOM_PORT=8090`

### Release and deploy

Release are automatically built with GitHub Actions and available in Docker Hub
