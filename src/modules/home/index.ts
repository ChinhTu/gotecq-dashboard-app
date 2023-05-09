import { Module } from '@gotecq/core';
import { HomeMainPanel } from './panels';
// import { HomeMainLayout } from './layouts';
import { AppModules, ModulePanels } from '@/constant';
// import { RedirectWelcome } from './page/welcome';
import { DashboardRedirect } from './page/dashboard-redirect';
import { MemberDashboardRedirect } from '../technology/page/welcome';

function setup(module: Module) {
    module.panel(ModulePanels.home.main, HomeMainPanel);

    module.route({
        path: `/${AppModules.DASHBOARD_REDIRECT}/:dashboardCode/:defaultParam`,
        title: 'Work Management',
        exact: true,
        secure: true,
        component: DashboardRedirect,
    });

    module.route({
        path: `/${AppModules.DASHBOARD_REDIRECT}/:dashboardCode`,
        title: 'Work Management',
        exact: true,
        secure: true,
        component: DashboardRedirect,
    });

    // @todo: override for now, REMOVE when HOME module is ready
    module.route({
        path: `/${AppModules.HOME}/`,
        title: 'Home',
        exact: false,
        secure: true,
        component: MemberDashboardRedirect,
    });

    // @todo: comment for now, RESTORE when HOME module is ready
    // module.route({
    //     path: `/${AppModules.HOME}/`,
    //     title: 'Home',
    //     exact: false,
    //     secure: true,
    //     component: HomeMainLayout,
    // });
}

export { setup };
