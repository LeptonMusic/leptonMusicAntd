import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useModel, history } from '@umijs/max';
import { Button, Card, theme, Timeline, Image, List, Drawer, Upload, message, Spin, Modal, Input } from 'antd';
import { React, useState } from 'react';
import { Contract, ethers, Provider } from 'ethers';
import { InboxOutlined } from '@ant-design/icons';
import { Conflux, Wallet, Drip } from 'js-conflux-sdk';
import { HDWallet } from '@conflux-dev/hdwallet';
import { jsbi } from 'jsbi'

import type { UploadProps } from 'antd';

import { LEPTON_NFT_ABI, LEPTON_NFT_ADDRESS } from '../../../config/leptonNFT';

import coinsImageStr from '../Image/coins.png'
import artistStr from '../Image/artist.png'
import audienceStr from '../Image/audience.png'
import investorStr from '../Image/investor.png'
import communityStr from '../Image/community.png'

import aiMusicStr from '../Image/collectNFT.svg'
import homeMusicStr from '../Image/homeMusic.svg'
import iconButton from '../Image/IconButton.svg'
import saly01Str from '../Image/saly01.svg'
import saly02Str from '../Image/saly02.svg'
import saly03Str from '../Image/saly03.svg'
import saly04Str from '../Image/saly04.svg'

import avatar01Str from '../Image/avatar01.svg'

import likeStr from '../Image/like.svg'
import ticketsStr from '../Image/tickets.svg'
import priceStr from '../Image/price.svg'

import beginTimeStr from '../Image/beginTime.svg'
import buyButtonStr from '../Image/panicBuyButton.svg'
import previewButtonStr from '../Image/previewButton.svg'
import castButtonStr from '../Image/castButton.svg'
import createButtonStr from '../Image/createButton.svg'

import hotBgStr from '../Image/hotBg.svg'
import topBgStr from '../Image/topBg.svg'
import centerBgStr from '../Image/centerBg.svg'
import leptonTicket from '../Image/lepton_ticket.png'

import logo from '../Image/lepton_logo.svg'

const { Dragger } = Upload;

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
          color: '#ffffff',
          marginTop: 20,
        }}
      >
        {title}
      </div>
    </div>
  );
};

const data = [
  {
    title: 'Lepton Music NFT 1',
    price: '50¥',
    imageStr: saly01Str,
  },
  {
    title: 'Lepton Music NFT 2',
    price: '50¥',
    imageStr: saly02Str,
  },
  {
    title: 'Lepton Music NFT 3',
    price: '50¥',
    imageStr: saly03Str,
  },
  {
    title: 'Lepton Music NFT 4',
    price: '50¥',
    imageStr: saly04Str,
  },
];

const Home: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');

  // let provider: ethers.Provider;
  // let myWallet: ethers.HDNodeWallet;
  const conflux = new Conflux({
    url: 'https://test.confluxrpc.com',
    networkId: 1,
  });

  const [cfxAddress, setCfxAddress] = useState('');
  const [cfxAccount, setCfxAccount] = useState();

  //助记词
  const [mnemonic, setMnemonic] = useState<string | undefined>()
  //钱包公钥地址
  const [walletPubAddress, setWalletPubAddress] = useState('')
  //余额
  const [myBalance, setMyBalance] = useState(0)
  const [provider, setProvider] = useState<ethers.Provider>()
  const [myWallet, setMyWallet] = useState<ethers.Wallet>()

  //数组
  // let nftModels: Array<Record<string, string>> = []
  const [nftModels, setNftModels] = useState<Array<Record<string, string>>>()
  //loading
  const [walletLoading, setWalletLoading] = useState(false)

  const getWalletInfo = async () => {
    // const address = await myWallet?.getAddress();
    // const balance = await provider.getBalance(address);
    // setMyBalance(ethers.formatEther(balance));
    // setWalletPubAddress(address);

    //0x8efeb71e84de711e2b9fad2c406c3cab3632682e4009bf1f76b2a0ed091bd448
    setWalletLoading(true);
    const contract = conflux.Contract({ 'abi': LEPTON_NFT_ABI, address: "cfxtest:achgn4jmjwb5anzeah4y733cun7h4fg9eap60syemm" });
    const name = await contract.name();
    console.log('contractName: ', name); // MiniERC20

    // const account = conflux.wallet.addPrivateKey('0xd5e1ccb96c352bfc704993f5c3fb0c657b2c80aa2d98b5eb1a7a292af16d8ee0'); 
    // let receipt = await contract.mint(0, 'https://pin.ski/3HcVzxm', 'test2').sendTransaction({
    //   from: account,
    // })
    // console.log(receipt)

    ////获取资产
    let nfts = await contract.balanceOf(cfxAddress);
    console.log('nfts: ', nfts[0]);
    let tokens: Array = await contract.getOwnedTokens(cfxAddress);

    let models: Array<Record<string, string>> = []
    for (let i = 0; i < tokens.length; i++) {
      const element = tokens[i];
      console.log('tokens:', element);
      // let a = contract.abi.decodeLog(tokens);
      const url = await contract.tokenURI(element);
      console.log('url:', url);
      const model = {
        'id': String(element),
        'url': String(url),
      }
      models.push(model);

      const author = await contract.getAuthorOf(element);
      console.log('author: ', author);

      const isExists = await contract.exists(element);
      console.log('是否存在', isExists);
    }
    setNftModels(models);
    console.log('models: ', nftModels);

    //cfx
    setWalletPubAddress(cfxAddress);
    const balance = await conflux.getBalance(cfxAddress);
    const balanceWei = String(balance);
    const showBalance = ethers.formatEther(balanceWei);
    setMyBalance(showBalance);
    console.log('cflBalance: ', showBalance);
    setWalletLoading(false);
  }

  //drawer 
  const [myWalletOpen, setMyWalletOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);

  const onMyWalletClose = () => {
    setMyWalletOpen(false);
  }

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };

  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  //钱包按钮
  const [walletTitle, setWalletTitle] = useState('web3钱包创建')

  //上传铸造NFT
  //图片上传、铸造NFT
  const [loading, setLoading] = useState(false);

  const beforeUpload = (file: RcFile) => {
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) {
    //   message.error('You can only upload JPG/PNG file!');
    // }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isLt2M;
  };

  const props: UploadProps = {
    showUploadList: false,
    name: 'file',
    headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkY2FmODg1Mi01MjdkLTQ5YWUtYWQ2Zi1hNWQzMDMzMmNlYWIiLCJlbWFpbCI6IjE1ODAzMDQzMTc1QDE2My5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMjRlODVjZDY2OGJiYTE3YWI0MWMiLCJzY29wZWRLZXlTZWNyZXQiOiJhYTcyODcwMTkxYjExZGY1MzY2Y2ZmZTJiNTExNTJkZmZiYmU3NmUyMTM1NTExYWU1NTc4ZTg5ZGQ0ODE1M2NmIiwiaWF0IjoxNjgyNzQ5MzkxfQ.0pNc4JnCeVCE7xLaOyUnVm2B8mp02Gg2F89wQ8LVGow' },
    data: {
      'pinataOptions': '{"cidVersion": 1}',
      'pinataMetadata': '{"name": "MyFile", "keyvalues": {"company": "Pinata"}}'
    },
    multiple: true,
    action: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
    accept: 'image/*',
    maxCount: '1',
    beforeUpload: beforeUpload,
    onChange(info) {
      setLoading(true);
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {

        const ipfsHash = info.file.response.IpfsHash;
        const myNFTUrl = 'https://orange-frozen-panda-426.mypinata.cloud/ipfs/' + ipfsHash;
        console.log(myNFTUrl);
        // setTimeout(() => {
        //   setLoading(false);
        //   message.success(`恭喜，NFT铸造成功！请前往钱包查看您的藏品!`);
        // }, 3000);

        mintNFT(myNFTUrl);

      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        setLoading(false);
      } else {
        setLoading(false);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //铸造NFT
  const mintNFT = async (nftUrl: string) => {
    // const contract = new Contract(LEPTON_NFT_ADDRESS, LEPTON_NFT_ABI, myWallet);
    // const wallet1 = ethers.Wallet.fromPhrase(mnemonic, provider);
    // const contract = new Contract(LEPTON_NFT_ADDRESS, LEPTON_NFT_ABI, wallet1);
    // const name = await contract.name();
    // setWalletPubAddress(name);

    const contract = conflux.Contract({ 'abi': LEPTON_NFT_ABI, address: "cfxtest:achgn4jmjwb5anzeah4y733cun7h4fg9eap60syemm" });
    const name = await contract.name();
    console.log('contractName: ', name); // MiniERC20

    const account = conflux.wallet.addPrivateKey(mnemonic);
    let receipt = await contract.mint(0, nftUrl, 'test').sendTransaction({
      from: account,
    });
    console.log(receipt);
    setLoading(false);
    message.success(`恭喜，NFT铸造成功！请前往钱包查看您的藏品!`);
  }

  //设置图片
  const [NFTUrl, setNFTUrl] = useState('');

  //导入钱包
  const [isImportWallet, setIsImportWallet] = useState(false);

  const importWalletOk = () => {
    setIsImportWallet(false)
    console.log('inputPrivateKey:', inputPrivateKey);
    try {
      const account = conflux.wallet.addPrivateKey(inputPrivateKey);
      setWalletTitle('我的钱包');
      setCfxAddress(account.address);
      setMnemonic(inputPrivateKey);
    } catch (error) {
      message.error('私钥格式不正确，导入失败！');
    }
    message.success('导入成功！');
  }

  const importWalletCancel = () => {
    setIsImportWallet(false)
  }

  const [inputPrivateKey, setInputPrivateKey] = useState('');
  const showInputValue = e => {
    setInputPrivateKey(e.target.value);
  }

  // 充值
  const rechargeWallet = async () => {
    setWalletLoading(true);
    //else wise matrix number index young knife hobby thought fold nasty tomato
    const sender = conflux.wallet.addPrivateKey('0x7b685c833c2f8bd76905c1717a00e9b1b9c02cfba4c8f9ec5293238fc4e3afa0'); // add private to local wallet
    const transactionHash = conflux.cfx.sendTransaction({
      from: sender.address, // account address or instance which added into conflux.wallet
      to: cfxAddress, // receiver address
      value: Drip.fromCFX(2), // 0.1 CFX = 100000000000000000 Drip
    });
    const confirmedReceipt = await transactionHash.confirmed();
    console.log('交易被确认：', confirmedReceipt);
    const balance = await conflux.getBalance(cfxAddress);
    const balanceWei = String(balance);
    const showBalance = ethers.formatEther(balanceWei);
    setMyBalance(showBalance);
    setWalletLoading(false);
    message.success('2CFX已到账，请合理使用');
  }

  // 备份钱包
  const [backupWallet, setBackupWallet] = useState(false);

  const backupWalletOk = () => {
    setBackupWallet(false);
  }

  const backupWalletCancel = () => {
    setBackupWallet(false);
  }

  return (
    <PageContainer
      header={{
        breadcrumb: {},
      }}
      style={{
        backgroundImage: 'url(' + topBgStr + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '130% -25%',
        position: 'float',
        background: '#030812',
      }}
    >
      <div
        style={{
          color: '#ffffff',
          marginTop: '-20px',
          // marginRight: '10px',
          // flex: 1,
          // display: 'flex',
          alignItems: 'center',
          background: '#fabced',
        }}
      >
        <div
          style={{
            float: 'right',
          }}
        >
          <Button
            style={{
              fontSize: '18px',
            }}
            onClick={() => {
              if (walletTitle == '我的钱包') {
                setMyWalletOpen(true);
                getWalletInfo();
              } else {
                setOpen(true);
              }
            }}
          >
            {walletTitle}
          </Button>
        </div>
        <div
          style={{
            fontSize: '24px',
            color: '#ffffff',
            // marginRight: '10px',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            marginRight: '40px',
            marginLeft: '40px',
            float: 'right',
          }}
        >

          <div
            style={{
              marginLeft: '40px',
            }}
          >
            铸造NFT
          </div>
          <div
            style={{
              marginLeft: '40px',
            }}
          >
            音乐活动
          </div>
          <div
            style={{
              marginLeft: '40px',
            }}
          >
            关于我们
          </div>
        </div>
      </div>
      <Modal title="上传您的图片铸造NFT" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Spin spinning={loading} tip='NFT铸造中'>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from uploading company data or other
              banned files.
            </p>
          </Dragger>
        </Spin>
      </Modal>


      <Drawer
        title="我的钱包"
        placement="right"
        onClose={onMyWalletClose}
        open={myWalletOpen}
        closable={false}
        extra={
          <Button
          onClick={() => {
            setBackupWallet(true);
          }}
          >
            备份钱包
          </Button>
        }
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          flex: 1,
        }}

      >
        <Modal title="请保护好您的私钥" open={backupWallet} onOk={backupWalletOk} onCancel={backupWalletCancel}>
          <div>{mnemonic}</div>
        </Modal>

        <Spin spinning={walletLoading} tip='数据请求中...'>
          <div
            style={{
              flex: 1,
            }}
          >
            钱包地址：{walletPubAddress}
          </div>
          <div
            style={{
              marginTop: '20px',
              fontWeight: 'bold',
            }}
          >
            余额：{myBalance} CFX
            <Button
              style={{
                marginLeft: '20px',
              }}
              onClick={rechargeWallet}
            >
              充值
            </Button>
          </div>

          <div
            style={{
              textAlign: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
              marginTop: '20px',
            }}
          >
            我的NFT资产
            <List
              style={{
                // marginLeft: '30px',
                // marginRight: '30px',
                textAlign: 'center',
              }}
              grid={{
                gutter: 10,
                xs: 1,
                sm: 1,
                md: 1,
                lg: 1,
                xl: 1,
                xxl: 1,
              }}
              dataSource={nftModels}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    style={{
                      textAlign: 'center',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '24px',
                      borderWidth: '0px',
                    }}

                  >
                    <div>Id: {item.id}</div>

                    <Image
                      src={item.url}
                      preview={false}
                    />
                  </Card>
                </List.Item>
              )}
            >
            </List>
          </div>
        </Spin>
      </Drawer>

      <Drawer
        title="创建/导入钱包"
        width={520}
        closable={false}
        onClose={onClose}
        open={open}
        style={{
          alignItems: 'center',
          textAlign: 'center',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            marginLeft: '10px',
            marginTop: '50px',
            display: 'flex',
            flexWrap: 'wrap',
            textAlign: 'center',
            flex: 1,
          }}
        >
          <div>
            <Button onClick={showChildrenDrawer}>
              创建新的web钱包账号
            </Button>
          </div>

          <div
            style={{
              flex: 1,
            }}
          >
            <Button
              onClick={() => {
                setIsImportWallet(true);
              }}
            >
              导入已有钱包账号
            </Button>
          </div>
          <Modal title="根据私钥导入钱包" open={isImportWallet} onOk={importWalletOk} onCancel={importWalletCancel}>
            <Input placeholder="请输入私钥" onChange={showInputValue}></Input>
          </Modal>
        </div>
        <Drawer
          title="web3钱包创建"
          width={320}
          closable={false}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer}
          style={{
            textAlign: 'center',
          }}
        >
          <div>必要知识：web3钱包的<span style={{ color: '#f32910', }}>助记词和私钥</span>就相当于您的<span style={{ color: '#f32910', }}>账号密码</span>，在抽到后您应该保管好他们，我们不会联网传递您的数据，不提供找回等功能</div>
          <div
            style={{
              marginTop: '20px',
            }}
          >
            <Image
              src='https://media.giphy.com/media/ZINptFoSiqaF6DF6ot/giphy.gif'
              preview={false}
              style={{
                marginBottom: '10px',
              }}
            >
            </Image>

            <Button
              type='primary'
              onClick={() => {
                // setChildrenDrawer(false);
                // setOpen(false);
                // setIsModalOpen(false);
                // setIsWeb3ModalOpen(true);  

                // const provide = new ethers.JsonRpcProvider('http://127.0.0.1:7545');
                // const provide = new ethers.JsonRpcProvider('https://test.confluxrpc.com');
                // const wallet = ethers.Wallet.createRandom();
                // const walletWithProvider = wallet.connect(provide);
                // const mnemonicPhrase = wallet.mnemonic?.phrase;

                // setMnemonic(mnemonicPhrase);
                // setWalletTitle('我的钱包');
                // setProvider(provide);
                // setMyWallet(wallet);

                //通过钱包随机创建账号
                // const account0 = conflux.wallet.addRandom();
                const wallet = ethers.Wallet.createRandom();
                const mnemonicPhrase = wallet.mnemonic?.phrase;
                //wallet.privateKey导入
                const account = conflux.wallet.addPrivateKey(wallet.privateKey);

                console.log(account.address);

                setMnemonic(wallet.privateKey);
                setWalletTitle('我的钱包');
                setCfxAddress(account.address);
              }}
            >
              抽取您的web3钱包账号助记词
            </Button>
            <div
              style={{
                flex: 1,
                // textAlign: 'left',
              }}
            >
              <div
                style={{
                  fontSize: '20px',
                  marginTop: '10px',
                  marginBottom: '10px',
                }}
              >
                请注意：您应该按照顺序牢记12个单词的助记词
              </div>
              <div>
                如果我弄丢了
                <span style={{ color: '#f32910', }}>助记词和私钥</span>
                ，我的资产将永远丢失
              </div>
              <div>
                如果我给任何人泄露<span style={{ color: '#f32910', }}>助记词和私钥</span>
                ，我的资产可能会被盗
              </div>

              <div>
                保护<span style={{ color: '#f32910', }}>助记词和私钥</span>的责任完全在我
              </div>

            </div>
            <div
              style={{
                marginTop: '10px',
                marginRight: '10px',
              }}
            >
              您的web3钱包账号私钥为：
            </div>
            <div style={{ color: '#f32910', wordWrap: 'break-word' }}>{mnemonic}</div>
          </div>

        </Drawer>
      </Drawer>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: 40,
          marginBottom: 20,
          marginLeft: '15%',
          marginRight: '15%',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            flex: 1,
          }}
        >
          <div
            style={{
              textAlign: 'left',
            }}
          >
            <Image
              src={aiMusicStr}
              preview={false}
            ></Image>
            <p
              style={{
                fontSize: '20px',
                color: '#ffffff',
              }}
            >
              NFT 是网络世界最真实的收藏品
            </p>
            <div
            >
              {/* <Button
                  style={{
                    height: '50px',
                    minWidth: '35%',
                    background: 'linear-gradient(191.31deg, rgba(253,174,143,1.00) 26.075%,rgba(253,28,104,1.00) 91.851%)',
                  }}
                >
                  开始铸造
                </Button> */}
              {/* <Button
                  style={{
                    height: '50px',
                    minWidth: '35%',
                    marginLeft: '10px',
                  }}
                >
                  + 仅创作
                </Button> */}
              <Image
                src={castButtonStr}
                preview={false}
                onClick={() => {

                  // const contract = new Contract(LEPTON_NFT_ADDRESS, LEPTON_NFT_ABI, myWallet);
                  if (walletTitle == '我的钱包') {
                    setIsModalOpen(true);
                    // const wallet1 = ethers.Wallet.fromPhrase(mnemonic, provider);
                    // const contract = new Contract(LEPTON_NFT_ADDRESS, LEPTON_NFT_ABI, wallet1);
                    //contract.mint(0, 'https://pin.ski/41JMDHN');
                    setNFTUrl(leptonTicket);
                  } else {
                    message.warning('需要先创建web3钱包');
                    setOpen(true);
                  }

                }}
              />
              <Image
                style={{
                  marginLeft: '10px',
                }}
                src={createButtonStr}
                preview={false}
                // onClick={() => {
                //   window.open('https://pro.ant.design/docs/getting-started');
                // }}
              />

            </div>
          </div>
        </div>
        <div
          style={{
            minWidth: '220px',
            flex: 1,
          }}
        >
          <Image
            src={homeMusicStr}
            preview={false}
          ></Image>
        </div>

      </div>


      {/* <Card
        style={{
          borderRadius: 0,
          // background: '#030812',
          textAlign: 'center',
          background: 'url(' + centerBgStr + ')',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '10% -25%',
        }}
        bordered={false}
      > */}

      <div
        style={{
          background: 'url(' + centerBgStr + ')',
          // background: '#ffffff',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '-20% -10%',
          marginLeft: '-40px',
          marginRight: '-40px',
        }}
      >
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              color: '#ffffff',
            }}
          >
            我们做什么样的工作
          </div>
          <Image
            src={iconButton}
            preview={false}
            style={{
              marginTop: '56px',
            }}
          ></Image>
          <div
            style={{
              fontSize: '24px',
              color: '#ffffff',
              marginTop: '24px',
            }}
          >
            成为您进入web3.0门票
          </div>
          <div
            style={{
              fontSize: '16px',
              color: '#ffffff',
              marginBottom: '300px',
            }}
          >
            Once you’ve set up your wallet of choice, connect it to OpenSeaby clicking the NFT Marketplacein the top right corner.
          </div>
          {/* <div
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
        </div> */}
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            marginBottom: 20,
            marginLeft: '15%',
            marginRight: '15%',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              color: '#ffffff',
              flex: 1,
            }}
          >
            近期音乐活动
          </div>
          {/* <div
            style={{
              flex: 1,
            }}
          >
            <Image
              src={previewButtonStr}
              preview={false}
              onClick={() => {
                window.open('https://pro.ant.design/docs/getting-started');
              }}
            />
          </div> */}
        </div>
        <List
          style={{
            marginLeft: '30px',
            marginRight: '30px',
          }}
          grid={{
            gutter: 30,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card
                style={{
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '24px',
                  borderWidth: '0px',
                }}

              >
                <Image
                  src={item.imageStr}
                  preview={false}
                />
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    marginTop: '16px',
                  }}
                >
                  <Image
                    src={avatar01Str}
                    preview={false}
                  />
                  <div
                    style={{
                      textAlign: 'left',
                      marginLeft: '10px',
                      fontSize: '24px',
                      color: '#ffffff',
                    }}
                  >
                    乐同科技
                    <div
                      style={{
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        color: '#8393AF',
                      }}
                    >
                      Cteated by
                      <div
                        style={{
                          marginLeft: '5px',
                          color: '#ffffff',
                        }}
                      >John Doe</div>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    marginTop: '16px',
                    color: '#ffffff',
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      fontSize: '24px',
                    }}
                  >
                    <Image
                      src={likeStr}
                      preview={false}
                    />
                    <div
                      style={{
                        fontSize: '16px',
                      }}
                    >
                      145
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      fontSize: '24px',
                    }}
                  >
                    <Image
                      src={ticketsStr}
                      preview={false}
                    />
                    <div
                      style={{
                        fontSize: '16px',
                      }}
                    >
                      余票
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      fontSize: '24px',
                    }}
                  >
                    <Image
                      src={priceStr}
                      preview={false}
                    />
                    <div
                      style={{
                        fontSize: '16px',
                      }}
                    >
                      价格
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '16px',
                  }}
                >
                  <Image
                    src={beginTimeStr}
                    preview={false}
                    onClick={() => {
                      window.open('https://pro.ant.design/docs/getting-started');
                    }}
                  />
                  <Image
                    style={{
                      marginLeft: '15px',
                    }}
                    src={buyButtonStr}
                    preview={false}
                    onClick={() => {
                      window.open('https://pro.ant.design/docs/getting-started');
                    }}
                  />
                </div>
              </Card>
            </List.Item>
          )}
        >
        </List>
      </div>

      {/* <div
        style={{
          //background: '#030812',
          background: 'url(' + hotBgStr + ')',
          backgroundSize: '110%, 110%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '40% -10%',
          // backgroundClip: 'content-box',
          // backgroundImage: 'url(' + hotBgStr + ')',
          marginLeft: '15%',
          marginRight: '15%',
          // backgroundBlendMode: 'overlay',
          // backgroundPosition: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: '160px',
            marginBottom: '20px',
            // marginLeft: '15%',
            // marginRight: '15%',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              color: '#ffffff',
              flex: 1,
            }}
          >
            热门活动
          </div>
          <div
            style={{

              color: '#ffffff',
              flex: 1,
            }}
          >
            <Image
              src={previewButtonStr}
              preview={false}
              onClick={() => {
                window.open('https://pro.ant.design/docs/getting-started');
              }}
            />
          </div>
        </div>

        <List
          grid={{
            gutter: 30,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card
                style={{
                  borderRadius: '24px',
                  borderWidth: '0px',
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.2)',
                }}

              >
                <Image
                  src={item.imageStr}
                  preview={false}
                />
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    marginTop: '16px',
                  }}
                >
                  <Image
                    src={avatar01Str}
                    preview={false}
                  />
                  <div
                    style={{
                      textAlign: 'left',
                      marginLeft: '10px',
                      fontSize: '24px',
                    }}
                  >
                    举办人
                    <div
                      style={{
                        fontSize: '16px',
                      }}
                    >
                      Cteated by John Doe
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '16px',
                  }}
                >
                  <Image
                    src={beginTimeStr}
                    preview={false}
                    onClick={() => {
                      window.open('https://pro.ant.design/docs/getting-started');
                    }}
                  />
                  <Image
                    style={{
                      marginLeft: '15px',
                    }}
                    src={buyButtonStr}
                    preview={false}
                    onClick={() => {
                      window.open('https://pro.ant.design/docs/getting-started');
                    }}
                  />
                </div>
              </Card>
            </List.Item>
          )}
        >
        </List>

        <div
          style={{
            marginTop: '160px',
            fontSize: '64px',
            color: '#ffffff',
            flex: 1,
            textAlign: 'center',
          }}
        >
          热门音乐
        </div>
        <List
          style={{
            marginTop: '56px',
            // marginLeft: '15%',
            // marginRight: '15%',
          }}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card
                style={{
                  borderRadius: '24px',
                  textAlign: 'center',
                  borderWidth: '0px',
                  background: 'rgba(255, 255, 255, 0.2)',
                }}

              >
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    src={avatar01Str}
                    preview={false}
                  />
                  <div
                    style={{
                      textAlign: 'left',
                      marginLeft: '10px',
                      fontSize: '20px',
                      color: '#ffffff',
                    }}
                  >
                    John Doe
                    <div
                      style={{
                        fontSize: '16px',
                        color: '#8393AF'
                      }}
                    >
                      ETH 242.21
                    </div>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        >
        </List>
      </div> */}

      <div
        style={{
          color: '#ffffff',
          marginTop: '50px',
          marginBottom: '30px',
          textAlign: 'center',
        }}
      >
        <Image
          src={logo}
          preview={false}
        >

        </Image>
        We ara a lorem ipsum dolor sit amet, consectetur adipiscing elit, Ut enim ad minim veniam, quis nostrud equip consectetur adipiscing ex ea commodo dolor consequat
      </div>

      {/* <Card
        style={{
          borderRadius: 0,
          background: 'linear-gradient(to right bottom, #9FB1EC, #ffffff)',
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
      </Card> */}
    </PageContainer>
  );
};

export default Home;