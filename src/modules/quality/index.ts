// import { Module } from '@gotecq/core';
// import { QualityDetailDashboardPanel, QualitySideNavPanel, QualityDashboardUtilsPanel, QualityFavoriteDashboardPanel, QualityWorkItemOverviewPanel, QualityHelpPanel } from './panels';
// import { QualityMainLayout } from './layouts';
// import { AppModules, ModulePanels } from '@/constant';
// import { RedirectWelcome } from './page/welcome';

// function setup(module: Module) {
//     module.panel(ModulePanels.quality.sideNav, QualitySideNavPanel);
//     module.panel(ModulePanels.quality.detailDashboard, QualityDetailDashboardPanel);
//     module.panel(ModulePanels.quality.dashboardUtils, QualityDashboardUtilsPanel);
//     module.panel(ModulePanels.common.favoriteDashboard, QualityFavoriteDashboardPanel);
//     module.panel(ModulePanels.common.workItemOverview, QualityWorkItemOverviewPanel);
//     module.panel(ModulePanels.common.help, QualityHelpPanel);

//     module.route({
//         path: `/${AppModules.QUALITY}/${ModulePanels.quality.welcome}`,
//         title: 'Quality',
//         exact: true,
//         secure: true,
//         component: RedirectWelcome,
//     });
//     module.route({
//         path: `/${AppModules.QUALITY}/`,
//         title: 'Quality',
//         exact: false,
//         secure: true,
//         component: QualityMainLayout,
//     });
// }

// export { setup };
