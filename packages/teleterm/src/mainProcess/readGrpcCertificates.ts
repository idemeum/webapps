import fs from 'fs/promises';
import path from 'path';

export async function readGrpcCertificates(userDataDir: string): Promise<GrpcCertificates> {
    function getPath(fileName?: string): string {   
        return path.join(userDataDir, 'certs1', fileName);
    }
    const files = await Promise.all([
        fs.readFile(getPath('server.crt')),
        fs.readFile(getPath('server.key')),
        fs.readFile(getPath('client.crt')),
        fs.readFile(getPath('client.key')),
        fs.readFile(getPath('ca.crt')),
    ])

    return { serverCert: files[0], serverKey: files[1], clientCert: files[2], clientKey: files[3], caCert: files[4] }
}

export interface GrpcCertificates { caCert: Buffer, serverCert: Buffer; serverKey: Buffer, clientCert: Buffer, clientKey: Buffer }