/**
 * Copyright 2021 Gravitational, Inc.
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

import React, { useState } from 'react';
import * as Alerts from 'design/Alert';
import { Box, Text, ButtonPrimary, ButtonSecondary } from 'design';
import FieldInput from 'shared/components/FieldInput';
import Validation from 'shared/components/Validation';
import { requiredField } from 'shared/components/Validation/rules';
import { DialogContent, DialogHeader } from 'design/Dialog';
import { useClusterAdd } from 'teleterm/ui/ClusterConnect/ClusterAdd/useClusterAdd';
import { Attempt } from 'teleterm/ui/useAsync';

export function ClusterAdd(props: ClusterAddProps) {
  const clusterAdd = useClusterAdd(props);
  return <ClusterAddPresentation {...clusterAdd} />;
}

export function ClusterAddPresentation({
  onClose,
  addCluster,
  status,
  statusText,
}: ClusterAddPresentationProps) {
  const [addr, setAddr] = useState('');

  return (
    <Validation>
      {({ validator }) => (
        <form>
          <DialogHeader>
            <Text typography="h4">Enter cluster address</Text>
          </DialogHeader>
          <DialogContent mb={2}>
            {status === 'error' && (
              <Alerts.Danger mb={5} children={statusText} />
            )}
            <FieldInput
              rule={requiredField('Cluster address is required')}
              value={addr}
              autoFocus
              onChange={e => setAddr(e.target.value)}
              placeholder="https://cluster"
            />
            <Box mt="5">
              <ButtonPrimary
                disabled={status === 'processing'}
                mr="3"
                onClick={e => {
                  e.preventDefault();
                  validator.validate() && addCluster(addr);
                }}
              >
                Next
              </ButtonPrimary>
              <ButtonSecondary
                disabled={status === 'processing'}
                onClick={e => {
                  e.preventDefault();
                  onClose();
                }}
              >
                CANCEL
              </ButtonSecondary>
            </Box>
          </DialogContent>
        </form>
      )}
    </Validation>
  );
}

export type ClusterAddProps = {
  onClose(): void;
  onSuccess(clusterUri: string): void;
};

export type ClusterAddPresentationProps = {
  onClose(): void;
  addCluster(address: string): void;
  status: Attempt<any>['status'];
  statusText: string;
};
