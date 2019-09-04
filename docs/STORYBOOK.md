# Storybook

[Storybook] is used in order to develop components in isolation. To start storybook, run:

```
npm run storybook
```

## Story Files

Stories can be added anywhere in the project but their filename suffix should be `.stories.js`.

## Storyshots

Stories snapshots are automatically taken using [StoryShots](https://github.com/storybooks/storybook/tree/master/addons/storyshots/storyshots-core) addon. Every time you run tests, the stories output markup is compared to the existing snapshots.

We want to explore stories shallow rendering for this in the future.