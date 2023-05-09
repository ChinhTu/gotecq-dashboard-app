import { DashboardUtilsMenu } from '@/components/dashboard-utils';
import { AppModules, DashboardCode, ModulePanels, PanelParams } from '@/constant';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { ExperienceSideNavMode } from '@/utils';

export function RedirectWelcome() {
    return (
        <Redirect
            to={{
                pathname: `/${AppModules.EXPERIENCE}/${ModulePanels.experience.detailDashboard}/${ModulePanels.experience.dashboardUtils}/${ModulePanels.experience.sideNav}`,
                search: `q={"${PanelParams.common.detailDashboard.dashboardCode}":"${DashboardCode.EXPERIENCE_SUMMARY}","${PanelParams.common.dashboardUtils.activeMenu}":"${DashboardUtilsMenu.DISCUSSION}"}&qs={}&qe={"${PanelParams.common.sideNav.menuMode}":"${ExperienceSideNavMode.SUMMARY}"}`,
            }}
        />
    );
};
