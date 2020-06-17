const rollup = require('rollup');
const shelljs = require('shelljs');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const { hashElement } = require('folder-hash');

const buildPath = path.resolve() + '/lib';
const buildHashPath = buildPath + '/.build-hash';

async function checkHash() {
  const hash = (await hashElement(path.resolve() + '/src/')).hash;

  if (!fs.existsSync(buildHashPath)) {
    return hash;
  }

  const prevBuildHash = fs.readFileSync(buildHashPath, 'utf8');

  if (prevBuildHash !== hash) {
    return hash;
  }

  return false;
}

/**
 * @param {'component' | 'util'} moduleType
 * @param {string} name
 * @param {Object} config
 */
async function build(moduleType, config) {
  const { name } = config;
  const newHash = await checkHash();

  if (!newHash) {
    return;
  }

  shelljs.rm('-rf');

  const rollupInputOptions =
    moduleType === 'util'
      ? require('./configs/rollup-util')(name, config)
      : require('./configs/rollup-component')(name, config);

  try {
    console.log(chalk.green('Creating bundle'));
    const bundle = await rollup.rollup(rollupInputOptions);
    const rollupOutputOptions = require('./configs/rollup-output')(name);

    console.log(chalk.green('Writing bundle'));
    await bundle.write(rollupOutputOptions);
    fs.writeFileSync(buildHashPath, newHash);

    if (!config.postBuild) {
      return;
    }

    console.log(chalk.gree('running post bundle script'));
    if (typeof config.postBuild === 'function') {
      return config.postBuild();
    }
  } catch (error) {
    console.log(chalk.yellow(`Failed to create bundle for '${name}'`));
    throw error;
  }

  try {
    if (typeof config.postBuild === 'string') {
      shelljs(path.resolve() + '/' + config.postBuild);
    }
  } catch (err) {
    console.log(chalk.yellow('Post build script failed!'));
    console.error(err.message);
  }
}

module.exports = build;
