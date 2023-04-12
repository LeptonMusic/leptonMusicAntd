import { ProLayoutProps } from '@ant-design/pro-components';
import logoStr from '../src/pages/Image/lepton_logo.jpg';
/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  // logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Lepton Music',
  pwa: true,
  // logo: <img src="https://avatars1.githubusercontent.com/u/8186664?s=460&v=4"/>,
  //logo: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
  iconfontUrl: '',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
  contentStyle: {
    fontSize: 24
  }
};

export default Settings;
