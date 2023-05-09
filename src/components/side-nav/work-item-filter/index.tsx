import './index.scss';
import React from 'react';
import { FilterPanel } from '@gotecq/filter';
import { MAIN_API } from '@/constant';
import { useRequest, UserInfo, useUserInfo } from '@gotecq/access';
import { QueryAPI } from '@/access';
import { CollapsiblePanel } from '@gotecq/layout';
import { WorkRouterModel } from '@gotecq/model';

type WorkItemFilter = {
    filterValue: any;
    currentFilterId: any;
    onClear?: () => void;
    onSavedFilterChange?: (savedId: string) => void;
    onFilterValueChange?: (payload: any, payloadTree: any) => void;
};
export const WorkItemFilter: React.ComponentType<WorkItemFilter> = ({ filterValue, currentFilterId, onClear, onSavedFilterChange, onFilterValueChange }) => {
    const userInfo: UserInfo = useUserInfo();
    const [{ data: [pcpDashboardWorkRouter] = [] }] = useRequest<WorkRouterModel[]>(QueryAPI.workRouter.pcpDashboard());
    const { channel_id } = pcpDashboardWorkRouter || {};
    const [{ data }] = useRequest<any[]>(channel_id && userInfo._id ? QueryAPI.dashboard.work.member.all(channel_id, [userInfo._id]) : undefined);
    const memoFilterUrlMeta = `gotecq.work-management/${channel_id}/work-item/~meta`;
    const memoDefaultFields = [
        'owner_id:in',
        'tags:ov',
        'status:in',
        'importance:in',
    ];

    const variableMap = React.useMemo(() => {
        return {
            channel_id: () => channel_id,
        };
    }, [channel_id]);

    if (!channel_id) {
        return null;
    }

    return (
        <div className="work-item-filter">
            {/* <CollapsiblePanel
                panel="extension" 
                tooltipOverlay={isCollapsed => isCollapsed
                    ? 'Expand filter'
                    : 'Collapse filter'} 
                active={filterValue != null && filterValue !== '[]'} 
            > */}
            {data ? (
                <FilterPanel
                    key={`${JSON.stringify(memoDefaultFields)}-work-stream`}
                    urlMap={{
                        'work-management-api': MAIN_API,
                        'tecq-platform-api': MAIN_API,
                    }}
                    variableMap={variableMap}
                    title="Filter"
                    value={filterValue}
                    metaPath={memoFilterUrlMeta}
                    onFilterValueChange={onFilterValueChange}
                    onSavedFilterChange={onSavedFilterChange}
                    onClear={onClear}
                    namespace="work-management"
                    defaultFields={memoDefaultFields}
                    currentSavedItemID={currentFilterId}
                    loggedId={userInfo._id}
                    context="work-filter--pcp-dashboard"
                />
            ) : null}
            {/* </CollapsiblePanel> */}
        </div>
    );
};
