import { Module } from '@gotecq/core';
import { DetailDashboardCompactPanel, DashboardUtilsCompactPanel } from './panels';
import { DashboardCompactMainLayout } from './layouts';
import { AppModules, ModulePanels } from '@/constant';

function setup(module: Module) {
    module.panel(ModulePanels.dashboardCompact.detailDashboard, DetailDashboardCompactPanel);
    module.panel(ModulePanels.dashboardCompact.dashboardUtils, DashboardUtilsCompactPanel);

    module.route({
        path: `/${AppModules.DASHBOARD_COMPACT}/`,
        title: 'Dashboard Compact',
        exact: false,
        secure: true,
        component: DashboardCompactMainLayout,
    });
}

export { setup };
