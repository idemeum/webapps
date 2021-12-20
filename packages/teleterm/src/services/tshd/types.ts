import apiCluster from './v1/cluster_pb';
import apiDb from './v1/database_pb';
import apigateway from './v1/gateway_pb';
import apiServer from './v1/server_pb';
import apiKube from './v1/kube_pb';
import apiApp from './v1/app_pb';
import apiAuthSettings from './v1/auth_settings_pb';

export type Application = apiApp.App.AsObject;
export type Kube = apiKube.Kube.AsObject;
export type Server = apiServer.Server.AsObject;
export type Gateway = apigateway.Gateway.AsObject;
export type Database = apiDb.Database.AsObject;
export type Cluster = apiCluster.Cluster.AsObject;
export type LoggedInUser = apiCluster.LoggedInUser.AsObject;
export type AuthProvider = apiAuthSettings.AuthProvider.AsObject;
export type AuthSettings = apiAuthSettings.AuthSettings.AsObject;

export type TshClient = {
  listGateways: () => Promise<Gateway[]>;
  listClusters: () => Promise<Cluster[]>;
  listApps: (clusterUri: string) => Promise<Application[]>;
  listKubes: (clusterUri: string) => Promise<Kube[]>;
  listDatabases: (clusterUri: string) => Promise<Database[]>;
  listServers: (clusterUri: string) => Promise<Server[]>;
  createAbortController: () => TshAbortController;
  addCluster: (clusterUri: string) => Promise<Cluster>;
  createGateway: (targetUri: string, port: string) => Promise<Gateway>;
  getCluster: (clusterUri: string) => Promise<Cluster>;
  getAuthSettings: (clusterUri: string) => Promise<AuthSettings>;
  removeGateway: (gatewayUri: string) => Promise<void>;
  removeCluster: (clusterUri: string) => Promise<void>;
  login: (params: LoginParams, abortSignal?: TshAbortSignal) => Promise<void>;
  logout: (clusterUri: string) => Promise<void>;
};

export type TshAbortController = {
  signal: TshAbortSignal;
  abort(): void;
};

export type TshAbortSignal = {
  addEventListener(cb: (...args: any[]) => void): void;
  removeEventListener(cb: (...args: any[]) => void): void;
};

export type LoginParams = {
  clusterUri: string;
  oss?: {
    providerType: string;
    providerName: string;
  };
  local?: {
    username: string;
    password: string;
    token?: string;
  };
};
