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

import React from 'react';
import { fireEvent, render, screen } from 'design/utils/testing';

import { Props, AddDatabase } from './AddDatabase';
import { State } from './useAddDatabase';

describe('correct database add command generated with given input', () => {
  test.each`
    input                     | output
    ${'self-hosted mysql'}    | ${'teleport db configure create --token=[generated-join-token] --proxy=localhost:443 --name=[db-name] --protocol=mysql --uri=[uri] -o file'}
    ${'rds mysql'}            | ${'teleport db configure create --token=[generated-join-token] --proxy=localhost:443 --name=[db-name] --protocol=mysql --uri=[uri] -o file --aws-region=[region]'}
    ${'cloud sql mysql'}      | ${'teleport db configure create --token=[generated-join-token] --proxy=localhost:443 --name=[db-name] --protocol=mysql --uri=[uri] -o file --ca-cert-file=[instance-ca-filepath] --gcp-project-id=[project-id] --gcp-instance-id=[instance-id]'}
    ${'self-hosted postgres'} | ${'teleport db configure create --token=[generated-join-token] --proxy=localhost:443 --name=[db-name] --protocol=postgres --uri=[uri] -o file'}
    ${'rds postgres'}         | ${'teleport db configure create --token=[generated-join-token] --proxy=localhost:443 --name=[db-name] --protocol=postgres --uri=[uri] -o file --aws-region=[region]'}
    ${'cloud sql postgres'}   | ${'teleport db configure create --token=[generated-join-token] --proxy=localhost:443 --name=[db-name] --protocol=postgres --uri=[uri] -o file --ca-cert-file=[instance-ca-filepath] --gcp-project-id=[project-id] --gcp-instance-id=[instance-id]'}
    ${'redshift'}             | ${'teleport db configure create --token=[generated-join-token] --proxy=localhost:443 --name=[db-name] --protocol=postgres --uri=[uri] -o file --aws-region=[region] --aws-redshift-cluster-id=[cluster-id]'}
    ${'self-hosted mongodb'}  | ${'teleport db configure create --token=[generated-join-token] --proxy=localhost:443 --name=[db-name] --protocol=mongodb --uri=[uri] -o file'}
  `(
    'should generate correct command for input: $input',
    ({ input, output }) => {
      render(<AddDatabase {...props} />);

      const dropDownInputEl = document.querySelector('input');

      fireEvent.change(dropDownInputEl, { target: { value: input } });
      fireEvent.focus(dropDownInputEl);
      fireEvent.keyDown(dropDownInputEl, { key: 'Enter', keyCode: 13 });

      expect(screen.queryByText(output)).not.toBeNull();
    }
  );
});

const props: Props & State = {
  isEnterprise: false,
  username: 'yassine',
  version: '6.1.3',
  onClose: () => null,
  authType: 'local',
  attempt: {
    status: 'failed',
    statusText: '',
  } as any,
  token: { id: 'some-token', expiryText: '4 hours', expiry: null },
  createJoinToken() {
    return Promise.resolve(null);
  },
};
