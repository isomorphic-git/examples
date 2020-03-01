# React Native Example

This project was created with `npx react-native init ReactNativeGit`.

## Install, Build, and Run

Note, React Native has a bunch of dependencies.
I'd follow the [Getting Started](https://reactnative.dev/docs/getting-started) guide on their website.

But this should... be roughly correct:

```sh
git clone https://github.com/isomorphic-git/examples
cd ReactNativeGit
yarn
yarn react-native run-android
```

Note: I kept getting an error (EMFILE: too many open files) until I did `brew install watchman`.
So even though they say watchman is optional, it's basically necessary at least for some computers.

## Weirdness

There must be some kind of bug in React Native's implementation of `fetch` because we need to monkeypatch the
`FileReader` global. See `./patch-FileReader.js` which has some hackery from Stack Overflow.

For some reason, right now it appears that you have to import `isomorphic-git/index.umd.min.js`.
Importing `isomorphic-git`, `isomorphic-git/index.cjs`, or `isomorphic-git/index.js` doesn't work.
I'm not sure why. Maybe because of lingering Node-isms like Buffer in some of the dependencies?
Sadly, `index.umd.min.js` doesn't have a `.d.ts` file, because I just hadn't thought of that.
So right now I've copy pasted the type definition into `declarations.d.ts`.

## Wrapping `react-native-fs`

This is the crux of the challenge. The `react-native-fs` library has a _very_ different API from the
node.js `fs` API subset that `isomorphic-git` uses. Therefore, we need to wrap it! See `./fs.ts`

Alternatively, it looks like there is a `react-native-level-fs` library that implements a more normal `fs` API,
but that uses LevelDB and using the actual device file system would be prefereable. Plus it might not be 100% compatible with isomorphic-git anyway, so if we're going to need a wrapper, let's wrap the much-more-popular and preferable solution.

We did it! Note that @crutchcorn is hoping to upstream some of these improvements to `react-native-fs` directly (including symlink support!) so we'll keep updating this repo as fewer hacks are required.
