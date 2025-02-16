/*
Copyright 2021 Gravitational, Inc.

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

import React from 'react';
import { Text, Box, ButtonSecondary, Link } from 'design';
import Dialog, {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from 'design/Dialog';

import { AuthType } from 'teleport/services/user';
import TextSelectCopy from 'teleport/components/TextSelectCopy';
import { DbProtocol } from 'teleport/services/databases';

export default function ConnectDialog({
  username,
  dbName,
  onClose,
  authType,
}: Props) {
  const { hostname, port } = window.document.location;
  const host = `${hostname}:${port || '443'}`;

  const connectCmd =
    authType === 'sso'
      ? `tsh login --proxy=${host}`
      : `tsh login --proxy=${host} --auth=local --user=${username}`;

  return (
    <Dialog
      dialogCss={() => ({
        maxWidth: '600px',
        width: '100%',
      })}
      disableEscapeKeyDown={false}
      onClose={onClose}
      open={true}
    >
      <DialogHeader mb={4}>
        <DialogTitle>Connect To Database</DialogTitle>
      </DialogHeader>
      <DialogContent minHeight="240px" flex="0 0 auto">
        <Box mb={4}>
          <Text bold as="span">
            Step 1
          </Text>
          {' - Login to Teleport'}
          <TextSelectCopy mt="2" text={connectCmd} />
        </Box>
        <Box mb={4}>
          <Text bold as="span">
            Step 2
          </Text>
          {' - Retrieve credentials for the database'}
          <TextSelectCopy
            mt="2"
            text={`tsh db login [--db-user=<user>] [--db-name=<name>] ${dbName}`}
          />
        </Box>
        <Box mb={4}>
          <Text bold as="span">
            Step 3
          </Text>
          {' - Connect to the database'}
          <TextSelectCopy
            mt="2"
            text={`tsh db connect [--db-user=<user>] [--db-name=<name>] ${dbName}`}
          />
        </Box>
        <Box>
          {`* Note: To connect with a GUI database client, see our `}
          <Link
            href={
              'https://goteleport.com/docs/database-access/guides/gui-clients/'
            }
            target="_blank"
          >
            documentation
          </Link>
          {` for instructions.`}
        </Box>
      </DialogContent>
      <DialogFooter>
        <ButtonSecondary onClick={onClose}>Close</ButtonSecondary>
      </DialogFooter>
    </Dialog>
  );
}

export type Props = {
  dbName: string;
  dbProtocol: DbProtocol;
  onClose: () => void;
  username: string;
  clusterId: string;
  authType: AuthType;
};
