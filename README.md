<div align="center">
 <img src="https://user-images.githubusercontent.com/3874873/182601482-09575409-cc78-4965-878c-9a44ffec893f.png" alt="Progressively" />
 <p><strong>Rollout quickly, effectively, progressively</strong></p>
</div>

<br />
<br />

<div align="center">
<img src="https://github.com/progressively-crew/progressively/actions/workflows/backend.yml/badge.svg" alt="Backend" />
<img src="https://github.com/progressively-crew/progressively/actions/workflows/frontend.yml/badge.svg" alt="Frontend" />
<img src="https://github.com/progressively-crew/progressively/actions/workflows/e2e.yml/badge.svg" alt="E2E" />
<img src="https://github.com/progressively-crew/progressively/actions/workflows/sdk.yml/badge.svg" alt="Sdk-js" />
<img src="https://github.com/progressively-crew/progressively/actions/workflows/sdk-react.yml/badge.svg" alt="Sdk-React" />
<img src="https://github.com/progressively-crew/progressively/actions/workflows/example-nextjs.yml/badge.svg" alt="Example NextJs">
<img src="https://github.com/progressively-crew/progressively/actions/workflows/example-cra.yml/badge.svg" alt="Example create-react-app">
<img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License MIT" />
</div>

## Get started

```sh
$ git clone https://github.com/progressively-crew/progressively
$ cd progressively
$ mv ./packages/backend/.env.example ./packages/backend/.env
$ mv ./packages/frontend/.env.example ./packages/frontend/.env
$ docker-compose up -d
```

You can now open http://localhost:3000/welcome to create your admin user.

## How is progressively different

- Progressively is smaller than its competitors ([1.3kB for the React SDK](https://github.com/progressively-crew/progressively/tree/master/example/bundle-diffs))
- Progressively has an accessible dashboard (if you face issues, please [create an issue](https://github.com/progressively-crew/progressively/issues))
- Progressively comes with built-in SSR support so that the page don't blink when resolving the flags
- Real-time propagation with Websockets
- No intrusive tracking
- Self-hosted so that you own the data

## Contribution

Contributions of any kind are very much appreciated :blush:. Thanks for your help!

If you're interested in modifying code, make sure to follow [the development setup](./DEV_SETUP.md). Otherwise, make sure be kind and respectful with the community on the different discussion channels :heart:
