/* eslint max-len: off, no-magic-numbers: off, no-sync: off */

import assert from 'assert';
import fs from 'fs';
import {promisify} from 'util';
import {exec} from 'child_process';
import rimraf from 'rimraf';

const asyncExec = promisify(exec);

describe('cli', () => {

  afterEach((done) => {
    rimraf(`${__dirname}/build/*`, done);
  });

  it('should error if <src> is not set.', async () => {
    const command = [
      'babel-node',
      './src/cli.js'
    ];
    const {stdout, stderr} = await asyncExec(command.join(' '));

    assert(stdout === '');
    assert(stderr !== '');
  });

  it('should error if files that specified by <src> does not exists.', async () => {
    const command = [
      'babel-node',
      './src/cli.js',
      './not-exists/*.scss'
    ];
    const {stdout, stderr} = await asyncExec(command.join(' '));

    assert(stdout === '');
    assert(stderr !== '');
  });

  it('should output markdown to stdout.', async () => {
    const command = [
      'babel-node',
      './src/cli.js',
      './test/fixture/**/*.scss'
    ];
    const {stdout, stderr} = await asyncExec(command.join(' '));
    const expected = fs.readFileSync(`${__dirname}/fixture/markdown/expected.md`).toString();

    assert(stdout.trim() === expected.trim());
    assert(stderr === '');
  });

  it('should output markdown that injected document to stdout if "--markdown" option is set.', async () => {
    const command = [
      'babel-node',
      './src/cli.js',
      './test/fixture/**/*.scss',
      '--markdown ./test/fixture/markdown/docs.md'
    ];
    const {stdout, stderr} = await asyncExec(command.join(' '));
    const expected = fs.readFileSync(`${__dirname}/fixture/markdown/expected-markdown.md`).toString();

    assert(stdout.trim() === expected.trim());
    assert(stderr === '');
  });

  it('should output markdown to file if [dest] is set.', async () => {
    const command = [
      'babel-node',
      './src/cli.js',
      './test/fixture/**/*.scss',
      './test/build/actual.md'
    ];
    const {stdout, stderr} = await asyncExec(command.join(' '));
    const actual = fs.readFileSync(`${__dirname}/build/actual.md`).toString();
    const expected = fs.readFileSync(`${__dirname}/fixture/markdown/expected.md`).toString();

    assert(stdout === '');
    assert(stderr === '');
    assert(actual === expected);
  });

  it('should output markdown to file if [dest] is set and "--markdown" options is set.', async () => {
    const command = [
      'babel-node',
      './src/cli.js',
      './test/fixture/**/*.scss',
      './test/build/actual-markdown.md',
      '--markdown ./test/fixture/markdown/docs.md'
    ];
    const {stdout, stderr} = await asyncExec(command.join(' '));
    const actual = fs.readFileSync(`${__dirname}/build/actual-markdown.md`).toString();
    const expected = fs.readFileSync(`${__dirname}/fixture/markdown/expected-markdown.md`).toString();

    assert(stdout === '');
    assert(stderr === '');
    assert(actual === expected);
  });

  it('should output markdown that used custom template to stdout if "--template" options is set.', async () => {
    const command = [
      'babel-node',
      './src/cli.js',
      './test/fixture/**/*.scss',
      '--template ./test/fixture/template/exist.hbs'
    ];
    const {stdout, stderr} = await asyncExec(command.join(' '));

    assert(stdout.trim() === 'specified template .');
    assert(stderr === '');
  });
});
