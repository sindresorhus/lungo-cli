# lungo-cli

> Control the [Lungo app](https://sindresorhus.com/lungo) from the command-line


## Install

```
$ npm install --global lungo-cli
```

*Requires [Node.js 8](https://nodejs.org).*


## Usage

```
$ lungo --help

  Usage
    $ lungo [command]

  Commands
    on
    off
    toggle

  Options
    --hours -h    Hours Lungo should be active
    --minutes -m  Minutes Lungo should be active

  Examples
    $ lungo on --hours=1 --minutes=10
    $ lungo on
    $ lungo off
    $ lungo toggle --hours=1.5
    $ lungo

  If you don't specify a duration, it will use the default duration.

  You can also toggle by leaving out the command.
```


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
