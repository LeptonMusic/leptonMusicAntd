import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useModel, history } from '@umijs/max';
import { Button, Card, theme, Timeline, Image } from 'antd';
import React from 'react';

import coinsImageStr from '../Image/coins.png'
import artistStr from '../Image/artist.png'
import audienceStr from '../Image/audience.png'
import investorStr from '../Image/investor.png'
import communityStr from '../Image/community.png'
// import musicianProcessStr from '../Image/ProcessMusician.jpeg'
// import mapProcessStr from '../Image/ProcessMap.jpeg'
// import investorProcessStr from '../Image/ProcessInvestor.jpeg'
// import communityProcessStr from '../Image/ProcessCommunity.jpeg'

import aiMusicStr from '../Image/AIMusic.png'
import homeListenStr from '../Image/homeListen.jpg'
import musicNFTStr from '../Image/musicNFT.jpg'

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
      // onClick={() => {
      //   window.open('https://pro.ant.design/docs/getting-started');
      // }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        了解更多 {'>'}
      </a>
    </div>
  );
};

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */
const ImageTextCard: React.FC<{
  title: string;
  image: string;
  href: string;
}> = ({ title, href, image }) => {
  const { useToken } = theme;

  const { token } = useToken();

  return (
    <div
      style={{
        // backgroundColor: token.colorBgContainer,
        // boxShadow: token.boxShadow,
        //borderRadius: '8px',
        //fontSize: '14px',
        // color: token.colorTextSecondary,
        // lineHeight: '22px',
        // padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
      // onClick={() => {
      //   window.open('https://pro.ant.design/docs/getting-started');
      // }}
    >
      <Image
        width={200}
        //src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        src={image}
        preview={false}
      />
      <div
        style={{
          fontSize: '20px',
          color: token.colorTextHeading,
          marginTop: 20,
        }}
      >
        {title}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
    >
      {/* <div
        style={{
          textAlign: 'center',
        }}
      >
        <Image
          //width={200}
          width={'50%'}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          preview={false}
        />
      </div> */}
      
      {/* <Card
        style={{
          borderRadius: 0,
          backgroundImage: "url('https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg')",
          height: '80%',
        }}
        bordered={false}

      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            height: '80%'
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
              textAlign: 'center',
            }}
          >
            欢迎使用 Lepton Music
          </div>
          <p
            style={{
              fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            Lepton Music 是一个整合了 umi，Ant Design 和 ProComponents
            的脚手架方案。致力于在设计规范和基础组件的基础上，继续向上构建，提炼出典型模板/业务组件/配套设计资源，进一步提升企业级中后台产品设计研发过程中的『用户』和『设计者』的体验。
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <InfoCard
              index={1}
              href="https://umijs.org/docs/introduce/introduce"
              title="了解 umi"
              desc="umi 是一个可扩展的企业级前端应用框架,umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。"
            />
            <InfoCard
              index={2}
              title="了解 ant design"
              href="https://ant.design"
              desc="antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。"
            />
            <InfoCard
              index={3}
              title="了解 Pro Components"
              href="https://procomponents.ant.design"
              desc="ProComponents 是一个基于 Ant Design 做了更高抽象的模板组件，以 一个组件就是一个页面为开发理念，为中后台开发带来更好的体验。"
            />
          </div>
        </div>
      </Card> */}

      <ProCard 
        layout="center" 
        bordered={false}
        direction='column'
        bodyStyle={{
          // backgroundColor: '#1890ff',
          //background: 'linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)',
          background: 'linear-gradient(to right bottom, #9FB1EC, #ffffff)'
          //background: '#1890ff',
        }}
        style={{
          borderRadius: 0,
          // backgroundImage: "url('https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg')",
          //backgroundColor: 'linear-gradient(to right, #333, #fff)',
        }}
      >
        <div
          style={{
            fontSize: '28px',
            color: token.colorTextHeading,
            marginTop: 50,
          }}
        >
          LEPTON MUSIC
        </div>
        <div
          style={{
            fontSize: '20px',
            color: token.colorTextHeading,
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          Cryptofinance Empowers Music Ecosystem
        </div>
        <div
          style={{
          fontSize: '20px',
          color: token.colorTextHeading,
          textAlign: 'center',
        }}
        >
          Lepton Music: The Next Generation of Digital
        </div>
        <div
          style={{
            fontSize: '20px',
            color: token.colorTextHeading,
            marginBottom: 50,
          }}
        >
          Assets and Music Platform
        </div>    
        {/* <Button>
          立即体验
        </Button> */}
      </ProCard>
      <Card
        style={{
          borderRadius: 0,
          //backgroundImage: "url('https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg')",
          //background: 'linear-gradient(to right bottom, #f00, #00f)',
          height: '80%',
          textAlign: 'center',
          
        }}
        bordered={false}
      >
        <div
          style={{
            textAlign: 'center',
            fontSize: 28,
            marginTop: 20,
          }}
        >
          Products and Services
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            marginTop: 40,
            marginBottom: 20,
            
          }}
        >
          <ImageTextCard
            title='AI Creates Music'
            image={aiMusicStr}
          >
          </ImageTextCard>
          <ImageTextCard
            title='Music NFT'
            image={musicNFTStr}
          >
          </ImageTextCard>
          <ImageTextCard
            title='Listen to Earn'
            image={homeListenStr}
          >
          </ImageTextCard>
        
        </div>
      </Card>
      
      <Card
        style={{
          borderRadius: 0,
          //backgroundImage: "url('https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg')",
          //background: 'linear-gradient(to right bottom, #f00, #00f)',
          background: 'linear-gradient(to right bottom, #9FB1EC, #ffffff)',
          height: '80%',
          textAlign: 'center',
        }}
        bordered={false}
      >
        <div
          style={{
            fontSize: '28px',
            color: token.colorTextHeading,
            marginTop: 40,
          }}
        >
          AI Creates Music
        </div>
        <div
          style={{
            fontSize: '20px',
            color: token.colorTextHeading,
            marginTop: 20,
          }}
        >
          You only need to provide the keyword description of the music, and the background AI will automatically generate the music you want
        </div>
        {/* <div
          style={{
            fontSize: '20px',
            color: token.colorTextHeading,
            marginTop: 20,
          }}
        >
          只需要提供音乐的关键词描述，后台AI自动生成您想要的音乐
        </div> */}
        <div
          style={{
            marginBottom: 80,
            marginTop: 40
          }}
        >
          <Button
            onClick={() => {
              history.push(`/music`);
            }}
          >
            experience
          </Button>
        </div>
      </Card>
      
      <Card
        style={{
          borderRadius: 0,
          //backgroundImage: "url('https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg')",
          //background: 'linear-gradient(to right bottom, #9FB1EC, #ffffff)',
          height: '80%',
          textAlign: 'center',
          
        }}
        bordered={false}
      >
        <div
          style={{
            textAlign: 'center',
            fontSize: 28,
            marginTop: 20,
          }}
        >
          Music NFT
        </div>
        {/* <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            marginTop: 40,
            marginBottom: 20,
            
          }}
        > */}
          {/* <ImageTextCard
            title='Lepton Music NFT 01'
            image='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          >
          </ImageTextCard>
          <ImageTextCard
            title='Lepton Music NFT 02'
            image='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          >
          </ImageTextCard>
          <ImageTextCard
            title='Lepton Music NFT 03'
            image='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          >
          </ImageTextCard>
          <ImageTextCard
            title='Lepton Music NFT 04'
            image='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          >
          </ImageTextCard> */}
          
        {/* </div> */}
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
        <div
          style={{
            marginTop: 20,
            marginBottom: 40,
          }}
        >
          <Button
            onClick={() => {
              history.push(`/store`);
            }}
          >
            see more
          </Button>
        </div>
      </Card>

      <Card
        style={{
          borderRadius: 0,
          //backgroundImage: "url('https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg')",
          background: 'linear-gradient(to right bottom, #9FB1EC, #ffffff)',
          height: '80%',
          textAlign: 'center',
          
        }}
        bordered={false}
      >
        <div
          style={{
            textAlign: 'center',
            fontSize: 28,
            marginTop: 20,
          }}
        >
          Listen to Earn
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            marginTop: 40,
            marginBottom: 20,
            flex: 1,
          }}
        > 
          <div
            style={{
              flex: 1
            }}
          >
            <Image
              width={200}
              src={artistStr}
              preview={false}
              // preview={{
              //   src: {musicianProcessStr},
              // }}
            />
          </div>
          <div
            style={{
              flex: 1
            }}
          >
            <Image
              width={200}
              src={audienceStr}
              preview={false}
              // preview={{
              //   src: {mapProcessStr},
              // }}
            />
          </div>
          <div
            style={{
              flex: 1
            }}
          >
            <Image
              width={200}
              src={investorStr}
              // preview={{
              //   src: {investorProcessStr},
              // }}
              preview={false}
            />
          </div>
          <div
            style={{
              flex: 1
            }}
          >
            <Image
              width={200}
              src={communityStr}
              preview={false}
              // preview={{
              //   src: {communityProcessStr},
              // }}
            />
          </div>    
        </div>
      </Card>

      <Card
        style={{
          borderRadius: 0,
          //backgroundImage: "url('https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg')",
          // background: 'linear-gradient(to right bottom, #f00, #00f)',
          height: '80%',
          textAlign: 'center',
        }}
        bordered={false}
      >
        <div
          style={{
            fontSize: '28px',
            color: token.colorTextHeading,
            marginTop: 40,
            marginBottom: 40,
          }}
        >
          RoadMap
        </div>
        <Timeline
          mode='left'
          items={[
            {
              label: '2022 Q4',
              color: 'green',
              children: (
                <>
                  <p>Team setup</p>
                  <p>Lepton DAO setup</p>
                </>
              )
            },
            {
              label: '2023 Q1',
              color: 'green',
              children: (
                <>
                  <p>Seed round fundraising</p>
                  <p>Token launches on testnet</p>
                  <p>Webset launches</p>
                  <p>Begin Airdrop campaign</p>
                </>
              )
            },
            {
              label: '2023 Q2',
              color: 'blue',
              children: (
                <>
                  <p>Token launches on main chains</p>
                  <p>DAPP launches</p>
                  <p>NFT marketplace opens</p>
                </>
              )
            },
            {
              label: '2023 Q3',
              color: 'gray',
              children: (
                <>
                  <p>Token ICO</p>
                  <p>1st consensus meeting</p>
                  <p>1st Lepton Crypto music competition</p>
                </>
              )
            },
            {
              label: '2023 Q4',
              color: 'gray',
              children: (
                <>
                  <p>1st Online music festival</p>
                  <p>Launch Lepton artist funding scheme</p>
                </>
              )
            },
            {
              label: '2024 Q1',
              color: 'gray',
              children: (
                <>
                  <p>2nd consensus meeting</p>
                  <p>Fund 100 next-generation crypto artists</p>
                </>
              )
            },
          ]}
        />
      </Card>
      
      <Card
        style={{
          borderRadius: 0,
          //backgroundImage: "url('https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg')",
          background: 'linear-gradient(to right bottom, #9FB1EC, #ffffff)',
          height: '80%',
          textAlign: 'center',
        }}
        bordered={false}
      >
        <div
          style={{
            fontSize: '28px',
            color: token.colorTextHeading,
            marginTop: 40,
          }}
        >
          Lepton Artist Funding Scheme
        </div>
        <div
          style={{
            fontSize: '20px',
            color: token.colorTextHeading,
            marginTop: 20,
          }}
        >
          LeptonMusic is committed to supporting the musical career of the new generation of musicians 52% of musicians in China have no music income, 24% of musicians' music income accounts for less than 5% of their total income, and most musicians' income is difficult to support theirmusical dreams. 
          In view of this, LeptonMusic provides a fully transparent, non-exploitative, democratic, and middleman-free music ecosystem for the new generation of musicians, where all royalties go to content artists. Lepton artist Funding Program#Based on the philosophy of supporting early-career musicians, Lepton launches:
        </div>
        <div
          style={{
            marginBottom: 80,
            marginTop: 20,
            textAlign: 'left',
          }}
        >
          <p>(1) Lepton Artist Funding Program: LeptonMusic withdraws LeptonMusic Coin equivalent to 50,000 US dollars every year, and provides funding to 100 new generationmusicians</p>
          <p>(2) Lepton Popularity Program: The platform give additional exposure to selected musiccontents ranging from 1,000-10,000</p>
          <p>(3) Crypto Music Beginners Support Program: Inject 1-100 additional music coins into the corresponding artist’s music mining pool</p>
        </div>
      </Card>

      <Card
        style={{
          borderRadius: 0,
          //backgroundImage: "url('https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg')",
          //background: 'linear-gradient(to right bottom, #f00, #00f)',
          height: '80%',
          textAlign: 'center',
        }}
        bordered={false}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            marginTop: 50,
            marginBottom: 50,
            alignItems: 'center'
          }}
        > 
          <div
            style={{
              flex: 1
            }}
          >
            <Image
              width={300}
              //src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
              src={coinsImageStr}
              preview={false}
            />
          </div>
          <div
            style={{
              flex: 1,
             }}
          >
            <div
              style={{
                fontSize: '28px',
                color: token.colorTextHeading,
              }}
            >
              Lepton Music Cryptocurrency
            </div>
            <div
              style={{
                marginTop: 50,
                fontSize: 20,
                marginBottom: 50,
              }}
            >
              Lepton Crypto Music Platform launches a DeFi system centered on LMC and LMG, to provide DeFi services, based on open source technology and executed by smart contracts. Lending, depositing, investing, trading and other activities on LeptonMusic Tokens are decentralized, automatic, open to the public, and easily accessible for everyone. Let every music coin holder enjoy the convenience of DeFi.
            </div>
          </div>
          
          
          
        </div>
      </Card>
    </PageContainer>
  );
};

export default Home;