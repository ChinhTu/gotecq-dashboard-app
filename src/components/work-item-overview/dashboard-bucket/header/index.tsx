import './index.scss';
import React from 'react';
import { Space, Tooltip } from 'antd';
import { ComposeHeader } from '@gotecq/s8-component';
import { ArchiveIcon, NavigateIcon } from '@/assets';
import { DashboardItem } from '@gotecq/model';

type DashboardBucketHeader = {
    localDashboard: DashboardItem;
    onClickDashboardTitle?: () => void;
    onClickArchiveWorkItem?: () => void;
};
export const DashboardBucketHeader: React.ComponentType<DashboardBucketHeader> = ({ localDashboard, onClickDashboardTitle, onClickArchiveWorkItem }) => {
    return (
        <ComposeHeader className="dashboard-bucket-header" size="compact" type="transparent">
            <ComposeHeader.HeaderTitle title={localDashboard.name} className="dashboard-name" />

            <ComposeHeader.HeaderItem right>
                <Space>
                    <Tooltip title="Archive Completed Items">
                        <ArchiveIcon className="action-btn" onClick={onClickArchiveWorkItem} />
                    </Tooltip>

                    <Tooltip title="Go to Dashboard">
                        <NavigateIcon className="action-btn" onClick={onClickDashboardTitle} />
                    </Tooltip>
                </Space>
            </ComposeHeader.HeaderItem>
        </ComposeHeader>
    );
};
