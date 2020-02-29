# TypeScript (nodejs) Example

This is a very simple demo. It just shows importing isomorphic-git and using it to print the list of branches on a repo.

## Install, Build, and Run

```sh
git clone https://github.com/isomorphic-git/examples
cd typescript-node
npm install

npm run build
npm start
```

## How to create your own TypeScript project with isomorphic-git

Obviously you can copy and paste this as a starter, but it was pretty straightforward to create:

```sh
mkdir typescript-node
cd typescript-node
npm init -y
npm install -D typescript @types/node
npm install isomorphic-git
./node_modules/.bin/tsc --init
```

Then I...

- changed the `compilerOptions.outDir` property and added an `include` property to `tsconfig.json`
- added the `build` and `start` scripts to `package.json`
- wrote `src/index.ts`
