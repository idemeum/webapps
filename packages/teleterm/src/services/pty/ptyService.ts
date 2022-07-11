import { RuntimeSettings } from 'teleterm/mainProcess/types';
import { buildPtyOptions } from './ptyHost/buildPtyOptions';
import { createPtyHostClient } from './ptyHost/ptyHostClient';
import { createPtyProcess } from './ptyHost/ptyProcess';
import { PtyServiceClient } from './types';
import { GrpcCertificates } from 'teleterm/mainProcess/readGrpcCertificates';

export function createPtyService(
  runtimeSettings: RuntimeSettings,
  grpcCertificates: GrpcCertificates,
): PtyServiceClient {  
  const ptyHostClient = createPtyHostClient(
    runtimeSettings.sharedProcess.networkAddr,
    grpcCertificates.caCert,
    grpcCertificates.clientKey,
    grpcCertificates.clientCert    
  );

  return {
    createPtyProcess: async command => {
      const { processOptions, creationStatus } = await buildPtyOptions(
        runtimeSettings,
        command
      );
      const ptyId = await ptyHostClient.createPtyProcess(processOptions);

      // Electron's context bridge doesn't allow to return a class here
      return {
        process: createPtyProcess(ptyHostClient, ptyId),
        creationStatus,
      };
    },
  };
}
