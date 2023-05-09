import { Module } from '@gotecq/core';
import { BoilerplateListPanel, BoilerplateDetailPanel, BoilerplateWelcomePanel } from './panels';
import { BoilerplateMainLayout } from './layouts';
import { AppModules, ModulePanels } from '@/constant';

function setup(module: Module) {
    module.panel(ModulePanels.boilerplate.list, BoilerplateListPanel);
    module.panel(ModulePanels.boilerplate.detail, BoilerplateDetailPanel);
    module.panel(ModulePanels.boilerplate.welcome, BoilerplateWelcomePanel);

    module.route({
        path: `/${AppModules.BOILERPLATE}/`,
        title: 'Boilerplate',
        exact: false,
        secure: true,
        component: BoilerplateMainLayout,
    });
}

export { setup };
