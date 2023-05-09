// import React from 'react';
// import { LayoutPanelComponent } from '@gotecq/layout';
// import { PanelParams } from '@/constant';
// import { DashboardUtils } from '@/components';

// export const QualityDashboardUtilsPanel: React.FC<LayoutPanelComponent> = ({ layoutService }) => {
//     const paramsQ = layoutService.getParam('primary');
//     const {
//         [PanelParams.common.dashboardUtils.dashboardCode]: dashboardCode,
//         [PanelParams.common.dashboardUtils.filter]: filter,
//         [PanelParams.common.dashboardUtils.currentFilterId]: currentFilterId,
//         [PanelParams.common.dashboardUtils.activeMenu]: activeMenu,
//         [PanelParams.common.dashboardUtils.showUtils]: showUtils,
//         [PanelParams.common.detailDashboard.defaultDashboardParam]: defaultDashboardParam,
//     } = paramsQ;

//     const _handleClearFilter = () => {
//         layoutService
//             .removeParam('primary', [
//                 PanelParams.common.dashboardUtils.filter,
//                 PanelParams.common.dashboardUtils.currentFilterId,
//             ])
//             .go();
//     };

//     const _handleFilterValueChange = (payload: any, payloadTree: any) => {
//         layoutService.addParam('primary', {
//             [PanelParams.common.dashboardUtils.filter]: payloadTree,
//         }).go();
//     };

//     function _handleSavedFilterChange(savedId: string) {
//         if (savedId) {
//             layoutService.addParam('primary', {
//                 [PanelParams.common.dashboardUtils.currentFilterId]: savedId,
//             }).go();
//         }
//     };

//     function changeActiveMenu(menuKey: string) {
//         layoutService.addParam('primary', {
//             [PanelParams.common.dashboardUtils.activeMenu]: menuKey,
//         }).go();
//     };

//     return (
//         <DashboardUtils
//             activeMenu={activeMenu}
//             showUtils={showUtils}
//             onChangeActiveMenu={changeActiveMenu}
//             filterProps={{
//                 value: filter,
//                 dashboardCode: dashboardCode,
//                 currentSavedItemID: currentFilterId,
//                 defaultDashboardParam: defaultDashboardParam,
//                 onClear: _handleClearFilter,
//                 onFilterValueChange: _handleFilterValueChange,
//                 onSavedFilterChange: _handleSavedFilterChange,
//             }}
//         />
//     );
// };
