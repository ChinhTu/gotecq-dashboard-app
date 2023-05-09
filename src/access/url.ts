import {
    MAX_RESULTS_FROM_API,
    AppModules,
} from '@/constant';
import { WorkItemStatus } from '@/utils';
import { CentralURLBuilder } from '@gotecq/access';
import { REALM_NAME } from '@gotecq/core';

export const Shortlink = {
    dashboard: {
        single: (dashboardCode: string, defaultDashboardParam?: string) => CentralURLBuilder('URL_PCP_DASHBOARD')
            .paths([AppModules.DASHBOARD_REDIRECT, dashboardCode, defaultDashboardParam].filter(path => path))
            .build(),
    },
    workItem: {
        // if this link failed, contact dev of WKM
        single: (channelId: string, workItemId: string) => CentralURLBuilder('URL_WORK_MANAGEMENT')
            .paths(['work-item-redirect', channelId, workItemId])
            .build(),
    },
};

export const QueryAPI = {
    tag: {
        all: () => CentralURLBuilder('API_BASE')
            .paths(['gotecq.work-management', 'tag'])
            .param('where', '[{"kind":"TAG"}]')
            .build(),
        item: (tagId: string) => CentralURLBuilder('API_BASE')
            .path(['tag', tagId])
            .build(),
    },
    user: {
        single: (userId: string) => CentralURLBuilder('API_USER_MANAGEMENT')
            .paths(['user', userId])
            .build(),
    },
    dashboard: {
        all: (searchText: string = '') => {
            const realmName = REALM_NAME();

            return CentralURLBuilder('API_PCP_DASHBOARD')
                .paths(['dashboard', realmName])
                .param('max_results', MAX_RESULTS_FROM_API)
                .param('txt', searchText)
                .build();
        },
        single: (dashboardId: string) => {
            const realmName = REALM_NAME();

            return CentralURLBuilder('API_PCP_DASHBOARD')
                .paths(['dashboard', realmName])
                .path(dashboardId)
                .build();
        },
        singleByCode: (dashboardCode: string) => {
            const realmName = REALM_NAME();

            return CentralURLBuilder('API_PCP_DASHBOARD')
                .paths(['dashboard', realmName])
                .param('where', `[{"code":"${dashboardCode}"}]`)
                .build();
        },
        favorite: {
            single: (dashboardId: string) => CentralURLBuilder('API_FAVORITE')
                .paths(['dashboard', dashboardId, 'favorite'])
                .param('max_results', MAX_RESULTS_FROM_API)
                .build(),
        },
        work: {
            all: (dashboardId: string, searchText: string = '') => CentralURLBuilder('API_WORK_MANAGEMENT')
                .paths(['dashboard', dashboardId, 'work-item'])
                .param('max_results', MAX_RESULTS_FROM_API)
                .param('txt:kw', searchText)
                .param('where', [
                    { 'archived:is': 'false' },
                ])
                .build(),
            allWithFilter: (dashboardId: string, params: { txt?: string, filter?: Record<string, any>[] } = {}) => CentralURLBuilder('API_WORK_MANAGEMENT')
                .paths(['dashboard', dashboardId, 'work-item'])
                .param('max_results', MAX_RESULTS_FROM_API)
                .param('txt:kw', params.txt)
                .param('where', [
                    { 'archived:is': 'false' },
                    ...(Array.isArray(params.filter)
                        ? params.filter
                        : []
                    ),
                ])
                .build(),
            allCompleted: (dashboardId: string) => CentralURLBuilder('API_WORK_MANAGEMENT')
                .paths(['dashboard', dashboardId, 'work-item'])
                .param('max_results', MAX_RESULTS_FROM_API)
                .param('where', `[{"archived:is":"false"},{"status":"${WorkItemStatus.DONE}"}]`)
                .build(),
            single: (dashboardId: string, workItemId: string) => CentralURLBuilder('API_WORK_MANAGEMENT')
                .paths(['dashboard', dashboardId, 'work-item', workItemId])
                .build(),
            member: {
                all: (channelId:string, memberIdList: string[]) => CentralURLBuilder('API_WORK_MANAGEMENT')
                    .paths([channelId, 'member'])
                    .param('max_results', MAX_RESULTS_FROM_API)
                    .param('where', 
                        { '_id:in': memberIdList },
                    )
                    .build(),
            }
        },
    },
    workRouter: {
        pcpDashboard: () => CentralURLBuilder('API_WORK_MANAGEMENT')
            .path('work-router')
            .param('where', '[{"source":"pcp-dashboard"}]')
            .build(),
    },
    downloadFile: (resourceName: string, resourceId: string, fileId: string) => CentralURLBuilder('API_BASE')
        .paths(['file', resourceName, resourceId, fileId, 'download'])
        .build(),
    userSelector: (filterString: string) => CentralURLBuilder('API_BASE')
        .path('user-selector')
        .param('txt', filterString)
        .build(),
};

export const CommandAPI = {
    dashboard: {
        favorite: {
            create: () => CentralURLBuilder('API_FAVORITE')
                .command('create-favorite')
                .path('favorite')
                .build(),
            delete: (favoriteId: string) => CentralURLBuilder('API_FAVORITE')
                .command('delete-favorite')
                .path('favorite')
                .path(favoriteId)
                .build(),
        },
    },
    work: {
        create: () => CentralURLBuilder('API_PCP_DASHBOARD')
            .command('create-work-item-from-dashboard')
            .path('work-item')
            .build(),
        update: (workItemId: string) => CentralURLBuilder('API_WORK_MANAGEMENT')
            .command('update')
            .paths(['work-item', workItemId])
            .build(),
        archive: (workItemId: string) => CentralURLBuilder('API_WORK_MANAGEMENT')
            .command('archive')
            .paths(['work-item', workItemId])
            .build(),
    },
    workItemReference: {
        add: (workItemId: string) => CentralURLBuilder('API_WORK_MANAGEMENT')
            .command('add-reference')
            .paths(['work-item', workItemId])
            .build(),
    },
};
