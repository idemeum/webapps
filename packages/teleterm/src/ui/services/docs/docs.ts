/*
Copyright 2019 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { useStore } from 'shared/libs/stores';
import { unique } from 'teleterm/ui/utils/uid';
import { Document, DocumentTshNode } from './types';
import { ImmutableStore } from '../immutableStore';
import { routing } from 'teleterm/ui/uri';

type State = {
  location: string;
  docs: Document[];
};
export default class DocumentService extends ImmutableStore<State> {
  state: State = {
    location: '/home',
    docs: [
      {
        uri: '/',
        kind: 'doc.blank',
        title: 'Welcome',
      },
      {
        uri: '/home',
        kind: 'doc.home',
        title: 'Home',
      },
    ],
  };

  open(docUri: string) {
    const exists = this.find(docUri);
    if (exists) {
      this.setLocation(docUri);
      return;
    }

    const clusterMatch = routing.matchCluster(docUri);
    const homeMatch = routing.matchHome(docUri);
    const gwMatch = routing.matchGw(docUri);
    const ptyMatch = routing.matchPty(docUri);

    if (ptyMatch) {
      this.add({
        uri: docUri,
        title: 'dir/path',
        kind: 'doc.terminal_shell',
      });
    } else if (homeMatch) {
      this.add({
        uri: docUri,
        title: 'Home',
        kind: 'doc.home',
      });
    } else if (gwMatch) {
      this.add({
        uri: docUri,
        title: 'Gateway',
        kind: 'doc.gateway',
      });
    } else if (clusterMatch) {
      this.add({
        uri: docUri,
        title: 'Cluster',
        kind: 'doc.cluster',
      });
    } else {
      this.add({
        uri: docUri,
        title: 'not-found',
        kind: 'doc.blank',
      });
    }

    this.setLocation(docUri);
  }

  createTshNodeDocument(serverUri: string): DocumentTshNode {
    const { params } = routing.matchServer(serverUri);
    const uri = routing.getPtyUri({ sid: unique() });
    return {
      uri,
      kind: 'doc.terminal_tsh_node',
      status: 'connecting',
      rootClusterId: params.rootClusterId,
      leafClusterId: params.leafClusterId,
      serverId: params.serverId,
      title: '',
      login: '',
    };
  }

  openNewTerminal() {
    const doc = ((): Document => {
      const activeDocument = this.getActive();
      switch (activeDocument.kind) {
        case 'doc.terminal_tsh_node':
        case 'doc.terminal_shell':
          return {
            ...activeDocument,
            uri: routing.getPtyUri({ sid: unique() }),
          };
        default:
          return {
            uri: routing.getPtyUri({ sid: unique() }),
            title: 'Terminal',
            kind: 'doc.terminal_shell',
          };
      }
    })();

    this.add(doc);
    this.setLocation(doc.uri);
  }

  getDocuments() {
    return this.state.docs;
  }

  getDocument(url: string) {
    return this.find(url);
  }

  getActive() {
    return this.find(this.getLocation());
  }

  getLocation() {
    return this.state.location;
  }

  close({ uri }: { uri: string }) {
    const nextUri = this.getNextUri(uri);
    const docs = this.state.docs.filter(i => i.uri !== uri);
    this.setState(draftState => ({ ...draftState, docs, location: nextUri }));
  }

  isActive(uri: string) {
    const location = this.getLocation();
    return !!routing.match(location, { exact: true, path: uri });
  }

  add(doc: Document) {
    this.setState(draftState => {
      draftState.docs.push(doc);
    });
  }

  update(uri: string, partialDoc: Partial<Document>) {
    this.setState(draftState => {
      const toModify = draftState.docs.find(doc => doc.uri === uri);
      Object.assign(toModify, partialDoc);
    });
  }

  filter(uri: string) {
    return this.state.docs.filter(i => i.uri !== uri);
  }

  getTshNodeDocuments() {
    function isTshNode(d: DocumentTshNode): d is DocumentTshNode {
      return d.kind === 'doc.terminal_tsh_node';
    }

    return this.state.docs.filter(isTshNode);
  }

  getNextUri(uri: string) {
    const { docs } = this.state;
    for (let i = 0; i < this.state.docs.length; i++) {
      if (docs[i].uri === uri) {
        if (docs.length > i + 1) {
          return docs[i + 1].uri;
        }

        if (docs.length === i + 1 && i !== 0) {
          return docs[i - 1].uri;
        }
      }
    }

    return '/';
  }

  find(uri: string) {
    return this.state.docs.find(i => i.uri === uri);
  }

  setLocation(location: string) {
    this.setState(draftState => {
      draftState.location = location;
    });
  }

  useState() {
    return useStore(this).state;
  }

  swapPosition(oldIndex: number, newIndex: number) {
    const doc = this.state.docs[oldIndex];
    this.setState(draftState => {
      draftState.docs.splice(oldIndex, 1);
      draftState.docs.splice(newIndex, 0, doc);
    });
  }
}