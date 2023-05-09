import React from 'react';
import { PlatformTag, User } from '@gotecq/model';
import { QueryAPI, Requestor } from '@/access';
import { EntityUser, EntityUserCompact } from '@gotecq/component.entity';

export const searchAvailableAssignee = async (queryString: string = '') => {
    try {
        const data = await Requestor.request.GET(QueryAPI.userSelector(queryString));
        return data.map(({ _id }: User) => ({
            label: <EntityUser id={_id} />,
            children: <EntityUser id={_id} />,
            value: _id,
            key: _id,
            label_compact: <EntityUserCompact showIcon id={_id} />,
        }));
    } catch (e) {
        return [];
    }
};

export async function TagsFetcher() {
    try {
        const resp = await Requestor.cacheRequest.get<PlatformTag[]>(QueryAPI.tag.all());
        return resp?.map((item) => ({ label: item.code, value: item.code }));
    } catch (e) {
        return [];
    }
}