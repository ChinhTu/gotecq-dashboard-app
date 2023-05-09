import './index.scss';
import React, { useState } from 'react';
import { Dashboard, DashboardItem, DashboardWorkItemModel, WorkItem } from '@gotecq/model';
import { DashboardBucketHeader } from './header';
import { Loading, NonDataPanel } from '@gotecq/s8-component';
import { DashboardWorkItem } from '@/components';
import { actionSuccessReporter } from '@gotecq/access';
import { CommandAPI, QueryAPI, Requestor } from '@/access';

type DashboardBucket = {
    localDashboard: DashboardItem;
    apiDashboard: Dashboard;
    workItemList: DashboardWorkItemModel[];
    onUpdateSuccess?: () => void;
    onClickDashboardTitle?: () => void;
};
export const DashboardBucket: React.ComponentType<DashboardBucket> = ({
    localDashboard, apiDashboard,
    workItemList,
    onUpdateSuccess = () => { },
    onClickDashboardTitle,
}) => {
    const [isSubmitting, setSubmitting] = useState(false);

    const archiveCompletedWorkItems = async () => {
        try {
            setSubmitting(true);
            const completedWorkItemList = await Requestor.request.get<WorkItem[]>(QueryAPI.dashboard.work.allCompleted(apiDashboard._id));
            if (!Array.isArray(completedWorkItemList) || completedWorkItemList.length === 0) {
                actionSuccessReporter({
                    type: 'info',
                    message: 'No Completed Work Item',
                });
                return;
            }

            await Promise.allSettled(completedWorkItemList.map(workItem => Requestor.request.post(CommandAPI.work.archive(workItem._id))));
            actionSuccessReporter({
                action: 'Archived',
                target: 'Work Items',
            });
            onUpdateSuccess();
        } catch (error) { } finally {
            setSubmitting(false);
        }
    };

    if (workItemList.length < 1) {
        return null;
    }

    return (
        <div className="dashboard-bucket">
            <DashboardBucketHeader
                localDashboard={localDashboard}
                onClickDashboardTitle={onClickDashboardTitle}
                onClickArchiveWorkItem={() => archiveCompletedWorkItems()}
            />

            <div className="dashboard-bucket-content">
                {(isSubmitting) && <Loading.FullView />}

                {workItemList.length > 0
                    ? workItemList.map(workItem => {
                        return (
                            <DashboardWorkItem
                                key={workItem._id}
                                workItemData={workItem}
                                onUpdateSuccess={() => onUpdateSuccess()}
                            />
                        );
                    })
                    : <NonDataPanel />
                }
            </div>
        </div>
    );
};
