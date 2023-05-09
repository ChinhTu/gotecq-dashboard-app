// import React from 'react';
// import { LayoutPanelComponent } from '@gotecq/layout';
// import { FavoriteDashboard } from '@/components';
// import { PanelParams } from '@/constant';
// import { redirectDashboard } from '@/utils';

// export const QualityFavoriteDashboardPanel: React.FC<LayoutPanelComponent> = ({ layoutService }) => {
//     const currentModule = layoutService.getLayout();
//     const paramsQ = layoutService.getParam('primary');
//     const {
//         [PanelParams.common.favoriteDashboard.searchText]: searchText = '',
//     } = paramsQ;

//     function handleSearch(searchText: string) {
//         layoutService
//             .addParam('primary', { [PanelParams.common.favoriteDashboard.searchText]: searchText })
//             .go();
//     }

//     return (
//         <FavoriteDashboard
//             aspectKey={currentModule}
//             searchText={searchText}
//             onSearch={handleSearch}
//             onClickDashboard={(aspectKey, group, localDashboard) => redirectDashboard(aspectKey, group, localDashboard, layoutService)}
//         />
//     );
// };
