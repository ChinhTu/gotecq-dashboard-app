import './index.scss';
import React from 'react';
import { NavBar } from '@gotecq/core';
import { RealtimeAccess } from '@/access';
import { ExtractProps, mergeClass } from '@gotecq/utils';
import { NotificationWidget } from '@gotecq/core';
import { AppModules, drawerMenu } from '@/constant';
// import { AppMenuIcon, CarbonIcon } from '@/assets';
// import { Dropdown, Menu } from 'antd';
// import { QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { NavItem } = NavBar;

export function AppNavBar(props: ExtractProps<typeof NavBar>) {
    const routerPath = useSelector((state: any) => state.router.location.pathname);
    const currentActiveModule = `${routerPath ?? ''}`.split('/')[1];

    return (
        <NavBar
            className={mergeClass('app-navbar', currentActiveModule === AppModules.DASHBOARD_COMPACT ? 'navbar-hidden' : '')}
            {...props}
        >
            <NavBar.BranchNameWithDrawer
                menu={drawerMenu}
                indicator={(<NavBar.MQTTStatus realtimeAccess={RealtimeAccess} />)}
            />
            <NavBar.HomeButton />
            <NavBar.AppModuleList menuList={drawerMenu} />

            {/* @todo: display this navitem when HOME module is ready */}
            {/* <NavItem right>
                <Dropdown
                    trigger={['click']}
                    placement="bottomRight"
                    className="app-navbar__action-menu__dropdown-btn"
                    overlay={(
                        <Menu className="app-navbar__action-menu">
                            <Menu.Item key="search"><SearchOutlined /> Search Dashboards</Menu.Item>
                            <Menu.Item key="export"><CarbonIcon /> To-do List</Menu.Item>
                            <Menu.Item key="help"><QuestionCircleOutlined /> Help & Support</Menu.Item>
                        </Menu>
                    )}
                ><AppMenuIcon /></Dropdown>
            </NavItem> */}

            <NavItem right>
                <NotificationWidget realTimeAccess={RealtimeAccess} />
            </NavItem>
            <NavBar.UserDropDown />
        </NavBar>
    );
}
