import React from 'react';
import { LayoutPanelComponent } from '@gotecq/layout';
import { AppModules, ModulePanels, PanelParams } from '@/constant';
import { DetailDashboard } from '@/components';

export const TechnologyDetailDashboardPanel: React.FC<LayoutPanelComponent> = ({ layoutService }) => {
    const paramsQ = layoutService.getParam('primary');
    const paramsQE = layoutService.getParam('extension');
    const {
        [PanelParams.common.dashboardUtils.dashboardCode]: dashboardCode,
        [PanelParams.common.dashboardUtils.filter]: filter,
        [PanelParams.common.dashboardUtils.showUtils]: showUtils,
        [PanelParams.common.detailDashboard.defaultDashboardParam]: defaultDashboardParam,
    } = paramsQ;

    const _handleNavigateDashboard = (dashboard_code: string) => {
        layoutService
            .setExtension(ModulePanels.common.sideNav, {
                [PanelParams.common.sideNav.menuMode]: paramsQE.menu_mode,
                [PanelParams.common.sideNav.subMenuMode]: dashboard_code,
            })
            .setPrimary(ModulePanels.common.detailDashboard, {
                [PanelParams.common.detailDashboard.dashboardCode]: dashboard_code,
            })
            // For simple params using
            // FOR NOW:
            // get { filter, dashboard_code } from primary
            // no params using from secondary
            .setSecondary(ModulePanels.common.dashboardUtils, {
                // [PanelParams.common.dashboardUtils.dashboardCode]: selectedDashboard.code,
            })
            .go();
    };

    const _handleToggleFullscreen = () => {
        const paramsQ = layoutService.getParam('primary');
        const paramsQS = layoutService.getParam('secondary');
        const paramsQE = layoutService.getParam('extension');
        layoutService
            .setLayout(AppModules.DASHBOARD_COMPACT)
            .setPrimary(ModulePanels.common.detailDashboard, {
                ...paramsQ,
            })
            .setSecondary(ModulePanels.common.dashboardUtils, {
                ...paramsQS,
            })
            .setExtension(ModulePanels.common.sideNav, {
                [PanelParams.common.sideNav.menuMode]: paramsQE.menu_mode,
                [PanelParams.common.sideNav.subMenuMode]: paramsQ.dashboard_code,
            })
            .go();
    };

    const toggleDisplayDashboardUtils = () => {
        const {
            [PanelParams.common.dashboardUtils.showUtils]: isShowDashboardUtils,
        } = layoutService.getParam('primary');
        layoutService
            .addParam('primary', { [PanelParams.common.dashboardUtils.showUtils]: isShowDashboardUtils ? false : true })
            .go();
    };

    return (
        <DetailDashboard
            filter={filter}
            isFullscreen={false}
            showUtils={showUtils}
            dashboardCode={dashboardCode}
            onNavigateDashboard={_handleNavigateDashboard}
            onToggleFullscreen={_handleToggleFullscreen}
            onToggleDisplayDashboardUtils={toggleDisplayDashboardUtils}
            defaultDashboardParam={defaultDashboardParam}
            // TODO: temporarily passing layoutService to satify layoutService using of temp dashboard
            layoutService={layoutService}
        />
    );
};
