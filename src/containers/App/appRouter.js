import React, { Component, lazy, Suspense } from 'react';
import Route from '../../components/utility/customRoute';
import Loader from '../../components/utility/Loader/';

const routes = [
  {
    path: '',
    component: lazy(() => import('../Dashboard')),
  },
  {
    path: 'stock-management',
    component: lazy(() => import('../StockManagementPage')),
  },
  {
    path: 'stock-outflow',
    component: lazy(() => import('../StockOutflowPage')),
  },
  {
    path: 'barcode-info',
    component: lazy(() => import('../BarCodeInformationPage')),
  },
  {
    path: 'barcode-prints',
    component: lazy(() => import('../PrintBarcodesPage')),
  },
  {
    path: 'reports',
    component: lazy(() => import('../ReportsPage')),
  },
  {
    path: 'sys-users',
    component: lazy(() => import('../SystemUsersPage')),
  },
  {
    path: 'admin-master',
    component: lazy(() => import('../AdminMasterPage')),
  },
  {
    path: 'invoices',
    component: lazy(() => import('../InvoicesBuilderPage')),
  },
  {
    path: 'contacts',
    component: lazy(() => import('../ContactsPage')),
  },
  
];

class AppRouter extends Component {
  render() {
    const { url, style } = this.props;
    return (
      <Suspense fallback={<Loader />}>
        <div style={style}>
          {routes.map(singleRoute => {
            const { path, exact, ...otherProps } = singleRoute;
            return (
              <Route
                exact={exact === false ? false : true}
                key={singleRoute.path}
                path={`${url}/${singleRoute.path}`}
                {...otherProps}
              />
            );
          })}
        </div>
      </Suspense>
    );
  }
}

export default AppRouter;
