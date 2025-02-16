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

import { render, fireEvent } from 'design/utils/testing';

import Modal from './Modal';

const renderModal = props => {
  return render(
    <Modal open={true} {...props}>
      <div>Hello</div>
    </Modal>
  );
};

const escapeKey = {
  key: 'Escape',
};

describe('design/Modal', () => {
  it('respects open prop set to false', () => {
    const { queryByTestId } = render(
      <Modal open={false}>
        <div>Hello</div>
      </Modal>
    );

    expect(queryByTestId('Modal')).toBeNull();
  });

  it('respects onBackdropClick prop', () => {
    const mockFn = jest.fn();

    const { getByTestId } = renderModal({
      onBackdropClick: mockFn,
    });

    // handlebackdropClick
    fireEvent.click(getByTestId('backdrop'));
    expect(mockFn).toHaveBeenCalled();
  });

  it('respects onEscapeKeyDown props', () => {
    const mockFn = jest.fn();

    const { container } = renderModal({
      onEscapeKeyDown: mockFn,
    });

    // handleDocumentKeyDown
    fireEvent.keyDown(container, escapeKey);
    expect(mockFn).toHaveBeenCalled();
  });

  it('respects onClose prop', () => {
    const mockFn = jest.fn();

    const { container, getByTestId } = renderModal({
      onClose: mockFn,
    });

    // handlebackdropClick
    fireEvent.click(getByTestId('backdrop'));
    expect(mockFn).toHaveBeenCalled();

    // handleDocumentKeyDown
    fireEvent.keyDown(container, escapeKey);
    expect(mockFn).toHaveBeenCalled();
  });

  it('respects hideBackDrop prop', () => {
    const { queryByTestId } = renderModal({
      hideBackdrop: true,
    });

    expect(queryByTestId('backdrop')).toBeNull();
  });

  it('respects disableBackdropClick prop', () => {
    const mockFn = jest.fn();
    const { getByTestId } = renderModal({
      disableBackdropClick: true,
      onClose: mockFn,
    });

    // handleBackdropClick
    fireEvent.click(getByTestId('backdrop'));
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('respects disableEscapeKeyDown prop', () => {
    const mockFn = jest.fn();
    const { container } = renderModal({
      disableEscapeKeyDown: true,
      onClose: mockFn,
    });

    // handleDocumentKeyDown
    fireEvent.keyDown(container, escapeKey);
    expect(mockFn).not.toHaveBeenCalled();
  });

  test('unmount cleans up event listeners and closes modal', () => {
    const mockFn = jest.fn();
    const { container, queryByTestId, unmount } = renderModal({
      onEscapeKeyDown: mockFn,
    });

    unmount();

    expect(queryByTestId('Modal')).toBeNull();

    fireEvent.keyDown(container, escapeKey);
    expect(mockFn).not.toHaveBeenCalled();
  });

  test('respects backdropProps prop invisible', () => {
    const { getByTestId } = renderModal({
      BackdropProps: { invisible: true },
    });

    expect(getByTestId('backdrop')).toHaveStyle({
      'background-color': 'transparent',
    });
  });
});
