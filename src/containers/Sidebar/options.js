import { getDefaultPath } from '../../helpers/urlSync';

const options = [
  {
    label: 'sidebar.stockManagement',
    key: 'stock-management',
  },
  {
    label: 'sidebar.stockOutflow',
    key: 'stock-outflow',
  },
  {
    label: 'sidebar.barcodeinfo',
    key: 'barcode-info',
  },
  {
    label: 'sidebar.printBarcodes',
    key: 'barcode-prints',
  },
  {
    label: 'sidebar.reports',
    key: 'reports',
  },
  {
    label: 'sidebar.sysUsers',
    key: 'sys-users',
  },
  {
    label: 'sidebar.adminMaster',
    key: 'admin-master',
  },
  {
    label: 'sidebar.invoice',
    key: 'invoices',
  },
];
const getBreadcrumbOption = () => {
  const preKeys = getDefaultPath();
  let parent, activeChildren;
  options.forEach(option => {
    if (preKeys[option.key]) {
      parent = option;
      (option.children || []).forEach(child => {
        if (preKeys[child.key]) {
          activeChildren = child;
        }
      });
    }
  });
  return { parent, activeChildren };
};
export default options;
export { getBreadcrumbOption };
