const os = require('os');
const path = require('path');
const child_process = require('child_process');
const fs = require('fs');

const root = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const options = {
  cwd: process.cwd(),
  env: process.env,
  stdio: 'inherit',
  encoding: 'utf-8',
};

if (os.type() === 'Windows_NT') {
  options.shell = true;
}

const results = [];

if (args.length && args[0] === 'install') {
  // Value of `args` is ['install:all', 'package1', 'package2', ...]
  const packages = args.slice(1);
  // Resolve the paths to the packages
  const packagePaths = packages.map(p => path.resolve(root, 'packages', p));
  // Check if the packages exist
  packagePaths.forEach((p, index) => {
    if (!fs.existsSync(p)) {
      console.log(`[-] Package ${packages[index]} does not exist`);
      process.exitCode = 1;
    }
  });
  // Run `yarn install` in each package
  packagePaths.forEach((p, index) => {
    const opts = {
      ...options,
      cwd: p,
    };
    // Clear the node_modules folder
    console.log(`[+] Removing node_modules for ${packages[index]}`);
    results[index] = child_process.spawnSync(
      'rm',
      ['-rf', 'node_modules'],
      opts,
    );

    console.log(`[+] Installing dependencies for ${packages[index]}`);
    results[index] = child_process.spawnSync('yarn', ['install'], opts);

    if (results[index].status !== 0) {
      console.log(`[-] Failed to install dependencies for ${packages[index]}`);
      process.exitCode = results[index].status;
      return;
    }

    // Run `yarn prepack` in each package
    results[index] = child_process.spawnSync('yarn', ['prepack'], opts);

    if (results[index].status !== 0) {
      console.log(`[-] Failed to run prepack for ${packages[index]}`);
      process.exitCode = results[index].status;
      return;
    }

    // Remove node_modules
    results[index] = child_process.spawnSync(
      'rm',
      ['-rf', 'node_modules'],
      opts,
    );

    console.log(
      `[+] Successfully installed dependencies for ${packages[index]}`,
    );
  });

  // Clear the node_modules folder
  console.log('[+] Removing node_modules for root');
  results[packages.length] = child_process.spawnSync(
    'rm',
    ['-rf', 'node_modules'],
    {
      ...options,
      cwd: root,
    },
  );

  console.log('[+] Installing dependencies for root');
  // Run `yarn install` in the root
  results[packages.length] = child_process.spawnSync('yarn', ['install'], {
    ...options,
    cwd: root,
  });

  if (results[packages.length].status !== 0) {
    console.log('[-] Failed to install dependencies for root');
    process.exitCode = results[packages.length].status;
  } else {
    console.log('[+] Successfully installed dependencies for root');
  }
}

process.exitCode = results.some(r => r.status !== 0) ? 1 : 0;
