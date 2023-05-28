import React, { useState } from 'react'
import { useModel, history } from '@umijs/max';
import { Conflux, Wallet } from 'js-conflux-sdk';
import { message, Modal, Image, Button } from 'antd';

import { LEPTON_NFT_ABI, LEPTON_NFT_ADDRESS } from '../../../config/leptonNFT';

import boxCloseStr from '../Image/treasureChest01.png'
import boxOpenedStr from '../Image/treasureChest03.png'
import boxGifStr from '../Image/treasureChestGif.gif'
import boxNullStr from '../Image/treasureChest02.png'

const TreasureChest: React.FC = ({

}) => {

  const { initialState } = useModel('@@initialState');

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
      setIsModalOpen(true)
      setBoxAnimationBg(boxNullStr)
      setIsOpenBtnDisabled(false)
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
    // //交易
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
      setBoxAnimationBg(boxOpenedStr)
      setIsOpenBtnDisabled(false)
      setIsModalOpen(true)
    } catch (error) {
      message.error('抽奖系统异常')
      setBoxAnimationBg(boxCloseStr)
      setIsOpenBtnDisabled(false)
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
    setBoxAnimationBg(boxCloseStr)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setBoxAnimationBg(boxCloseStr)
  };

  //宝箱动画背景
  const [boxAnimationBg, setBoxAnimationBg] = useState(boxCloseStr)
  //宝箱按钮失效
  const [isOpenBtnDisabled, setIsOpenBtnDisabled] = useState(false)

  return (
    <div
    >
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

      <Image
        src={boxAnimationBg}
        preview={false}
      ></Image>
      <div>
        <Button
          style={{
            background: '#ffffff'
          }}
          disabled={isOpenBtnDisabled}
          onClick={() => {
            if (!initialState?.currentUser?.userid) {
              //未登录
              message.warning('未登录钱包账号！请先登录')
            } else {
              setIsOpenBtnDisabled(true)
              setBoxAnimationBg(boxGifStr)
              mintNFT()
            }
          }}
        >开盲盒</Button>
      </div>
    </div>

  );
};

export default TreasureChest;

