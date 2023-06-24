import { DashboardOutlined, UserOutlined } from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig';

const dashBoardNavTree = [
  {
    key: 'main',
    path: `${APP_PREFIX_PATH}/main`,
    title: 'sidenav.main',
    icon: DashboardOutlined,
    breadcrumb: false,
    isGroupTitle: true,
    submenu: [
      {
        key: 'dashboards-default',
        path: `${APP_PREFIX_PATH}/main/dashboards`,
        title: 'sidenav.main.dashboard',
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: 'clients',
        path: `${APP_PREFIX_PATH}/main/clients`,
        title: 'sidenav.main.clients',
        icon: UserOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: 'clients-list',
            path: `${APP_PREFIX_PATH}/main/clients/list`,
            title: 'sidenav.main.clients.list',
            icon: '',
            breadcrumb: false,
            submenu: [],
          },
          {
            key: 'clients-group',
            path: `${APP_PREFIX_PATH}/main/clients-group`,
            title: 'sidenav.main.clients.group',
            icon: '',
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
    ],
  },
];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
