// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {Settings} from 'luxon';

import {getCurrentLocale} from 'selectors/i18n';
import {getCurrentTimezone, isTimezoneEnabled} from 'mattermost-redux/selectors/entities/timezone';
import {GlobalState} from 'types/store';

let prevTimezone: string | undefined;
let prevLocale: string | undefined;
export function applyLuxonDefaults(state: GlobalState) {
    const locale = getCurrentLocale(state);
    if (locale !== prevLocale) {
        prevLocale = locale;
        Settings.defaultLocale = locale;
    }

    if (isTimezoneEnabled(state)) {
        const tz = getCurrentTimezone(state);
        if (tz !== prevTimezone) {
            prevTimezone = tz;
            Settings.defaultZone = tz ?? 'system';
        }
    }
}
