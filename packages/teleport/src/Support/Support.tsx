/**
 * Copyright 2020 Gravitational, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import * as Icons from 'design/Icon';
import { Card, Box, Text, Flex } from 'design';

import styled from 'styled-components';

import { FeatureBox } from 'teleport/components/Layout';
import useTeleport from 'teleport/useTeleport';
import cfg from 'teleport/config';

export default function Container() {
  const ctx = useTeleport();
  const cluster = ctx.storeUser.state.cluster;

  return (
    <Support
      {...cluster}
      isEnterprise={cfg.isEnterprise}
      tunnelPublicAddress={cfg.tunnelPublicAddress}
      isCloud={cfg.isCloud}
    />
  );
}

export const Support = ({
  clusterId,
  authVersion,
  publicURL,
  isEnterprise,
  tunnelPublicAddress,
  isCloud,
}: Props) => {
  const docs = getDocUrls(authVersion, isEnterprise);

  return (
    <FeatureBox pt="4">
      <Card px={5} pt={1} pb={6}>
        <Flex justifyContent="space-between" flexWrap="wrap">
          <Box>
            <Header title="Support" icon={<Icons.LocalPlay />} />
            {isEnterprise && (
              <SupportLink
                title="Create a Support Ticket"
                url="https://gravitational.zendesk.com/hc/en-us/requests/new"
              />
            )}
            <SupportLink
              title="Ask the Community Questions"
              url="https://github.com/gravitational/teleport/discussions"
            />
            <SupportLink
              title="Request a New Feature"
              url="https://github.com/gravitational/teleport/issues/new/choose"
            />
            <SupportLink
              title="Send Product Feedback"
              url="mailto:support@goteleport.com"
            />
          </Box>
          <Box>
            <Header title="Resources" icon={<Icons.ListCheck />} />
            <SupportLink title="Quickstart Guide" url={docs.quickstart} />
            <SupportLink title="tsh User Guide" url={docs.userManual} />
            <SupportLink title="Admin Guide" url={docs.adminGuide} />
            <SupportLink
              title="Download Page"
              url={getDownloadLink(isCloud, isEnterprise)}
            />
            <SupportLink title="FAQ" url={docs.faq} />
          </Box>
          <Box>
            <Header title="Troubleshooting" icon={<Icons.Graph />} />
            <SupportLink
              title="Monitoring & Debugging"
              url={docs.troubleshooting}
            />
          </Box>
          <Box>
            <Header title="Updates" icon={<Icons.NotificationsActive />} />
            <SupportLink
              title="Product Changelog"
              url="https://github.com/gravitational/teleport/blob/master/CHANGELOG.md"
            />
            <SupportLink
              title="Teleport Blog"
              url="https://goteleport.com/blog/"
            />
          </Box>
        </Flex>
      </Card>
      <Box
        border="1px solid"
        borderColor="primary.light"
        mt={4}
        mb={10}
        borderRadius={3}
        px={5}
        py={4}
      >
        <Text as="h5" mb={4} fontWeight="bold" caps>
          Cluster Information
        </Text>
        <ClusterData title="Cluster Name" data={clusterId} />
        <ClusterData title="Teleport Version" data={authVersion} />
        <ClusterData title="Public Address" data={publicURL} />
        {tunnelPublicAddress && (
          <ClusterData title="Public SSH Tunnel" data={tunnelPublicAddress} />
        )}
      </Box>
    </FeatureBox>
  );
};

/**
 * getDocUrls returns an object of URL's appended with
 * UTM, version, and type of teleport.
 *
 * @param version teleport version retrieved from cluster info.
 */
const getDocUrls = (version = '', isEnterprise: boolean) => {
  const verPrefix = isEnterprise ? 'e' : 'oss';

  /**
   * withUTM appends URL with UTM parameters.
   * anchor hashes must be appended at end of URL otherwise it is ignored.
   *
   * @param url the full link to the specific documentation.
   * @param anchorHash the hash in URL that predefines scroll location in the page.
   */
  const withUTM = (url = '', anchorHash = '') =>
    `${url}?product=teleport&version=${verPrefix}_${version}${anchorHash}`;

  return {
    quickstart: withUTM('https://goteleport.com/docs/getting-started'),
    userManual: withUTM('https://goteleport.com/docs/server-access/guides/tsh'),
    adminGuide: withUTM('https://goteleport.com/docs/setup/admin'),
    troubleshooting: withUTM(
      'https://goteleport.com/docs/setup/admin/troubleshooting'
    ),
    faq: withUTM('https://goteleport.com/docs/faq'),
  };
};

const getDownloadLink = (isCloud: boolean, isEnterprise: boolean) => {
  if (isCloud) {
    return 'https://goteleport.com/docs/cloud/downloads/';
  }

  if (isEnterprise) {
    return 'https://dashboard.gravitational.com/web/downloads';
  }

  return 'https://goteleport.com/download/';
};

const SupportLink = ({ title = '', url = '' }) => (
  <StyledSupportLink href={url}>{title}</StyledSupportLink>
);

const StyledSupportLink = styled.a.attrs({
  rel: 'noreferrer',
})`
  display: block;
  color: ${props => props.theme.colors.light};
  border-radius: 4px;
  text-decoration: none;
  margin-bottom: 8px;
  padding: 4px 8px;
  transition: all 0.3s;
  ${props => props.theme.typography.body2}
  &:hover, &:focus {
    background: ${props => props.theme.colors.primary.lighter};
  }
`;

const ClusterData = ({ title = '', data = null }) => (
  <Flex mb={3}>
    <Text typography="body2" bold style={{ width: '130px' }}>
      {title}:
    </Text>
    <Text typography="body2">{data}</Text>
  </Flex>
);

const Header = ({ title = '', icon = null }) => (
  <Flex
    alignItems="center"
    borderBottom="1px solid"
    borderColor="primary.dark"
    mb={3}
    width={210}
    mt={4}
    pb={2}
  >
    <Text pr={2} fontSize={18}>
      {icon}
    </Text>
    <Text as="h5" caps>
      {title}
    </Text>
  </Flex>
);

type Props = {
  clusterId: string;
  authVersion: string;
  publicURL: string;
  isEnterprise: boolean;
  isCloud: boolean;
  tunnelPublicAddress?: string;
};
