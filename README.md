# MERN + GraphQL

## Requirements

- [Node.js](https://nodejs.org/en/) 6+

```shell
npm install
```

## How do we handle X?

- [Coding Standards](docs/CODING_STANDARDS.md)
- [Styling](docs/STYLING.md)
- [Storybook](docs/STORYBOOK.md)
- [CHANGElOG](../../docs/CHANGELOG.md)

**Configure app**

* Rename `config.example.js` to `config.js` in `/src` dir.
* In `config.js` file, replace environment variables with your info.
* Rename `.env.example` file to `.env` and replace `SECRET` environment value with your own key.

## Running

Production mode:

```shell
npm start
```

Development (Webpack dev server) mode:

```shell
npm run start:dev
```

## Testing

Test using Jest:
```shell
npm run test
```

Run storybook
```shell
npm run storybook
```

## GraphQL server

```shell
http://localhost:8080/graphql
```