// import React from 'react';
// import { LayoutPanelComponent } from '@gotecq/layout';
// import { getSummaryDashboard, ModulePanels, PanelParams } from '@/constant';
// import { DashboardOption } from '@/model';
// import { SideNav } from '@/components';
// import { QualitySideNavMode } from '@/utils';
// import { DashboardUtilsMenu } from '@/components/dashboard-utils';

// export const QualitySideNavPanel: React.FC<LayoutPanelComponent> = ({ layoutService }) => {
//     const currentModule = layoutService.getLayout();
//     const paramsQE = layoutService.getParam('extension');
//     const {
//         [PanelParams.common.sideNav.menuMode]: menuMode,
//         [PanelParams.common.sideNav.workItemFilter]: workItemFilterValue,
//         [PanelParams.common.sideNav.currentWorkItemFilterId]: currentWorkItemFilterId,
//     } = paramsQE;
//     const localDashboard = getSummaryDashboard(currentModule);

//     const _handleClickMenuItem = (key: string) => {
//         const routing = layoutService
//             .addParam('extension', { [PanelParams.common.sideNav.menuMode]: key });

//         if (key === QualitySideNavMode.SUMMARY) {
//             routing
//                 .setPrimary(ModulePanels.common.detailDashboard, {
//                     [PanelParams.common.detailDashboard.dashboardCode]: localDashboard?.code,
//                     [PanelParams.common.dashboardUtils.activeMenu]: DashboardUtilsMenu.DISCUSSION,
//                 })
//                 .setSecondary(ModulePanels.common.dashboardUtils, {});
//         }

//         if (key === QualitySideNavMode.FAVORITE) {
//             routing
//                 .setPrimary(ModulePanels.common.favoriteDashboard, {})
//                 .setSecondary('-', {});
//         }

//         if (key === QualitySideNavMode.WORK_ITEM) {
//             routing
//                 .setPrimary(ModulePanels.common.workItemOverview, {})
//                 .setSecondary('-', {});
//         }

//         if (key === QualitySideNavMode.HELP) {
//             routing
//                 .setPrimary(ModulePanels.common.help, {})
//                 .setSecondary('-', {});
//         }

//         routing.go();
//     };

//     const _handleSelectSearchItem = (selectedDashboard: DashboardOption) => {
//         if (selectedDashboard.aspect_key === currentModule) {
//             layoutService
//                 .addParam('extension', { [PanelParams.common.sideNav.menuMode]: selectedDashboard.code })
//                 .setPrimary(ModulePanels.common.detailDashboard, {
//                     [PanelParams.common.detailDashboard.dashboardCode]: selectedDashboard.code,
//                 })
//                 // For simple params using
//                 // FOR NOW:
//                 // get { filter, dashboard_code } from primary
//                 // no params using from secondary
//                 .setSecondary(ModulePanels.common.dashboardUtils, {
//                     // [PanelParams.common.dashboardUtils.dashboardCode]: selectedDashboard.code,
//                 })
//                 .go();
//         } else {
//             layoutService
//                 .setLayout(selectedDashboard.aspect_key)
//                 .setExtension(ModulePanels.common.sideNav, {
//                     [PanelParams.common.sideNav.menuMode]: selectedDashboard.code,
//                 })
//                 .setPrimary(ModulePanels.common.detailDashboard, {
//                     [PanelParams.common.detailDashboard.dashboardCode]: selectedDashboard.code,
//                 })
//                 .setSecondary(ModulePanels.common.dashboardUtils, {
//                     // [PanelParams.common.dashboardUtils.dashboardCode]: selectedDashboard.code,
//                 })
//                 .go();
//         }
//     };

//     const handleClearWorkItemFilter = () => {
//         layoutService
//             .removeParam('extension', [PanelParams.common.sideNav.workItemFilter, PanelParams.common.sideNav.currentWorkItemFilterId])
//             .go();
//     };

//     const handleSavedWorkItemFilterChange = (savedId: string) => {
//         layoutService
//             .addParam('extension', {
//                 [PanelParams.common.sideNav.currentWorkItemFilterId]: savedId,
//             })
//             .go();
//     };

//     const handleWorkItemFilterValueChange = (payload: any, payloadTree: any) => {
//         layoutService
//             .addParam('extension', {
//                 [PanelParams.common.sideNav.workItemFilter]: payloadTree,
//             })
//             .go();
//     };

//     return (
//         <SideNav
//             workItemFilterValue={workItemFilterValue}
//             currentWorkItemFilterId={currentWorkItemFilterId}
//             menuMode={menuMode}
//             currentModule={currentModule}
//             onClickMenuItem={_handleClickMenuItem}
//             onSelectSearchItem={_handleSelectSearchItem}

//             onClearWorkItemFilter={handleClearWorkItemFilter}
//             onSavedWorkItemFilterChange={handleSavedWorkItemFilterChange}
//             onWorkItemFilterValueChange={handleWorkItemFilterValueChange}
//         />
//     );
// };
