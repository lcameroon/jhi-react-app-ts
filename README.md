# React WebApp (TypeScript)

This application was generated using `create-react-app`, you can find documentation and help at [create-react-app][].

## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1.  [Node.js][]: We use Node to run a development web server and build the project.
    Depending on your system, you can install Node either from source or as a pre-packaged bundle.
2.  [Yarn][]: We use Yarn to manage Node dependencies.
    Depending on your system, you can install Yarn either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

```bash
yarn install
```

We use yarn scripts and [Webpack][] as our build system.

Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

```bash
yarn start
# with mock api
yarn run start:mock
```

[Yarn][] is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `yarn update` and `yarn install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `yarn help update`.

The `yarn run` command will list all of the scripts available to run for this project.

### Service workers

Service workers are commented by default, to enable them please uncomment the following code.

- The service worker registering script in index.html

```html
<script>
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
        .register('./service-worker.js')
        .then(function() { console.log('Service Worker Registered'); });
    }
</script>
```

Note: workbox creates the respective service worker and dynamically generate the `service-worker.js`

## Building for production

To optimize the JHipsterReactWebApp application for production, run:

    yarn run build

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.

## Testing

Unit tests are run by [Jest][] and written with [Jasmine][]. They're located in [src/test/](src/test/) and can be run with:

    yarn test

UI end-to-end tests are powered by [Protractor][], which is built on top of WebDriverJS. They're located in [src/test/e2e](src/test/e2e)
and can be run by starting Mock API (json-server) in one terminal (`yarn run mock:server`) and running the tests (`yarn run e2e`) in a second one.

[gatling]: http://gatling.io/
[node.js]: https://nodejs.org/
[yarn]: https://yarnpkg.org/
[webpack]: https://webpack.github.io/
[jest]: https://facebook.github.io/jest/
[jasmine]: http://jasmine.github.io/2.0/introduction.html
[protractor]: https://angular.github.io/protractor/
[create-react-app]: https://github.com/facebook/create-react-app/
