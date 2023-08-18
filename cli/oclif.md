# oclif-hello-world

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [oclif-hello-world](#oclif-hello-world)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g @storengine/cli
$ storengine COMMAND
running command...
$ storengine (--version)
@storengine/cli/0.0.9 darwin-arm64 node-v18.15.0
$ storengine --help [COMMAND]
USAGE
  $ storengine COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`storengine cross-acc`](#storengine-cross-acc)
* [`storengine help [COMMANDS]`](#storengine-help-commands)
* [`storengine init USERNAME TEMPLATEID`](#storengine-init-username-templateid)
* [`storengine plugins`](#storengine-plugins)
* [`storengine plugins:install PLUGIN...`](#storengine-pluginsinstall-plugin)
* [`storengine plugins:inspect PLUGIN...`](#storengine-pluginsinspect-plugin)
* [`storengine plugins:install PLUGIN...`](#storengine-pluginsinstall-plugin-1)
* [`storengine plugins:link PLUGIN`](#storengine-pluginslink-plugin)
* [`storengine plugins:uninstall PLUGIN...`](#storengine-pluginsuninstall-plugin)
* [`storengine plugins:uninstall PLUGIN...`](#storengine-pluginsuninstall-plugin-1)
* [`storengine plugins:uninstall PLUGIN...`](#storengine-pluginsuninstall-plugin-2)
* [`storengine plugins update`](#storengine-plugins-update)

## `storengine cross-acc`

```
USAGE
  $ storengine cross-acc
```

_See code: [dist/commands/cross-acc.ts](https://github.com/davincios/storengine/blob/v0.0.9/dist/commands/cross-acc.ts)_

## `storengine help [COMMANDS]`

Display help for storengine.

```
USAGE
  $ storengine help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for storengine.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `storengine init USERNAME TEMPLATEID`

Creates an upload demo in your project, consisting of an API route and page component.

```
USAGE
  $ storengine init USERNAME TEMPLATEID

ARGUMENTS
  USERNAME    Your username
  TEMPLATEID  The ID of the template to use

DESCRIPTION
  Creates an upload demo in your project, consisting of an API route and page component.
```

_See code: [dist/commands/init/index.ts](https://github.com/davincios/storengine/blob/v0.0.9/dist/commands/init/index.ts)_

## `storengine plugins`

List installed plugins.

```
USAGE
  $ storengine plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ storengine plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `storengine plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ storengine plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ storengine plugins add

EXAMPLES
  $ storengine plugins:install myplugin 

  $ storengine plugins:install https://github.com/someuser/someplugin

  $ storengine plugins:install someuser/someplugin
```

## `storengine plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ storengine plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ storengine plugins:inspect myplugin
```

## `storengine plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ storengine plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ storengine plugins add

EXAMPLES
  $ storengine plugins:install myplugin 

  $ storengine plugins:install https://github.com/someuser/someplugin

  $ storengine plugins:install someuser/someplugin
```

## `storengine plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ storengine plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ storengine plugins:link myplugin
```

## `storengine plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ storengine plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ storengine plugins unlink
  $ storengine plugins remove
```

## `storengine plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ storengine plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ storengine plugins unlink
  $ storengine plugins remove
```

## `storengine plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ storengine plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ storengine plugins unlink
  $ storengine plugins remove
```

## `storengine plugins update`

Update installed plugins.

```
USAGE
  $ storengine plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
