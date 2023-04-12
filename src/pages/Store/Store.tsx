import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme, Image, List } from 'antd';
import React from 'react';
// import ImageTextCard from '../Home/Home';

const data = [
  {
    title: 'Lepton Music NFT 1',
    price: '50¥',
    imageStr: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    title: 'Lepton Music NFT 2',
    price: '50¥',
    imageStr: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    title: 'Lepton Music NFT 3',
    price: '50¥',
    imageStr: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    title: 'Lepton Music NFT 4',
    price: '50¥',
    imageStr: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    title: 'Lepton Music NFT 5',
    price: '50¥',
    imageStr: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    title: 'Lepton Music NFT 6',
    price: '50¥',
    imageStr: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    title: 'Lepton Music NFT 7',
    price: '50¥',
    imageStr: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    title: 'Lepton Music NFT 8',
    price: '50¥',
    imageStr: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    title: 'Lepton Music NFT 9',
    price: '50¥',
    imageStr: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
];

const Store: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
    >
      
      <div
        style={{
          marginTop: 40,
          marginBottom: 20,
          textAlign: 'center',
          fontSize: '20px',
        }}
      >
        There is no cooperative music NFT yet, if you have any needs, please contact us in the following ways
        <p>Wechat: Lepton DAO</p>
        <p>Email: leptondao@163.com</p>
      </div>

      {/* <div
        style={{
        fontSize: '28px',
        color: token.colorTextHeading,
        textAlign: 'center',
        marginBottom: '30px',
      }}
      >
        NFT集市
      </div> */}
      {/* <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 6,
        }}
        dataSource={data}
        renderItem={(item) => (
        <List.Item>
          <Card 
            style={{
              borderRadius: 0,
              textAlign: 'center'
            }}
            bordered={false}
            //title={item.title}
          >
            <Image
              // width={00}
              src={item.imageStr}
              // preview={{
              //   src: 'https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png',
              // }}
            />
            <div>
              {item.title}
            </div>
            <div>
              {item.price}
            </div>
          </Card>
        </List.Item>
        )}
      /> */}
    </PageContainer>
  );
};

export default Store;
