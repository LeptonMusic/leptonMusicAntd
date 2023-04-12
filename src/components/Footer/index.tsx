import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter, ProCard } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Button, Card, Slider, Divider, message } from 'antd';
import React from 'react';
import {
  SyncOutlined,
  ReloadOutlined,
  ForkOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from '@ant-design/icons';

import { useModel } from '@umijs/max';

// 时间一位数时加0
function pad(val) {
  const sVal = Math.floor(val); // 舍弃毫秒
  if (sVal < 10) return `0${sVal}`;
  return Number.isNaN(sVal) ? '00' : sVal.toString();
}

// 时间格式化为xx:xx
function timeParse(sec) {
  const min = Math.floor(sec / 60);
  const secVal = sec - min * 60;
  return `${pad(min)}:${pad(secVal)}`;
}

const Audio = () => {
  //const location = useLocation();
  // const preferences = useSelector((state) => state.preferences);
  // const player = useSelector((state) => state.player);

  // const { playing, playlist } = player;

  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { current: audio } = audioRef;

  // 是否播放中
  const [running, setRunning] = React.useState(true);
  // 播放进度百分比
  const [percent, setPercent] = React.useState(0);
  // 当前播放时间
  const [currentTime, setCurrentTime] = React.useState('00:00');
  // 鼠标悬浮时间
  const [mouseoverTime, setMouseoverTime] = React.useState('00:00');
  // 歌词界面是否可见
  const [lyricVisible, setLyricVisible] = React.useState(false);

  // 播放/暂停
  const togglePlay = () => {
    // error.code: 1.用户终止 2.网络错误 3.解码错误 4.URL无效
    if (audio?.error) return;
    const newStatus = !running;
    setRunning(newStatus);
    // console.log(timeParse(audio?.duration), timeParse(audio?.currentTime));
    if (newStatus) {
      audio?.play();
    } else {
      audio?.pause();
    }
  };

  /**
   * 监听播放进度的改变
   */
  const onTimeUpdate = () => {
    // console.log('onTimeUpdate');
    const newTime = timeParse(audio?.currentTime);
    const newPercent = parseInt((audio?.currentTime / audio?.duration) * 10000, 10) / 100;
    setCurrentTime(newTime);
    setPercent(newPercent);
  };

  const onAudioError = (e) => {
    console.log('onAudioError', e);
    if (running) {

      message.warning('当前歌曲无法播放, 即将播放下一首');
      setRunning(false);
      setTimeout(() => next(), 1500);
    }
  };

  /**
   * 根据进度条百分比设置当前播放时间
   * @param  {Number} percent 百分比值
   * @return {Number}
   */
  const getCurrentTimeByPercent = (percent) => {
    return Math.floor(percent * (audio?.duration || 0));
  };

  /**
   * 根据进度条百分比设置当前播放时间
   * @param  {Number} percent 百分比值
   */
  const setCurrentTimeByPercent = (percent) => {
    if (audio) {
      audio.currentTime = getCurrentTimeByPercent(percent);
    }
  };

  /**
   * 进度条点击
   */
  const sliderClick = (e: number) => {
    console.log('sliderClick', e);
    const { offsetX } = e.nativeEvent;
    const { offsetWidth } = e.target;
    setCurrentTimeByPercent(offsetX / offsetWidth);
  };

  /**
   * 进度条悬浮
   */
  const sliderMouseover = (e) => {
    const { offsetX } = e.nativeEvent;
    const { offsetWidth } = e.target;
    const percent = offsetX / offsetWidth;
    const time = timeParse(getCurrentTimeByPercent(percent));
    setMouseoverTime(time);
  };

  const [inputValue, setInputValue] = React.useState(1);

  const onChange = (newValue: number) => {
    setInputValue(newValue);
    if (audio) {
      audio.currentTime = newValue;
    }
  };

  /**
   * 接收到新的播放歌曲, 重置播放进度为初始化状态, 并播放
   */
  // React.useEffect(() => {
  //   if (playing?.id) {
  //     setRunning(true);
  //     setPercent(0);
  //     setCurrentTime('00:00');
  //     setCurrentTimeByPercent(0);
  //   }
  // }, [playing]);

  // React.useEffect(() => {
  //   // 监听播放暂停
  //   call.rendererOn('toggle-play', togglePlay);
  // }, []);

  // 播放|暂停图标
  const playIcon = running ? (
    <PauseCircleOutlined onClick={togglePlay} style={{ fontSize: '28px' }} />
  ) : (
    <PlayCircleOutlined onClick={togglePlay} style={{ fontSize: '28px' }} />
  );

  const { musicName, musicUrl } = useModel('MusicModel', model => (
    {
      musicName: model.musicName,
      musicUrl: model.url,
    }
  ))

  // const src = 'http://music.163.com/song/media/outer/url?id=317151.mp3'
  // const src = 'https://music.163.com/song/media/outer/url?id=2033848662.mp3'
  // const src = {musicUrl}
  return (
    <ProCard 
      layout="center" 
      bordered={false}
      direction='row'
        bodyStyle={{
          // backgroundColor: '#1890ff',
          //background: 'linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)',
          background: 'linear-gradient(to right bottom, #9FB1EC, #ffffff)'
          //background: '#1890ff',
        }}
        style={{
          borderRadius: 0,
          position: 'fixed',
          right: '0px',
          left: '0px',
          bottom: '0px',
          // backgroundImage: "url('https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg')",
          //backgroundColor: 'linear-gradient(to right, #333, #fff)',
        }}
      >
        <audio
        autoPlay={true}
        // loop={playMode.value === 'loop' || playlist.length === 1}
        src={musicUrl}
        onTimeUpdate={onTimeUpdate}
        //onEnded={next}
        onError={onAudioError}
        ref={audioRef}
      >
      </audio>
    
      <div
        style={{
          marginLeft: '30px',
          width: '50px',
        }}
      >
        {/* <StepBackwardOutlined style={{ fontSize: '28px' }} /> */}
        {playIcon}
        {/* <StepForwardOutlined style={{ fontSize: '28px' }} /> */}
      </div>
      <div
        style={{
          marginLeft: '30px',
          fontSize: '24px',
        }}
      >
        {musicName}
      </div>
      <Slider
          min={0}
          max={audio?.duration}
          onChange={onChange}
          step={0.01}
          value={typeof audio?.currentTime === 'number' ? audio.currentTime : 0}
          tooltip={{open: false}}
          style={{
            //minWidth: '200px',
            marginLeft: '50px',
            marginRight: '30px',
            flex: 1,
          }}
        />
        <div
          style={{
            marginRight: '20px',
          }}
        >
            <span>{currentTime}</span>
            <Divider type="vertical" />
            <span>{timeParse(audio?.duration)}</span>
          </div>
     
    </ProCard>
  );
};

// const { initialState, setInitialState } =  useModel('@@initialState');

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    // defaultMessage: '蚂蚁集团体验技术部出品',
    defaultMessage: '',
  });
  
  const currentYear = new Date().getFullYear();

  const { musicName, setMusicModel } = useModel('MusicModel', model => (
    {
      musicName: model.musicName,
    }
  ))
  if (musicName) {
    return (
      <Audio  
      >

      </Audio>
    );
  } else {
    return (
      // <Card
      //   style={{
      //     position: 'fixed',
          // right: '0px',
          // left: '0px',
          // bottom: '0px',
      //     textAlign: 'center',
      //     background: '#deo23o',
      //     height: 80,
      //   }}
      // >
      //   <div
      //   // style={{
      //   //   position: 'fixed',
      //   //   bottom: '0px',
      //   //   textAlign: 'center',
      //   //   background: '#deo23o',
      //   //   height: 300,
      //   // }}
      // >
      //   音乐播放
      // </div>
      // </Card>
      
      <div>
        
      </div>

    )
  }
  // return (
  //   <DefaultFooter
  //     style={{
  //       background: 'none',
  //     }}
  //     copyright={`${currentYear} ${defaultMessage}`}
  //     links={[
  //       {
  //         key: 'Lepton Music',
  //         title: 'Lepton Music',
  //         href: 'https://pro.ant.design',
  //         blankTarget: true,
  //       },
  //       {
  //         key: 'github',
  //         title: <GithubOutlined />,
  //         href: 'https://github.com/ant-design/ant-design-pro',
  //         blankTarget: true,
  //       },
  //       {
  //         key: 'Ant Design',
  //         title: 'Ant Design',
  //         href: 'https://ant.design',
  //         blankTarget: true,
  //       },
  //     ]}
  //   />
  // );
};



export default Footer;
