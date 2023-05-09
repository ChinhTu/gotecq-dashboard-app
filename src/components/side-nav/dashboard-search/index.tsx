import './index.scss';
import React, { useState } from 'react';
import { Input } from 'antd';
import { searchDashboard } from '@/constant';
import { DashboardOption } from '@gotecq/model';

const { Search } = Input;


type Props = {
    currentModule: any;
    onSelectSearchItem?: (selectedDashboard: DashboardOption) => void;
    getFilterDashboardList: (list: DashboardOption[]) => void;
};
export const DashboardSearch: React.FC<Props> = ({ onSelectSearchItem, currentModule, getFilterDashboardList }) => {

    const _handleSelectItem = (dashboard_code: any) => {
        const result = searchDashboard(dashboard_code, '');
        getFilterDashboardList(result);



    };

    return (
        <div className="side-nav__dashboard-search">
            <Search
                allowClear
                placeholder='Search Dashboards'
                onSearch={_handleSelectItem}
            />
        </div>
    );
};
