import React from 'react';
import { AppModules, ModulePanels } from './module';
import { QualityIcon, TechnologyIcon } from '@/assets';
import { RiseOutlined, DollarCircleOutlined } from '@ant-design/icons';

export const drawerMenu = [
    {
        key: AppModules.DASHBOARDS,
        title: 'Dashboards',
        link: `/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.welcome}`,
        icon: () => <TechnologyIcon />,
    },
    // {
    //     key: AppModules.EXPERIENCE,
    //     title: 'Experience',
    //     link: `/${AppModules.EXPERIENCE}/${ModulePanels.experience.welcome}`,
    //     icon: () => <RiseOutlined />,
    // },
    // {
    //     key: AppModules.DASHBOARDS,
    //     title: 'Dashboards',
    //     link: `/${AppModules.DASHBOARDS}/${ModulePanels.dashboards.welcome}`,
    //     icon: () => <RiseOutlined />,
    // },
    // {
    //     key: AppModules.COST,
    //     title: 'Cost',
    //     link: `/${AppModules.COST}/${ModulePanels.cost.welcome}`,
    //     icon: () => <DollarCircleOutlined />,
    // },
    // {
    //     key: AppModules.QUALITY,
    //     title: 'Quality',
    //     link: `/${AppModules.QUALITY}/${ModulePanels.quality.welcome}`,
    //     icon: () => <QualityIcon />,
    // },
];