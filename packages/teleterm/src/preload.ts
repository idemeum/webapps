import { contextBridge } from 'electron';
import createTshClient from 'teleterm/services/tshd/createClient';
import createMainProcessClient from 'teleterm/mainProcess/mainProcessClient';
import createLoggerService from 'teleterm/services/logger';
import PreloadLogger from 'teleterm/logger';
import { ElectronGlobals } from './types';
import { createPtyService } from 'teleterm/services/pty/ptyService';
import { readGrpcCertificates } from './mainProcess/readGrpcCertificates';

async function startPreload(): Promise<void> {
  const mainProcessClient = createMainProcessClient();
  const runtimeSettings = mainProcessClient.getRuntimeSettings();
  const loggerService = createLoggerService({
    dev: runtimeSettings.dev,
    dir: runtimeSettings.userDataDir,
    name: 'renderer',
  });

  PreloadLogger.init(loggerService);

  const certificates = await readGrpcCertificates(runtimeSettings.certsDir);

  const tshClient = createTshClient(runtimeSettings, certificates);
  const ptyServiceClient = createPtyService(runtimeSettings, certificates);

  contextBridge.exposeInMainWorld('electron', {
    mainProcessClient,
    tshClient,
    ptyServiceClient,
    loggerService,
  } as ElectronGlobals);
}

startPreload();