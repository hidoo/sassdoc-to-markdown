import assert from 'node:assert';
import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';
import util from 'node:util';
import childProcess from 'node:child_process';

const DEBUG = Boolean(process.env.DEBUG);
const exec = util.promisify(childProcess.exec);

/**
 * read built file
 *
 * @param {String} file filename
 * @return {String}
 */
async function readBuiltFile(file) {
  const content = await fs.readFile(file);

  return content.toString().trim();
}

describe('cli', () => {
  let dirname = null;
  let fixtureDir = null;
  let destDir = null;

  before(async () => {
    dirname = path.dirname(url.fileURLToPath(import.meta.url));
    fixtureDir = path.join(dirname, 'fixture');
    destDir = path.join(fixtureDir, 'dest');

    try {
      await fs.stat(destDir);
    } catch (err) {
      if (DEBUG) {
        console.error(err);
      }
      await fs.mkdir(destDir);
    }
  });

  afterEach(async () => {
    await fs.rm(destDir, { recursive: true });
    await fs.mkdir(destDir);
  });

  context('if <src> is not set.', () => {
    it('should error.', async () => {
      const command = ['node', './src/cli.js'];
      const { stdout, stderr } = await exec(command.join(' '));

      assert.equal(stdout, '');
      assert.notEqual(stderr, '');
    });
  });

  context('if no file matching the glob pattern specified by <src>.', () => {
    it('should error.', async () => {
      const command = ['node', './src/cli.js', './not-exists/*.scss'];
      const { stdout, stderr } = await exec(command.join(' '));

      assert.equal(stdout, '');
      assert.notEqual(stderr, '');
    });
  });

  context('if files matching the glob pattern specified by <src>.', () => {
    context('if [dest] is not set.', () => {
      it('should output markdown to stdout.', async () => {
        const command = ['node', './src/cli.js', './test/fixture/**/*.scss'];
        const { stdout, stderr } = await exec(command.join(' '));
        const expected = await readBuiltFile(
          path.join(fixtureDir, 'markdown', 'expected.md')
        );

        assert.equal(stdout.trim(), expected.trim());
        assert.equal(stderr, '');
      });

      context('with --markdown option.', () => {
        it('should output markdown that injected document to stdout.', async () => {
          const command = [
            'node',
            './src/cli.js',
            './test/fixture/**/*.scss',
            '--markdown ./test/fixture/markdown/docs.md'
          ];
          const { stdout, stderr } = await exec(command.join(' '));
          const expected = await readBuiltFile(
            path.join(fixtureDir, 'markdown', 'expected-markdown.md')
          );

          assert.equal(stdout.trim(), expected.trim());
          assert.equal(stderr, '');
        });
      });

      context('with --template option.', () => {
        it('should output markdown that used custom template to stdout.', async () => {
          const command = [
            'node',
            './src/cli.js',
            './test/fixture/**/*.scss',
            '--template ./test/fixture/template/exist.hbs'
          ];
          const { stdout, stderr } = await exec(command.join(' '));

          assert.equal(stdout.trim(), 'specified template .');
          assert.equal(stderr, '');
        });
      });
    });

    context('if [dest] is set.', () => {
      it('should output markdown as a file.', async () => {
        const command = [
          'node',
          './src/cli.js',
          './test/fixture/**/*.scss',
          './test/fixture/dest/actual.md'
        ];
        const { stdout, stderr } = await exec(command.join(' '));
        const actual = await readBuiltFile(path.join(destDir, 'actual.md'));
        const expected = await readBuiltFile(
          path.join(fixtureDir, 'markdown', 'expected.md')
        );

        assert.equal(stdout, '');
        assert.equal(stderr, '');
        assert.equal(actual, expected);
      });

      context('with --markdown option.', () => {
        it('should output markdown that injected document as a file.', async () => {
          const command = [
            'node',
            './src/cli.js',
            './test/fixture/**/*.scss',
            './test/fixture/dest/actual-markdown.md',
            '--markdown ./test/fixture/markdown/docs.md'
          ];
          const { stdout, stderr } = await exec(command.join(' '));
          const actual = await readBuiltFile(
            path.join(destDir, 'actual-markdown.md')
          );
          const expected = await readBuiltFile(
            path.join(fixtureDir, 'markdown', 'expected-markdown.md')
          );

          assert.equal(stdout, '');
          assert.equal(stderr, '');
          assert.equal(actual, expected);
        });
      });
    });
  });
});
