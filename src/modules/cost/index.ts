// import { Module } from '@gotecq/core';
// import { CostDetailDashboardPanel, CostSideNavPanel, CostDashboardUtilsPanel, CostFavoriteDashboardPanel, CostWorkItemOverviewPanel, CostHelpPanel } from './panels';
// import { CostMainLayout } from './layouts';
// import { AppModules, ModulePanels } from '@/constant';
// import { RedirectWelcome } from './page/welcome';

// function setup(module: Module) {
//     module.panel(ModulePanels.cost.sideNav, CostSideNavPanel);
//     module.panel(ModulePanels.cost.detailDashboard, CostDetailDashboardPanel);
//     module.panel(ModulePanels.cost.dashboardUtils, CostDashboardUtilsPanel);
//     module.panel(ModulePanels.common.favoriteDashboard, CostFavoriteDashboardPanel);
//     module.panel(ModulePanels.common.workItemOverview, CostWorkItemOverviewPanel);
//     module.panel(ModulePanels.common.help, CostHelpPanel);

//     module.route({
//         path: `/${AppModules.COST}/${ModulePanels.cost.welcome}`,
//         title: 'Cost',
//         exact: true,
//         secure: true,
//         component: RedirectWelcome,
//     });
//     module.route({
//         path: `/${AppModules.COST}/`,
//         title: 'Cost',
//         exact: false,
//         secure: true,
//         component: CostMainLayout,
//     });
// }

// export { setup };
