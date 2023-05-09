import React from 'react';
import { Redirect } from 'react-router-dom';
import { AppModules, ModulePanels } from '@/constant';

export function RedirectWelcome() {
    return (
        <Redirect
            to={{
                pathname: `/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.welcome}`,
                search: '',
            }}
        />
    );
};
