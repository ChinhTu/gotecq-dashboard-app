import { S8MenuItemList } from '@gotecq/s8-component';
import React from 'react';
import { UserOutlined, LineChartOutlined } from '@ant-design/icons';
import { ProviderIcon } from './assets';

type Props = {
    dashboardCode: string;
    subPanel: string | undefined;    
    clickTab: (menuKey: string) => void;
};

export const CustomActivityFilterElement: React.FC<Props> = ({ dashboardCode, subPanel, clickTab }) => {
    if (dashboardCode === 'activity-summary') {
        return (
            <div className="filter-wrapper">
                <S8MenuItemList
                    data={{
                        'provider': 'Provider Activity',
                        'user': 'User Activity',
                        'dashboard': 'Activity Dashboard',
                    }}
                    currentTab={subPanel ?? 'provider'}
                    onMenuItemClick={clickTab}
                    schema={{
                        'provider': { label: <ProviderIcon /> },
                        'user': { label: <UserOutlined /> },
                        'dashboard': { label: <LineChartOutlined /> },
                    }}
                    containerProps={{
                        className: 'activity-summary-menu',
                    }}
                />
            </div>
        );
    }

    return null;
};
