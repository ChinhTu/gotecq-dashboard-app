import { Module } from '@gotecq/core';
import { ExperienceDetailDashboardPanel, ExperienceSideNavPanel, ExperienceDashboardUtilsPanel, ExperienceFavoriteDashboardPanel, ExperienceWorkItemOverviewPanel, ExperienceHelpPanel } from './panels';
import { ExperienceMainLayout } from './layouts';
import { AppModules, ModulePanels } from '@/constant';
import { RedirectWelcome } from './page/welcome';

function setup(module: Module) {
    module.panel(ModulePanels.experience.sideNav, ExperienceSideNavPanel);
    module.panel(ModulePanels.experience.detailDashboard, ExperienceDetailDashboardPanel);
    module.panel(ModulePanels.experience.dashboardUtils, ExperienceDashboardUtilsPanel);
    module.panel(ModulePanels.common.favoriteDashboard, ExperienceFavoriteDashboardPanel);
    module.panel(ModulePanels.common.workItemOverview, ExperienceWorkItemOverviewPanel);
    module.panel(ModulePanels.common.help, ExperienceHelpPanel);

    module.route({
        path: `/${AppModules.EXPERIENCE}/${ModulePanels.experience.welcome}`,
        title: 'Experience',
        exact: true,
        secure: true,
        component: RedirectWelcome,
    });
    module.route({
        path: `/${AppModules.EXPERIENCE}/`,
        title: 'Experience',
        exact: false,
        secure: true,
        component: ExperienceMainLayout,
    });
}

export { setup };
