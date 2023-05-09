import { EntityFactory } from '@gotecq/state';
import { QueryAPI } from '@/access';
import { Dashboard, DashboardWorkItemModel } from '@gotecq/model';

export const DashboardEntity = EntityFactory<Dashboard>('dashboard', {
    url: ({ _id }) => QueryAPI.dashboard.single(_id),
});
export const DashboardWorkItemEntity = EntityFactory<DashboardWorkItemModel, { _id: string, dashboard_id: string }>('dashboard_work_item', {
    url: ({ _id, dashboard_id }) => QueryAPI.dashboard.work.single(dashboard_id, _id),
});