import { Module } from '@gotecq/core';
import { TechnologyDetailDashboardPanel, TechnologySideNavPanel, TechnologyDashboardUtilsPanel, TechnologyFavoriteDashboardPanel, TechnologyWorkItemOverviewPanel, TechnologyHelpPanel } from './panels';
import { TechnologyMainLayout } from './layouts';
import { AppModules, DashboardCode, ModulePanels } from '@/constant';
import { ActivityDashboardRedirect, ChronicRenalMembersRedirect, ComplicatedConditionsMemberRedirect, HighCostMembersRedirect, HomeHealthVisitsRedirect, InventoryDashboardRedirect, MAHDashboardRedirect, MemberDashboardRedirect, MemberDistributionMapRedirect, NoOfficeVisitRedirect, PotentialHighCostMembersRedirect, ProcessDashboardRedirect, ProviderDashboardRedirect, QualityDashboardRedirect, RedirectWelcome, StarDashboardRedirect, UserDashboardRedirect } from './page/welcome';

function setup(module: Module) {
    module.panel(ModulePanels.dashboards.sideNav, TechnologySideNavPanel);
    module.panel(ModulePanels.dashboards.detailDashboard, TechnologyDetailDashboardPanel);
    module.panel(ModulePanels.dashboards.dashboardUtils, TechnologyDashboardUtilsPanel);
    module.panel(ModulePanels.common.favoriteDashboard, TechnologyFavoriteDashboardPanel);
    module.panel(ModulePanels.common.workItemOverview, TechnologyWorkItemOverviewPanel);
    module.panel(ModulePanels.common.help, TechnologyHelpPanel);

    module.route({
        path: `/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.welcome}`,
        title: 'Dashboards',
        exact: true,
        secure: true,
        component: RedirectWelcome,
    });
    module.route({
        path: `/${AppModules.DASHBOARDS}/`,
        title: 'Dashboards',
        exact: false,
        secure: true,
        component: TechnologyMainLayout,
    });
    module.route({
        path: `/${DashboardCode.MEMBER_PANEL_SUMMARY}-redirect/`,
        title: 'Member Panel Summary',
        exact: true,
        secure: true,
        component: MemberDashboardRedirect,
    });
    module.route({
        path: `/${DashboardCode.QUALITY_MEASURE}-redirect/`,
        title: 'Quality Management',
        exact: true,
        secure: true,
        component: QualityDashboardRedirect,
    });
    module.route({
        path: `/${DashboardCode.ACTIVITY_SUMMARY}-redirect/`,
        title: 'Activity Summary',
        exact: true,
        secure: true,
        component: ActivityDashboardRedirect,
    });
    module.route({
        path: `/${DashboardCode.MAH_DASHBOARD}-redirect/`,
        title: 'MAH Dashboard',
        exact: true,
        secure: true,
        component: MAHDashboardRedirect,
    });
    module.route({
        path:`/${DashboardCode.STAR_DASHBOARD}-redirect/`,
        title: 'Star Dashboard',
        exact: true,
        secure: true,
        component: StarDashboardRedirect,
    });
    module.route({
        path: `/${DashboardCode.USER_MANAGEMENT}-redirect/`,
        title: 'User Management',
        exact: true,
        secure: true,
        component: UserDashboardRedirect,
    });
    module.route({
        path: `/${DashboardCode.PROVIDER_MANAGEMENT}-redirect/`,
        title: 'Provider Management',
        exact: true,
        secure: true,
        component: ProviderDashboardRedirect,
    });
    module.route({
        path: `/${DashboardCode.PROCESS_MANAGEMENT}-redirect/`,
        title: 'Process Management',
        exact: true,
        secure: true,
        component: ProcessDashboardRedirect,
    });
    module.route({
        path: `/${DashboardCode.INVENTORY_MANAGEMENT}-redirect/`,
        title: 'Inventory Management',
        exact: true,
        secure: true,
        component: InventoryDashboardRedirect,
    });
    module.route({
        path: `/${DashboardCode.HIGH_COST_MEMBERS}-redirect/`,
        title: 'High Cost Members',
        exact: true,
        secure: true,
        component: HighCostMembersRedirect,
    });
    module.route({
        path: `/${DashboardCode.COMPLICATED_CONDITIONS_MEMBER}-redirect/`,
        title: 'Members With Complicated Conditions',
        exact: true,
        secure: true,
        component: ComplicatedConditionsMemberRedirect,
    });
    module.route({
        path: `/${DashboardCode.POTENTIAL_HIGH_COST_MEMBERS}-redirect/`,
        title: 'Potential High Cost Members',
        exact: true,
        secure: true,
        component: PotentialHighCostMembersRedirect,
    });
    module.route({
        path: `/${DashboardCode.CHRONIC_RENAL_FAILURE_MEMBERS}-redirect/`,
        title: 'Chronic Kidney Disease Members',
        exact: true,
        secure: true,
        component: ChronicRenalMembersRedirect,
    });
    module.route({
        path: `/${DashboardCode.HOME_HEALTH_EMERGENCY_ROOM_VISITS}-redirect/`,
        title: 'Home Health and Emergency Room Visits',
        exact: true,
        secure: true,
        component: HomeHealthVisitsRedirect,
    });
    module.route({
        path: `/${DashboardCode.MEMBERS_WITHOUT_OFFICE_VISIT}-redirect/`,
        title: 'Members Without Office Visit',
        exact: true,
        secure: true,
        component: NoOfficeVisitRedirect,
    });
    module.route({
        path: `/${DashboardCode.MEMBER_DISTRIBUTION_MAP}-redirect/`,
        title: 'Member Distribution Map',
        exact: true,
        secure: true,
        component: MemberDistributionMapRedirect,
    });
}

export { setup };
