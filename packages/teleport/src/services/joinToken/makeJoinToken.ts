/*
Copyright 2022 Gravitational, Inc.

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

import { formatDistanceStrict } from 'date-fns';

import { JoinToken } from './types';

export default function makeToken(json): JoinToken {
  json = json || {};
  const { id, expiry } = json;
  return {
    id,
    expiry: expiry ? new Date(expiry) : null,
    expiryText: expiry
      ? formatDistanceStrict(new Date(), new Date(expiry))
      : '',
  };
}
