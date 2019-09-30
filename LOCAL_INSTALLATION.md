# Installing Margarita locally

## Requirements

You need to have `npm-link-shared` globally installed:

```bash
npm install -g npm-link-shared
```

(You can skip this step if you prefer using [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)).

You'll also need a local copy of Margarita and the project you want to install
Margarita to.


## Instructions

1. Create a link between your project dependecies and your local copy of
Margarita:

```bash
npm-link-shared path/to/folder/where/margarita/lives/ path/to/project/ @holaluz/margarita
```

This will create a link between `path/to/project/node_modules/margarita/` and
`path/to/folder/where/margarita/lives/margarita`.

> Notice how we don't specify the path to Margarita, but the path where Margarita is located!

Example:

```bash
# /Users/me/projects
#   /margarita
#   /my-project
  
npm-link-shared /Users/me/projects /Users/me/projects/my-project @holaluz/margarita
```

2. That's it! Now every time you update margarita (by running `npm run build`)
your project will react to the changes, simplifying the development process.

## Is it working?

To make sure everything works as expected, you should see the link by checking
your global dependencies:

```bash
npm ls -g --depth=0
```

This should show your global dependencies, and among them, a symbolic link such
as:

```bash
├── @holaluz/margarita@0.0.36 -> /path/to/margarita
```

This way, we know that the version `0.0.36` of Margarita will be pulled from
our system and not from npm or GitHub.

Please notice that changing Margarita's version or switching to branches with
different versions of the package will break the link. You can easily recreate
it by running the same command again.

## How can I remove this symbolic link?

To remove the symbolic link, you need to run the following command:

```bash
npm rm -g @holaluz/margarita
```

After it, check your global dependencies and make sure the link is gone.
