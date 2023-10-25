// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {createContext} from 'react';

interface MenuSubmenuContextType {
    close?: () => void;
    isOpen: boolean;
}

export const MenuContext = createContext<MenuSubmenuContextType>({
    isOpen: false,
});
MenuContext.displayName = 'MenuContext';

export const SubMenuContext = createContext<MenuSubmenuContextType>({
    isOpen: false,
});
SubMenuContext.displayName = 'SubMenuContext';

