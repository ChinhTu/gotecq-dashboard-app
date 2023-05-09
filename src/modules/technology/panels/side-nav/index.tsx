import React, { useEffect } from 'react';
import { LayoutPanelComponent } from '@gotecq/layout';
import { getSummaryDashboard, ModulePanels, PanelParams } from '@/constant';
import { SideNav } from '@/components';
import { TechnologySideNavMode } from '@/utils';
import { DashboardUtilsMenu } from '@/components/dashboard-utils';
import { DashboardOption } from '@gotecq/component.complex-component';

export const TechnologySideNavPanel: React.FC<LayoutPanelComponent> = ({ layoutService }) => {
    useEffect(() => {
        const currentParamsQE = layoutService.getParam('extension');
        const currentParamsQ = layoutService.getParam('primary');
        if (!currentParamsQE[PanelParams.common.sideNav.menuMode] && !currentParamsQE[PanelParams.common.sideNav.subMenuMode]) {
            layoutService.setExtension(ModulePanels.common.sideNav, {
                [PanelParams.common.sideNav.menuMode]: 'summary',
                [PanelParams.common.sideNav.subMenuMode]: currentParamsQ.dashboard_code,
            }).go();
        };
    }, []);
    const currentModule = layoutService.getLayout();
    const paramsQE = layoutService.getParam('extension');
    const {
        [PanelParams.common.sideNav.menuMode]: menuMode,
        [PanelParams.common.sideNav.subMenuMode]: subMenuMode,
        [PanelParams.common.sideNav.workItemFilter]: workItemFilterValue,
        [PanelParams.common.sideNav.currentWorkItemFilterId]: currentWorkItemFilterId,
    } = paramsQE;
    const localDashboard = getSummaryDashboard(currentModule);


    const _handleClickMenuItem = (key: string) => {
        const routing = layoutService
            .setExtension(ModulePanels.common.sideNav, {
                [PanelParams.common.sideNav.menuMode]: key,
                [PanelParams.common.sideNav.subMenuMode]: '',
            });

        if (key === TechnologySideNavMode.SUMMARY) {
            routing
                .setPrimary(ModulePanels.common.detailDashboard, {
                    [PanelParams.common.detailDashboard.dashboardCode]: localDashboard?.code,
                    [PanelParams.common.dashboardUtils.activeMenu]: DashboardUtilsMenu.DISCUSSION,
                })
                .setSecondary(ModulePanels.common.dashboardUtils, {});
        }

        if (key === TechnologySideNavMode.FAVORITE) {
            routing
                .setPrimary(ModulePanels.common.favoriteDashboard, {})
                .setSecondary('-', {});
        }

        if (key === TechnologySideNavMode.WORK_ITEM) {
            routing
                .setPrimary(ModulePanels.common.workItemOverview, {})
                .setSecondary('-', {});
        }

        if (key === TechnologySideNavMode.HELP) {
            routing
                .setPrimary(ModulePanels.common.help, {})
                .setSecondary('-', {});
        }

        routing.go();
    };

    const _handleSelectSearchItem = (selectedDashboard: DashboardOption) => {
        const { getDefaultFilter } = selectedDashboard;
        const filterValue = getDefaultFilter?.();

        if (selectedDashboard.aspect_key === currentModule) {
            layoutService
                .addParam('extension', {
                    [PanelParams.common.sideNav.menuMode]: TechnologySideNavMode.SUMMARY,
                    [PanelParams.common.sideNav.subMenuMode]: selectedDashboard.code,
                })
                .setPrimary(ModulePanels.common.detailDashboard, {
                    [PanelParams.common.detailDashboard.dashboardCode]: selectedDashboard.code,
                    [PanelParams.common.dashboardUtils.filter]: filterValue
                        ? JSON.parse(filterValue)
                        : [],
                })
                // For simple params using
                // FOR NOW:
                // get { filter, dashboard_code } from primary
                // no params using from secondary
                .setSecondary(ModulePanels.common.dashboardUtils, {
                    // [PanelParams.common.dashboardUtils.dashboardCode]: selectedDashboard.code,
                })
                .go();
        } else {
            layoutService
                .setLayout(selectedDashboard.aspect_key)
                .setExtension(ModulePanels.common.sideNav, {
                    [PanelParams.common.sideNav.menuMode]: TechnologySideNavMode.SUMMARY,
                    [PanelParams.common.sideNav.subMenuMode]: selectedDashboard.code,
                })
                .setPrimary(ModulePanels.common.detailDashboard, {
                    [PanelParams.common.detailDashboard.dashboardCode]: selectedDashboard.code,
                    [PanelParams.common.dashboardUtils.filter]: getDefaultFilter?.() ?? [],
                })
                .setSecondary(ModulePanels.common.dashboardUtils, {
                    // [PanelParams.common.dashboardUtils.dashboardCode]: selectedDashboard.code,
                })
                .go();
        }
    };

    const handleClearWorkItemFilter = () => {
        layoutService
            .removeParam('extension', [PanelParams.common.sideNav.workItemFilter, PanelParams.common.sideNav.currentWorkItemFilterId])
            .go();
    };

    const handleSavedWorkItemFilterChange = (savedId: string) => {
        layoutService
            .addParam('extension', {
                [PanelParams.common.sideNav.currentWorkItemFilterId]: savedId,
            })
            .go();
    };

    const handleWorkItemFilterValueChange = (payload: any, payloadTree: any) => {
        layoutService
            .addParam('extension', {
                [PanelParams.common.sideNav.workItemFilter]: payloadTree,
            })
            .go();
    };

    return (
        <SideNav
            workItemFilterValue={workItemFilterValue}
            currentWorkItemFilterId={currentWorkItemFilterId}
            menuMode={menuMode}
            subMenuMode={subMenuMode}
            currentModule={currentModule}
            onClickMenuItem={_handleClickMenuItem}
            onSelectSearchItem={_handleSelectSearchItem}

            onClearWorkItemFilter={handleClearWorkItemFilter}
            onSavedWorkItemFilterChange={handleSavedWorkItemFilterChange}
            onWorkItemFilterValueChange={handleWorkItemFilterValueChange}
        />
    );
};
