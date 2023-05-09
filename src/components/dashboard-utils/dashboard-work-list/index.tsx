import './index.scss';
import React, { useState } from 'react';
import { Loading, NonDataPanel } from '@gotecq/s8-component';
import { DashboardWorkItem } from '@/components';
import { QueryAPI, Requestor } from '@/access';
import { DashboardWorkItemEntity } from '@/entity';
import { useSelector } from 'react-redux';
import { DashboardQuickAddWorkItem } from './quick-add-work-item';
import { Dashboard, DashboardItem, DashboardWorkItemModel } from '@gotecq/model';

type DashboardWorkList = {
    dashboardCode: string;
    apiDashboard: Dashboard;
    localDashboard: DashboardItem;
    defaultDashboardParam: any;
};
export const DashboardWorkList: React.ComponentType<DashboardWorkList> = ({ dashboardCode, apiDashboard, localDashboard, defaultDashboardParam }) => {
    const [isLoading, setLoading] = useState(false);

    const fetchWorkItemList = async (dashboard_id: string) => {
        try {
            setLoading(true);
            const data = await Requestor.request.GET(QueryAPI.dashboard.work.all(dashboard_id));
            if (Array.isArray(data)) {
                DashboardWorkItemEntity.replaceCollection(data);    // replace to make sure no archived item left after archiving at "Work Items" page
            }
        } catch (error) { } finally {
            setLoading(false);
        }
    };

    const { dashboard_work_item: reduxWorkItemList = {} } = useSelector<any, { dashboard_work_item: Record<string, DashboardWorkItemModel> }>((state: any) => state['@ENTITY']);
    const dashboardWorkItemList = React.useMemo(() => {
        // filter => only get work-item of this dashboard
        return Object.entries(reduxWorkItemList)
            .filter(([key, item]) => item.dashboard_id === apiDashboard._id && !item.archived)
            .map(([key, item]) => item);
    }, [reduxWorkItemList, apiDashboard]);

    React.useEffect(() => {
        fetchWorkItemList(apiDashboard._id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dashboardCode, apiDashboard._id]);

    return (
        <div className="dashboard-work-list">
            {isLoading && <Loading.FullView />}

            <div className="work-item-quick-add-wrapper">
                <DashboardQuickAddWorkItem
                    apiDashboard={apiDashboard}
                    localDashboard={localDashboard}
                    defaultDashboardParam={defaultDashboardParam}
                    onCreatedSuccess={() => fetchWorkItemList(apiDashboard._id)}
                />
            </div>

            <div className="work-list-wrapper">
                {dashboardWorkItemList.length > 0
                    ? dashboardWorkItemList.map(workItem => {
                        return (
                            <DashboardWorkItem
                                key={workItem._id}
                                workItemData={workItem}
                                onUpdateSuccess={() => fetchWorkItemList(apiDashboard._id)}
                                wrapperClassName="work-list-item"
                            />
                        );
                    })
                    : <NonDataPanel />
                }
            </div>
        </div>
    );
};
