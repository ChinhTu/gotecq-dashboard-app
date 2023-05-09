// import React from 'react';
// import { PanelParams } from '@/constant';
// import { DashboardHelp } from '@/components';
// import { LayoutPanelComponent } from '@gotecq/layout';

// export const QualityHelpPanel: React.FC<LayoutPanelComponent> = ({ layoutService }) => {
//     const paramsQ = layoutService.getParam('primary');
//     const {
//         [PanelParams.common.help.searchText]: searchText = '',
//     } = paramsQ;

//     function handleSearch(searchText: string) {
//         layoutService
//             .addParam('primary', { [PanelParams.common.help.searchText]: searchText })
//             .go();
//     }

//     return (
//         <DashboardHelp
//             searchText={searchText}
//             onSearch={handleSearch}
//         // onClickDashboard={(aspectKey, group, localDashboard) => redirectDashboard(aspectKey, group, localDashboard, layoutService)}
//         />
//     );
// };
