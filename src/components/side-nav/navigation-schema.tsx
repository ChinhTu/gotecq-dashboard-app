import React from 'react';
import { AppModules } from '@/constant';
import { QualityIcon, TechnologyIcon, WorkItemIcon } from '@/assets';
import { QuestionCircleOutlined, StarFilled, RiseOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { TechnologySideNavMode, ExperienceSideNavMode, CostSideNavMode, QualitySideNavMode } from '@/utils';

export const SideNavSchemas: Record<string, Record<string, { label: any, data: any }>> = {
    [AppModules.DASHBOARDS]: {
        [TechnologySideNavMode.SUMMARY]: {
            label: <TechnologyIcon />,
            data: 'Dashboards',
        },
        [TechnologySideNavMode.FAVORITE]: {
            label: <StarFilled />,
            data: 'Favorites',
        },
        [TechnologySideNavMode.WORK_ITEM]: {
            label: <WorkItemIcon />,
            data: 'Work Items',
        },
        // [TechnologySideNavMode.HELP]: {
        //     label: <QuestionCircleOutlined />,
        //     data: 'Help & Support',
        // },
    },
    [AppModules.EXPERIENCE]: {
        [ExperienceSideNavMode.SUMMARY]: {
            label: <RiseOutlined />,
            data: 'Experience Summary',
        },
        [ExperienceSideNavMode.FAVORITE]: {
            label: <StarFilled />,
            data: 'Favorites',
        },
        [ExperienceSideNavMode.WORK_ITEM]: {
            label: <WorkItemIcon />,
            data: 'Work Items',
        },
        // [ExperienceSideNavMode.HELP]: {
        //     label: <QuestionCircleOutlined />,
        //     data: 'Help & Support',
        // },
    },
    [AppModules.COST]: {
        [CostSideNavMode.SUMMARY]: {
            label: <DollarCircleOutlined />,
            data: 'Cost Summary',
        },
        [CostSideNavMode.FAVORITE]: {
            label: <StarFilled />,
            data: 'Favorites',
        },
        [CostSideNavMode.WORK_ITEM]: {
            label: <WorkItemIcon />,
            data: 'Work Items',
        },
        // [CostSideNavMode.HELP]: {
        //     label: <QuestionCircleOutlined />,
        //     data: 'Help & Support',
        // },
    },
    [AppModules.QUALITY]: {
        [QualitySideNavMode.SUMMARY]: {
            label: <QualityIcon />,
            data: 'Quality Summary',
        },
        [QualitySideNavMode.FAVORITE]: {
            label: <StarFilled />,
            data: 'Favorites',
        },
        [QualitySideNavMode.WORK_ITEM]: {
            label: <WorkItemIcon />,
            data: 'Work Items',
        },
        // [QualitySideNavMode.HELP]: {
        //     label: <QuestionCircleOutlined />,
        //     data: 'Help & Support',
        // },
    },
};