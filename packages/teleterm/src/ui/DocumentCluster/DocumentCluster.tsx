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

import React, { useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Text, Flex, Box, ButtonPrimary } from 'design';
import * as types from 'teleterm/ui/services/docs/types';
import Document from 'teleterm/ui/Document';
import { useAppContext } from 'teleterm/ui/appContextProvider';
import ClusterCtx, {
  useClusterContext,
  ClusterContextProvider,
} from './clusterContext';
import ClusterResources from './ClusterResources';
import ClusterNavButton from './ClusterNavButton';

export default function Container(props: DocumentProps) {
  const { clusterUri } = props.doc;
  const { serviceClusters, serviceDocs, serviceModals } = useAppContext();
  const clusterCtx = useMemo(
    () => new ClusterCtx(clusterUri, serviceClusters, serviceModals),
    []
  );

  useEffect(() => {
    serviceDocs.update(clusterUri, {
      title: clusterCtx.state.clusterName,
    });

    return () => clusterCtx.dispose();
  }, []);

  return (
    <ClusterContextProvider value={clusterCtx}>
      <DocumentCluster {...props} />
    </ClusterContextProvider>
  );
}

export function DocumentCluster(props: { visible: boolean }) {
  const clusterCtx = useClusterContext();
  const { navItems, clusterName, connected } = clusterCtx.useState();

  if (!connected) {
    return (
      <Document visible={props.visible}>
        <Layout mx="auto">
          <Flex flexDirection="column" mx="auto" alignItems="center" mt={4}>
            <Text typography="h3" color="text.secondary" mb={4}>
              {`This '${clusterName}' cluster is offline`}
            </Text>
            <ButtonPrimary
              width="100px"
              size="small"
              onClick={clusterCtx.login}
            >
              Connect
            </ButtonPrimary>
          </Flex>
        </Layout>
      </Document>
    );
  }

  return (
    <Document visible={props.visible}>
      <Layout mx="auto" px="5" height="100%">
        <Flex mb="2">
          <Text typography="h4" color="text.secondary" mr={2}>
            Cluster:
          </Text>
          <Text as="span" typography="h4" color="text.primary">
            {`   ${clusterName}`}
          </Text>
        </Flex>

        <Flex mb="4" typography="body1">
          {navItems.map(item => (
            <ClusterNavButton
              key={item.location}
              title={item.title}
              to={item.location}
            />
          ))}
        </Flex>
        {clusterCtx.isLocationActive('/resources/') && <ClusterResources />}
      </Layout>
    </Document>
  );
}

type DocumentProps = {
  visible: boolean;
  doc: types.DocumentCluster;
};

const Layout = styled(Box)`
  flex-direction: column;
  display: flex;
  flex: 1;
  max-width: 1024px;
  ::after {
    content: ' ';
    padding-bottom: 24px;
  }
`;