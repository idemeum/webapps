import path from 'path';
import { existsSync, watch } from 'fs';
import { readFile, writeFile, stat } from 'fs/promises';
import { makeCert } from './makeCert';
import { RuntimeSettings } from 'teleterm/mainProcess/types';

/**
 * Generates self-signed cert and saves it in the `certsDir`
 * using `certName` (only the cert is saved).
 * The generated pair (cert and key) is returned.
 */
export async function generateAndSaveGrpcCert(
  certsDir: string,
  certName: string
): Promise<{ cert: Buffer; key: Buffer }> {
  const createdCert = await makeCert({
    commonName: 'localhost',
    validityDays: 365,
  });

  await writeFile(path.join(certsDir, certName), createdCert.cert);

  return {
    cert: Buffer.from(createdCert.cert),
    key: Buffer.from(createdCert.key),
  };
}

/**
 * Reads a cert with given `certName` in the `certDir`.
 * If the file doesn't exist, it will wait up to 10 seconds for it.
 */
export async function readGrpcCert(
  certsDir: string,
  certName: string
): Promise<Buffer> {
  const fullPath = path.join(certsDir, certName);
  const abortController = new AbortController();

  async function fileExistAndHasSize(): Promise<boolean> {
    return !!(await stat(fullPath)).size;
  }

  function watchForFile(): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      abortController.signal.onabort = () => {
        watcher.close();
        clearTimeout(timeout);
      };

      const timeout = setTimeout(() => {
        reject(
          `Could not read ${certName} certificate. The operation timed out.`
        );
      }, 10_000);

      const watcher = watch(certsDir, async (event, filename) => {
        if (certName === filename && (await fileExistAndHasSize())) {
          resolve(readFile(fullPath));
        }
      });
    });
  }

  async function checkIfFileAlreadyExist(): Promise<Buffer> {
    if (await fileExistAndHasSize()) {
      return readFile(fullPath);
    }
  }

  try {
    // watching must be started before checking if the file already exists to avoid race conditions
    return await Promise.any([watchForFile(), checkIfFileAlreadyExist()]);
  } finally {
    abortController.abort();
  }
}

/**
 * Checks if the gRPC connection should be encrypted.
 * The only source of truth is the type of tshd protocol.
 * Any other protocol than `unix` should be encrypted.
 * The same check is performed on the tshd site.
 */
export function shouldEncryptConnection(
  runtimeSettings: RuntimeSettings
): boolean {
  return (
    new URL(runtimeSettings.tshd.requestedNetworkAddress).protocol !== 'unix:'
  );
}
