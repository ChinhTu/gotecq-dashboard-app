import './index.scss';
import React from 'react';
import { MainLayout } from '@gotecq/layout';
import { AppLoadingBar } from '@/utils/loading-bar';
import { AppModules } from '@/constant';

export class BoilerplateMainLayout extends MainLayout {
    module = AppModules.BOILERPLATE;

    panelParam = {
        primary: {},
        secondary: {},
        extension: {},
    }

    state = {
        loading: false,
    }

    setLoadingState = (status: boolean) => this.setState({ loading: status });

    render() {
        const { loading } = this.state;
        return (
            <>
                <div className="boilerplate-main-layout">
                    {this.extensionPanel()}
                    {this.primaryPanel()}
                    {this.secondaryPanel()}
                </div>
                {loading && <AppLoadingBar loading={loading} />}
            </>
        );
    }
}
