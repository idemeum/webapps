import { ipcRenderer } from 'electron';

import { createFileStorageClient } from 'teleterm/services/fileStorage';

import { createConfigServiceClient } from '../services/config';

import { openTerminalContextMenu } from './contextMenus/terminalContextMenu';
import { MainProcessClient, ChildProcessAddresses } from './types';
import { openTabContextMenu } from './contextMenus/tabContextMenu';

export default function createMainProcessClient(): MainProcessClient {
  return {
    getRuntimeSettings() {
      return ipcRenderer.sendSync('main-process-get-runtime-settings');
    },
    getResolvedChildProcessAddresses(): Promise<ChildProcessAddresses> {
      return ipcRenderer.invoke(
        'main-process-get-resolved-child-process-addresses'
      );
    },
    openTerminalContextMenu,
    openTabContextMenu,
    configService: createConfigServiceClient(),
    fileStorage: createFileStorageClient(),
  };
}
