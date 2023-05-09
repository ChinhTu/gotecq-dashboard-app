import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import { LayoutManager, DefaultURLEncoder } from '@gotecq/layout';
import { EntityModule, ENTITY_KEY } from '@gotecq/state';
import { BaseApplication, AppBoundary, AppWrapper, PageError404, Module } from '@gotecq/core';
import { BASE_URL, loadAsyncConfig, AppModules, ModulePanels } from './constant';
import { setup as AuthSetup } from '@gotecq/core';
import { setup as BoilerplateModuleSetup } from './modules/boilerplate-module';
import { setup as HomeModuleSetup } from './modules/home';
import { setup as TechnologyModuleSetup } from './modules/technology';
import { setup as ExperienceModuleSetup } from './modules/experience';
// import { setup as CostModuleSetup } from './modules/cost';
// import { setup as QualityModuleSetup } from './modules/quality';
import { setup as DashboardCompactModuleSetup } from './modules/dashboard-compact';
import { AppNavBar } from './components';
import { loadCapabilityMatrix } from './config';
import './app.scss';

const InstalledModule = {
    [AppModules.AUTH]: { setup: AuthSetup },
    [AppModules.BOILERPLATE]: { setup: BoilerplateModuleSetup },
    [AppModules.HOME]: { setup: HomeModuleSetup },
    [AppModules.DASHBOARDS]: { setup: TechnologyModuleSetup },
    [AppModules.EXPERIENCE]: { setup: ExperienceModuleSetup },
    // [AppModules.COST]: { setup: CostModuleSetup },
    // [AppModules.QUALITY]: { setup: QualityModuleSetup },
    [AppModules.DASHBOARD_COMPACT]: { setup: DashboardCompactModuleSetup },

};

export default class RootApplication extends BaseApplication {
    layoutManager!: LayoutManager;

    constructor(props) {
        super(props);
        this.layoutManager = new LayoutManager(new DefaultURLEncoder(), BASE_URL);
        this.capabilityLoader = loadCapabilityMatrix;
        this.configLoader = loadAsyncConfig;
        this.appAccessOption = {
            accessKey: 'app.pcd.access',
        };
    }

    getInstalledModule() {
        return InstalledModule;
    }

    setupModuleDone() {
        const entityModule = new Module();
        EntityModule.setup(entityModule, this.moduleRegistry.entities());
        this.moduleRegistry.register(ENTITY_KEY, entityModule);
        this.layoutManager.setComponentGetter((module: string, key: string) => {
            return this.moduleRegistry.getPanel(module, key);
        });
    }

    isProductionEnvironment() {
        return import.meta.env.PROD;
    }
    setupHotReload() {
        if (import.meta.hot) {
            import.meta.hot.on('vite:afterUpdate', payload => {
                // const { updates } = payload;

                // if (updates.every(entry => entry.type === 'js-update' && !entry.path.endsWith('.scss'))) {
                this.queueForRouteReset();
                // }
            });
        };
    }

    renderApp() {
        return (
            <AppBoundary>
                <Provider store={this.store}>
                    <ConnectedRouter history={this.history}>
                        <AppWrapper
                            layoutManager={this.layoutManager}
                            navbar={AppNavBar}
                            allRoutes={this.moduleRegistry.routes()}
                        >
                            <Switch>
                                <Route path="/" exact render={() => <Redirect to={`/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.welcome}`} />} />
                                {this.renderRoute()}
                                <Route component={PageError404} />
                            </Switch>
                        </AppWrapper>
                    </ConnectedRouter>
                </Provider>
            </AppBoundary>
        );
    }
}
