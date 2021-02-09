[![npm](https://img.shields.io/npm/v/@holaluz/margarita.svg)](https://img.shields.io/npm/v/@holaluz/margarita.svg)
[![deploy](https://github.com/holaluz/margarita/workflows/Build%20and%20Deploy/badge.svg)](https://github.com/holaluz/margarita/workflows/Build%20and%20Deploy/badge.svg)

![margarita](margarita.png)

# Margarita

Margarita is the UI Library from Holaluz.

Check out [component examples](https://holaluz.github.io/margarita/).

**WARNING**: While Margarita is open source, its purpose is to improve code quality, consistency, and cross-team collaboration at Holaluz. Thus, it’s likely that we will introduce breaking API changes more often than usual.

## About Margarita

* Built on top of [@vue/cli](https://cli.vuejs.org/).
* Uses [Storybook](https://github.com/storybooks/storybook) to develop, showcase, and test each component.
* Unit testing based on [Jest](https://jestjs.io/) and [Vue Testing Library](https://github.com/testing-library/vue-testing-library).


## Installing Margarita in another project

The NPM package is available [here](https://www.npmjs.com/package/@holaluz/margarita/).

You can install Margarita as a dependency by running the following command in your Vue project:

```bash
$ npm install -D @holaluz/margarita
```

And then, use it as a plugin:

```js
import Vue from 'vue'
import Margarita from '@holaluz/margarita'

Vue.use(Margarita)
```

### Installing in Nuxt

First, install [`@nuxtjs/style-resources`](https://github.com/nuxt-community/style-resources-module):

```bash
npm install @nuxtjs/style-resources
```

Then, create a plugin for Margarita:

```js
// plugins/margarita.js

import Vue from 'vue'
import Margarita from '@holaluz/margarita'
import '@holaluz/margarita/dist/margarita.css'

Vue.use(Margarita)
```

And finally, add the following config on the Nuxt Config file:

```js
// nuxt.config.js

export default {
  // Install the plugin
  plugins: [
    './plugins/margarita.js',
  ],

  // Register style-resources module
  modules: ['@nuxtjs/style-resources'],

  // Add Margarita tokens to each SFC style block
  styleResources: {
    scss: ['@holaluz/margarita/dist/scss/_margarita-tokens.scss'],
  },
}
```


## Installing Margarita locally

Clone the repo and install node dependencies:

```bash
$ npm install
```

Then you can run several commands such as

```bash
# run storybook locally
$ npm start

# run unit tests
$ npm test

# run unit tests with watch mode enabled
$ npm run test:watch
```


## Deployment and versioning

Margarita uses [Semantic Release](https://github.com/semantic-release/semantic-release/) to handle the release pipeline.

Triggering a new release will create the associated Git tag, the GitHub release entry, and publish a new version on [npm](https://www.npmjs.com/package/@holaluz/margarita).

In order to trigger a new version, make sure you add the appropriate prefix and message to the squashed commit. It is based on the [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines). In short:

```bash
# Creates a patch release (v1.0.0 -> v1.0.1)
> fix: commit message

# Creates a feature release (v1.0.0 -> v1.1.0)
> feat: commit message

# Creates a breaking release (v1.0.0 -> v2.0.0)
> fix: commit message
>
> BREAKING CHANGE: explain the breaking change # "BREAKING CHANGE:" is what triggers the breaking release
```

There's no need to overcomplicate things here. Keep it simple: `fix`, `feat`, and `chore` (plus `BREAKING CHANGE`) should be enough for now.

## FAQ

### How can I use Margarita as a dependency in a local project?

More often than not we'd want to work on a consumer while tweaking Magarita.

The best way to do so is by installing Margarita as a local dependency. Check out the instructions in [Local Installation](LOCAL_INSTALLATION.md).

### How can I contribute to documentation?

Follow the edition guidelines [here](https://github.com/holaluz/margarita/tree/master/docs/README.md)
