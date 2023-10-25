// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {OutlinedInput as MUIOutlineInput, OutlinedInputProps} from '@mui/material';

/**
 * A horizontal separator for use in menus.
 * @example
 * <OutlineInput
 *   data-testid='my-input'
 *   size='small|medium
 *   value=10
 *   onChange={myChangeHandler}
 *   error=true
 *   disabled=false
 * />
 */

export function OutlinedInput(props: OutlinedInputProps) {
    return (
        <MUIOutlineInput
            {...props}
        />
    );
}
