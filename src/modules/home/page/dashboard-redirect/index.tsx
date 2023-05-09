import './index.scss';
import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { getDashboardByCode, ModulePanels, PanelParams } from '@/constant';
import { DashboardUtilsMenu } from '@/components/dashboard-utils';
import { SummarySideNavMode, TechnologySideNavMode } from '@/utils';
import { DashboardOption } from '@gotecq/component.complex-component';

const {
    common,
} = PanelParams;

export function DashboardRedirect() {
    const { dashboardCode, defaultParam } = useParams() as any;
    const localDashboard = getDashboardByCode(dashboardCode, true);

    if (!localDashboard) {
        return (
            <div className="dashboard-not-found">
                <div>Dashboard Not Found</div>
            </div>
        );
    }

    function getPrimaryParams(local_dashboard: DashboardOption) {
        const { isSummary, code, getDefaultFilter } = local_dashboard;

        return [
            'q={',
            [
                `"${common.detailDashboard.dashboardCode}":"${code}"`,
                !defaultParam ? undefined : `"${common.detailDashboard.defaultDashboardParam}":"${defaultParam}"`,
                `"${common.dashboardUtils.activeMenu}":"${isSummary ? DashboardUtilsMenu.DISCUSSION : DashboardUtilsMenu.QUERY}"`,
                getDefaultFilter ? `"filter":${getDefaultFilter()}` : null,
            ].filter(segment => segment != null).join(','),
            '}',
        ].join('');
    }

    const { aspect_key, code } = localDashboard;
    return (
        <Redirect
            to={{
                pathname: `/${aspect_key}/${ModulePanels.common.detailDashboard}/${ModulePanels.common.dashboardUtils}/${ModulePanels.common.sideNav}`,
                search:
                    getPrimaryParams(localDashboard)
                    + '&qs={}'
                    + `&qe={"${PanelParams.common.sideNav.menuMode}":"${TechnologySideNavMode.SUMMARY}","${PanelParams.common.sideNav.subMenuMode}":"${code}"}`,
            }}
        />
    );
}
