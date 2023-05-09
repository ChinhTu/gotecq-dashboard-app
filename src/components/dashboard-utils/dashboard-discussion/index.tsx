import './index.scss';
import React from 'react';
import { CommentWidget } from '@gotecq/component.resource-extension';
import { useRequest } from '@gotecq/access';
import { QueryAPI } from '@/access';
import { NonDataPanel } from '@gotecq/s8-component';
import { useSelector } from 'react-redux';
import { Dashboard } from '@gotecq/model';

type DashboardDiscussion = {
    dashboardCode: string;
};
export const DashboardDiscussion: React.ComponentType<DashboardDiscussion> = ({ dashboardCode }) => {
    const [{ data: [apiDashboard] = [] }] = useRequest<Dashboard[]>(dashboardCode ? QueryAPI.dashboard.singleByCode(dashboardCode) : undefined);
    const userInfo = useSelector((state: any) => state.auth.userInfo);

    if (!apiDashboard) {
        return (
            <div>
                <NonDataPanel />
            </div>
        );
    }

    return (
        <div className="dashboard-discussion">
            <CommentWidget
                resourceName="dashboard"
                resourceId={apiDashboard._id}
                loggedAs={userInfo}
                canAddComment={true}
            />
        </div>
    );
};
