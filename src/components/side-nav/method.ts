import { SideNavSchemas } from './navigation-schema';

export function getSideNavMenuConfig(currentModule: string): { data: any, schema: any } {
    const defaultMenuData = {};
    const defaultMenuSchema = {};

    const sideNavMenuConfig = SideNavSchemas?.[currentModule];
    if (!sideNavMenuConfig) {
        return {
            data: defaultMenuData,
            schema: defaultMenuSchema,
        };
    }

    return {
        // expose only `data` field of each config
        // SAMPLE
        // {
        //     [TechnologySideNavMode.SUMMARY]: 'Technology Summary',
        //     [TechnologySideNavMode.FAVORITE]: 'Favorites',
        // }
        data: Object.entries(sideNavMenuConfig).reduce((accumulator, [key, value]) => {
            return {
                ...accumulator,
                [key]: value.data,
            };
        }, {}),
        schema: sideNavMenuConfig,
    };
}