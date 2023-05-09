import { createConfigGetter, getBuildConfig } from '@gotecq/config';

export const { getConfig, loadAsyncConfig } = createConfigGetter();

export const BASE_URL = getBuildConfig('BASE_URL');

export const MAIN_API = getConfig('platform.main_api');
export const PLATFORM_API = getConfig('platform.platform_api');
export const LANDING_PAGE_URL = getConfig('platform.landing_page_url');

export const SOCKET_URL = getConfig('mqtt.socket_url');
export const SOCKET_PORT = getConfig('mqtt.socket_port');

export const MEMBER_MANAGEMENT_URL = () => getConfig('portal.app.mbr')()?.url;
export const PROVIDER_MANAGEMENT_URL = () => getConfig('portal.app.pnm')()?.url;
export const CONTRACT_ADMINISTRATION_URL = () => getConfig('portal.app.cda')()?.url;
export const CONTRACT_MANAGEMENT_URL = () => getConfig('portal.app.cdm')()?.url;
export const WORK_MANAGEMENT_URL = () => getConfig('portal.app.wkm')()?.url;
export const PCP_DASHBOARD_URL = () => getConfig('portal.app.pcd')()?.url;
export const DEFAULT_MEMBER_DASHBOARD_FILTER = getConfig('app.pcd.default.member_dashboard_filter');

export const BASE_API = getConfig('platform.api.base');
export const EHR_MANAGEMENT_API = getConfig('platform.api.ehr_management');
export const PROVIDER_MANAGEMENT_API = getConfig('platform.api.provider_management');
export const MEMBER_MANAGEMENT_API = getConfig('platform.api.member_management');
export const WORK_MANAGEMENT_API = getConfig('platform.api.work_management');
export const USER_MANAGEMENT_API = getConfig('platform.api.user_management');
