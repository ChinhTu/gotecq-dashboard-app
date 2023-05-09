import React from 'react';
import { ComposeHeader } from '@gotecq/s8-component';
import { Radio, Space } from 'antd';

type Props = {
    dashboardCode: string;
    handleChangeViewLevel: (level: 'org' | 'network') => void;
    viewLevel: 'org' | 'network';
};

export const CustomStarFilterElement: React.FC<Props> = ({dashboardCode, handleChangeViewLevel, viewLevel}) => {
    if (dashboardCode === 'star-dashboard') {
        return (
            <div className='filter-wrapper'>
                <ComposeHeader type='transparent' title='Level' className='menu-header' />
                <Radio.Group onChange={(e) => handleChangeViewLevel(e.target.value)} value={viewLevel ?? 'network'}>
                    <Space direction="vertical" >
                        <Radio value='network'>Network</Radio>
                        <Radio value='org'>Organization</Radio>
                    </Space>
                </Radio.Group>
            </div>
        );
    }

    return null;
};
