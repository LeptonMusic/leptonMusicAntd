import React, { useState, useRef } from 'react'
import { LuckyWheel, LuckyGrid } from '@lucky-canvas/react'
import { useModel, history } from '@umijs/max';
import { Conflux, Wallet } from 'js-conflux-sdk';
import { message, Modal, Image, Button } from 'antd';

import { LEPTON_NFT_ABI, LEPTON_NFT_ADDRESS } from '../../../config/leptonNFT';
import boxLockStr from '../Image/boxLock.png'
import boxOpenStr from '../Image/boxOpen.png'
import startStr from '../Image/startBg.png'
const BlindBox: React.FC = ({

}) => {

  const { initialState } = useModel('@@initialState');

  const [blocks] = useState([
    { padding: '10px', background: '#869cfa' },
  ])

  const prizeImg = {
    // src: 'https://unpkg.com/buuing@0.0.1/imgs/lucky-canvas.png',
    src: boxLockStr,
    activeSrc: boxOpenStr,
    width: '40%',
    top: '25%'
  }

  const buttonImg = {
    src: startStr,
     width: '100%',
    // top: '10%'
  }

  const [prizes] = useState([
    { background: '#e9e8fe', fonts: [{ text: '0' }] },
    { background: '#b8c5f2', fonts: [{ text: '1' }] },
    { background: '#e9e8fe', fonts: [{ text: '2' }] },
    { background: '#b8c5f2', fonts: [{ text: '3' }] },
    { background: '#e9e8fe', fonts: [{ text: '4' }] },
    { fonts: [{ text: '5' }], imgs: [prizeImg] },
  ])
  const [buttons] = useState([
    { radius: '40%', background: '#617df2' },
    { radius: '35%', background: '#afc8ff' },
    {
      radius: '30%', background: '#869cfa',
      pointer: true,
      fonts: [{ text: '开始', top: '-10px' }]
    }
  ])
  const myLucky = useRef()

  //九宫格
  const [gridPrizes] = useState([
    { background: '#e9e8fe', x: 0, y: 0, imgs: [prizeImg] },
    { background: '#e9e8fe', x: 1, y: 0, imgs: [prizeImg] },
    { background: '#e9e8fe', x: 2, y: 0, imgs: [prizeImg] },
    { background: '#e9e8fe', x: 2, y: 1, imgs: [prizeImg] },
    { background: '#e9e8fe', x: 2, y: 2, imgs: [prizeImg] },
    { background: '#e9e8fe', x: 1, y: 2, imgs: [prizeImg] },
    { background: '#e9e8fe', x: 0, y: 2, imgs: [prizeImg] },
    { background: '#e9e8fe', x: 0, y: 1, imgs: [prizeImg] },
  ])
  const [gridButtons] = useState([
    {
      x: 1, y: 1,
      // fonts: [{ text: '开始', top: '35%' }]
      imgs: [buttonImg]
    },

  ])

  const [lotteryIofo, setLotteryInfo] = useState('')
  const [lotteryPicUrl, setLotteryPicUrl] = useState('')
  const conflux = new Conflux({
    url: 'https://test.confluxrpc.com',
    networkId: 1,
  });
  //铸造NFT
  const mintNFT = async () => {


    // https://orange-frozen-panda-426.mypinata.cloud/ipfs/QmdQq6Y55LTegLXuw4j2MoLZz8MaaA5shvWEcQnFkfHFPo
    // https://orange-frozen-panda-426.mypinata.cloud/ipfs/Qmag1dFJWoKnJVEHWKjyDxq8EigcySioEN9FJC5vURRR7Q
    // https://orange-frozen-panda-426.mypinata.cloud/ipfs/Qmavx8wCzZoDv336yy3ze7szPHjuq9UQeMWAMSK1pum9rs

    const currentAddress = initialState?.currentUser?.userid
    //合约
    const contract = conflux.Contract({ 'abi': LEPTON_NFT_ABI, address: "cfxtest:achgn4jmjwb5anzeah4y733cun7h4fg9eap60syemm" });
    //公用账号
    const account = conflux.wallet.addPrivateKey('0x7b685c833c2f8bd76905c1717a00e9b1b9c02cfba4c8f9ec5293238fc4e3afa0');

    const index = Math.random() * 8 >> 0
    console.log(index)

    let msg = ''
    let picUrl = ''
    if (index <= 1) {
      msg = '恭喜抽到大奖员工1'
      picUrl = 'https://orange-frozen-panda-426.mypinata.cloud/ipfs/QmdQq6Y55LTegLXuw4j2MoLZz8MaaA5shvWEcQnFkfHFPo'
    } else if (index > 1 && index <= 3) {
      msg = '恭喜抽到大奖员工2'
      picUrl = 'https://orange-frozen-panda-426.mypinata.cloud/ipfs/Qmag1dFJWoKnJVEHWKjyDxq8EigcySioEN9FJC5vURRR7Q'
    } else if (index > 3 && index < 5) {
      msg = '恭喜抽到大奖员工3'
      picUrl = 'https://orange-frozen-panda-426.mypinata.cloud/ipfs/Qmavx8wCzZoDv336yy3ze7szPHjuq9UQeMWAMSK1pum9rs'
    } else {
      msg = '很遗憾，什么都没中'
      setLotteryInfo(msg)
      myLucky.current.stop(index)
      return
    }
    setLotteryInfo(msg)
    setLotteryPicUrl(picUrl)
    //铸造
    let tokenId = await contract.mint(0, picUrl, 'test')
    const mintReceipt = await contract.mint(0, picUrl, 'test')
      .sendTransaction({
        from: account,
      });
    console.log(tokenId);
    //交易
    await waitTime(3000)
    try {
      console.log(currentAddress)
      let receipt = await contract.safeTransferFrom(
        'cfxtest:aapzpg1jcdymxepvjcagmpt7wndtaezbaj82dp4988',
        currentAddress,
        Number(tokenId),
      ).sendTransaction({
        from: account,
      });
      console.log(receipt);
      myLucky.current.stop(index)
    } catch (error) {
      message.error('抽奖系统异常')
    }
  }

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (

    <div
    >
      {/* <LuckyWheel
        ref={myLucky}
        width="300px"
        height="300px"
        blocks={blocks}
        prizes={prizes}
        buttons={buttons}
        onStart={() => { // 点击抽奖按钮会触发star回调
          myLucky.current.play()
          setTimeout(() => {
            const index = Math.random() * 6 >> 0
            myLucky.current.stop(index)
          }, 2500)
        }}
        onEnd={prize => { // 抽奖结束会触发end回调
          alert('恭喜你抽到 ' + prize.fonts[0].text + ' 号奖品')
        }}
      /> */}

      <Modal title="盲盒开启结果" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div
          style={{
            textAlign: 'center',
          }}
        >
          {lotteryIofo}
          <Image
            style={{
              marginTop: '5px',
            }}
            src={lotteryPicUrl}
            preview={false}
          />
        </div>
      </Modal>

      <LuckyGrid
        ref={myLucky}
        width="300px"
        height="300px"
        blocks={blocks}
        prizes={gridPrizes}
        buttons={gridButtons}
        onStart={() => { // 点击抽奖按钮会触发star回调
          if (!initialState?.currentUser?.userid) {
            //未登录
            message.warning('未登录钱包账号！请先登录')
          } else {
            myLucky.current.play()
            mintNFT()
          }

        }}
        onEnd={prize => { // 抽奖结束会触发end回调
          setIsModalOpen(true)
        }}
      />
    </div>

  );
};

export default BlindBox;
