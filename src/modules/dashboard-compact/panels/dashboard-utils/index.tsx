import './index.scss';
import React, { useState } from 'react';
import { LayoutPanelComponent } from '@gotecq/layout';
import { PanelParams } from '@/constant';
import { DashboardUtils } from '@/components';
import { CANCEL_HIGHLIGHT_CELL, RealTimeAccess } from '@gotecq/component.complex-component/domain-dashboard/qlm/activity-summary-dashboard/access';

export const DashboardUtilsCompactPanel: React.FC<LayoutPanelComponent> = ({ layoutService }) => {
    const paramsQ = layoutService.getParam('primary');
    const [lastClickTab, setLastClickTab] = useState<string>('provider');
    const {
        [PanelParams.common.dashboardUtils.dashboardCode]: dashboardCode,
        [PanelParams.common.dashboardUtils.filter]: filter,
        [PanelParams.common.dashboardUtils.currentFilterId]: currentFilterId,
        [PanelParams.common.dashboardUtils.activeMenu]: activeMenu,
        [PanelParams.common.dashboardUtils.showUtils]: showUtils,
        [PanelParams.common.detailDashboard.defaultDashboardParam]: defaultDashboardParam,
    } = paramsQ;

    // const [isUtilsCollapsed, setUtilsCollapsed] = React.useState<boolean>(false);

    const _handleClearFilter = () => {
        layoutService
            .removeParam('primary', [
                PanelParams.common.dashboardUtils.filter,
                PanelParams.common.dashboardUtils.currentFilterId,
            ])
            .go();
    };

    const _handleFilterValueChange = (payload: any, payloadTree: any) => {
        layoutService.addParam('primary', {
            [PanelParams.common.dashboardUtils.filter]: payloadTree,
        }).go();
    };

    function _handleSavedFilterChange(savedId: string) {
        if (savedId) {
            layoutService.addParam('primary', {
                [PanelParams.common.dashboardUtils.currentFilterId]: savedId,
            }).go();
        }
    };

    function changeActiveMenu(menuKey: string) {
        layoutService.addParam('primary', {
            [PanelParams.common.dashboardUtils.activeMenu]: menuKey,
        }).go();
    };

    const clickTab = (menuKey: string) => {
        setLastClickTab(menuKey);
        layoutService
            .removeParam('primary', ['page', 'pageSize', 'currentFilter', 'filter', 'order'])
            .addParam('primary', {
                subPanel: menuKey,
            }).go();
        menuKey !== lastClickTab && RealTimeAccess.publish(CANCEL_HIGHLIGHT_CELL, {});
    };

    const handleChangeViewLevel = (level: 'org' | 'network') => {
        layoutService.addParam('primary', {
            viewLevel: level,
        }).go();
    };

    return (
        <div className="compact-dashboard-utils">
            <DashboardUtils
                activeMenu={activeMenu}
                showUtils={showUtils}
                onChangeActiveMenu={changeActiveMenu}
                // className={isUtilsCollapsed ? 'hidden-utils' : undefined}
                filterProps={{
                    value: filter,
                    dashboardCode: dashboardCode,
                    currentSavedItemID: currentFilterId,
                    defaultDashboardParam: defaultDashboardParam,
                    viewLevel: paramsQ.viewLevel,
                    onClear: _handleClearFilter,
                    onFilterValueChange: _handleFilterValueChange,
                    onSavedFilterChange: _handleSavedFilterChange,
                    clickTab: clickTab,
                    handleChangeViewLevel: handleChangeViewLevel,
                }}
            />
            {/* <div className={`toggle-collapse-btn ${isUtilsCollapsed ? 'collapsed' : 'expanded'}`} onClick={() => setUtilsCollapsed(prevValue => !prevValue)}>
                {isUtilsCollapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
            </div> */}
        </div>
    );
};
