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

import { render, screen } from 'design/utils/testing';

import {
  Loaded,
  Failed,
  ManuallyWithoutTokenLocal,
  ManuallyWithoutTokenSSO,
  ManuallyWithToken,
  IamWithoutToken,
  IamWithToken,
  IamProcessing,
  IamFailed,
} from './AddNode.story';

test('render automatic tab', async () => {
  render(<Loaded />);
  expect(screen.getByTestId('Modal')).toMatchSnapshot();
});

test('render failed automatic tab', async () => {
  render(<Failed />);
  expect(screen.getByTestId('Modal')).toMatchSnapshot();
});

test('render manual tab with local user', async () => {
  render(<ManuallyWithoutTokenLocal />);
  expect(screen.getByTestId('Modal')).toMatchSnapshot();
});

test('render manual tab with sso user', async () => {
  render(<ManuallyWithoutTokenSSO />);
  expect(screen.getByTestId('Modal')).toMatchSnapshot();
});

test('render manual tab with join token', async () => {
  render(<ManuallyWithToken />);
  expect(screen.getByTestId('Modal')).toMatchSnapshot();
});

test('render iam method without a token generated yet', async () => {
  render(<IamWithoutToken />);
  expect(screen.getByTestId('Modal')).toMatchSnapshot();
});

test('render iam method after token generation', async () => {
  render(<IamWithToken />);
  expect(screen.getByTestId('Modal')).toMatchSnapshot();
});

test('render iam method while processing', async () => {
  render(<IamProcessing />);
  expect(screen.getByTestId('Modal')).toMatchSnapshot();
});

test('render iam method when failed', async () => {
  render(<IamFailed />);
  expect(screen.getByTestId('Modal')).toMatchSnapshot();
});
