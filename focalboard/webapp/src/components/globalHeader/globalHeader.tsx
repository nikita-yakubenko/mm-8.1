// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
//
import React from 'react'
import {Provider as ReduxProvider} from 'react-redux'
import {IntlProvider} from 'react-intl'
import {History} from 'history'

import HelpIcon from '../../widgets/icons/help'
import store from '../../store'
import {useAppSelector} from '../../store/hooks'
import {getLanguage} from '../../store/language'
import {getMessages} from '../../i18n'

import {Constants} from '../../constants'

import GlobalHeaderSettingsMenu from './globalHeaderSettingsMenu'

import './globalHeader.scss'

type HeaderItemProps = {
    history: History<unknown>
}

const HeaderItems = (props: HeaderItemProps) => {

    return (
        <>
        </>
    )
}

type Props = {
    history: History<unknown>
}

const GlobalHeader = (props: Props): JSX.Element => {
    return (
        <ReduxProvider store={store}>
            <HeaderItems history={props.history}/>
        </ReduxProvider>
    )
}

export default GlobalHeader
