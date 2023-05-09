
# PCP Dashboard

The app for viewing graphs

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- `APP_NAME` : `pcd`

- `STAGING_SERVER` : `host02.dn01-server.gotecq.net`
- `STAGING_DOMAIN` : `app.dn01-tecq.gotecq.net`

## Documentation

### Directory Structure

```bash
```

## Installation yarn

in MacOS, Windows, Linux

```bash
npm install --global yarn
```

or only install with brew

```bash
brew install yarn
```

## Run Locally

Clone the project to local directory

```bash
  git clone git@gitlab.com:gotecq-frontend/web.pcp-dashboard.git
```

- Required: link `.makelib` vs `env` folder

Go to the project directory

```bash
  cd web.pcp-dashboard
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  make run TARGET_ENV=develop
```

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## License

[GoTECQ Viet Nam](https://gotecq.com/licenses/)

