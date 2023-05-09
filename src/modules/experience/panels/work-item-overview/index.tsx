import React from 'react';
import { LayoutPanelComponent } from '@gotecq/layout';
import { WorkItemOverview } from '@/components';
import { PanelParams } from '@/constant';
import { redirectDashboard } from '@/utils';

export const ExperienceWorkItemOverviewPanel: React.FC<LayoutPanelComponent> = ({ layoutService }) => {
    const paramsQ = layoutService.getParam('primary');
    const paramsQE = layoutService.getParam('extension');
    const {
        [PanelParams.common.workItemOverview.searchText]: searchText = '',
    } = paramsQ;
    const {
        [PanelParams.common.sideNav.workItemFilter]: workItemFilterValue,
        [PanelParams.common.sideNav.currentWorkItemFilterId]: currentWorkItemFilterId,
    } = paramsQE;

    function handleSearch(searchText: string) {
        layoutService
            .addParam('primary', { [PanelParams.common.workItemOverview.searchText]: searchText })
            .go();
    }

    return (
        <WorkItemOverview
            filterValue={workItemFilterValue}
            currentFilterId={currentWorkItemFilterId}
            searchText={searchText}
            onSearch={handleSearch}
            onClickDashboard={(aspectKey, group, localDashboard) => redirectDashboard(aspectKey, group, localDashboard, layoutService, { source: 'work-item' })}
        />
    );
};
