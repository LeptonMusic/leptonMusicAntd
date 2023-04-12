import React, { Component } from 'react';
import {
  Button,
  Checkbox,
  Icon,
  List,
  Progress,
  Radio,
  Slider,
  Spin,
  theme,
  Card,
  Image,
  Tooltip,
  Divider,
  Col,
  Row,
  InputNumber,
  message
} from 'antd';
import { useModel } from '@umijs/max';
import { PageContainer } from '@ant-design/pro-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  SyncOutlined,
  ReloadOutlined,
  ForkOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from '@ant-design/icons';

import musicListenStr from '../Image/musicListen.jpg'
// import { MusicPlayer } from './MusicPlayer';
// class MusicPlayer extends Component {
//   state = {
//     isPlaying: false,
//     currentTrack: 0,
//     totalTracks: 10,
//     volume: 100,
//   };

//   handlePlay = () => {
//     this.setState(prevState => ({
//       isPlaying: !prevState.isPlaying,
//     }));
//   };

//   handleNext = () => {
//     this.setState(prevState => ({
//       currentTrack: (prevState.currentTrack + 1) % this.state.totalTracks,
//     }));
//   };

//   handlePrevious = () => {
//     this.setState(prevState => ({
//       currentTrack: (prevState.currentTrack - 1 + this.state.totalTracks) % this.state.totalTracks,
//     }));
//   };

//   handleVolumeChange = (event) => {
//     this.setState(prevState => ({
//       volume: event.target.value,
//     }));
//   };

//   render() {
//     return (
//       <div>
//         <Button onClick={this.handlePlay}>Play</Button>
//         <Button onClick={this.handleNext}>Next</Button>
//         <Button onClick={this.handlePrevious}>Previous</Button>
//         <Progress percent={this.state.isPlaying ? 100 : 0} />
//         <Slider value={this.state.volume} onChange={this.handleVolumeChange} />
//         <List>
//           {this.state.totalTracks > 0 ? (
//             [...Array(this.state.totalTracks)].map((_, index) => (
//               <List.Item key={index}>
//                 <Icon type="music" />
//                 <span>{index + 1}</span>
//               </List.Item>
//             ))
//           ) : null}
//         </List>
//       </div>
//     );
//   }
// }

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
  const [running, setRunning] = React.useState(false);
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

  // 切换歌词界面显示|隐藏
  const toggleLyricView = () => {
    // 存在播放歌曲时才允许打开歌词界面
    // if (playing && playing.id) {
    //   setLyricVisible(!lyricVisible);
    // }
  };

  // 播放|暂停图标
  const playIcon = running ? (
    <PauseCircleOutlined onClick={togglePlay} />
  ) : (
    <PlayCircleOutlined onClick={togglePlay} />
  );
  // 当前播放模式
  // const playMode = getPlayModeItem(preferences.playMode);
  // const src =
  //   playing?.url ||
  //   (playing?.id ? `http://music.163.com/song/media/outer/url?id=${playing.id}.mp3` : '');
  // const src = 'http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3'
  const src = 'http://music.163.com/song/media/outer/url?id=317151.mp3'
  return (
    
    <div
      //className={`${styles.audioController} ${lyricVisible ? styles.lyricActive : ''}`}
      //style={{ background: location.pathname === '/lyric' ? 'transparent' : '' }}
      style={{
        // display: 'flex',
        // position: 'fixed',
      }}
    >
      {/* 若播放列表长度为1, 也应设置loop=true, 否则无法自动切换 */}
      <audio
        autoPlay={running}
        // loop={playMode.value === 'loop' || playlist.length === 1}
        src={src}
        onTimeUpdate={onTimeUpdate}
        //onEnded={next}
        onError={onAudioError}
        ref={audioRef}
      >
        {/* <track kind="captions" /> */}
      </audio>
        
        <Row>
          <Col span={12}>
          <div>
        <StepBackwardOutlined style={{ fontSize: '28px' }} />
        {playIcon}
        <StepForwardOutlined style={{ fontSize: '28px' }} />
      </div>
        </Col>
        <Col span={4}>
        <Slider
          min={0}
          max={audio?.duration}
          onChange={onChange}
          step={0.01}
          value={typeof audio?.currentTime === 'number' ? audio.currentTime : 0}
          tooltip={{open: false}}
          style={{
            minWidth: '200px',
          }}
        />
      </Col>
      <Col span={6}>
        <InputNumber
          min={0}
          max={audio?.duration}
          style={{ margin: '0 16px' }}
          value={audio?.currentTime}
          onChange={onChange}
          step={1}
        />
      </Col>
      <Col>
        <div>
            <span>{currentTime}</span>
            <Divider type="vertical" />
            <span>{timeParse(audio?.duration)}</span>
          </div>
      </Col>
    </Row>

      {/* <div className="slider-wrapper">
        <div className="meta">
          <div className="name"> 
            <span onClick={toggleLyricView}>{'iMusic'}</span>
          </div>
          <div className="audio-time">
            <span>{currentTime}</span>
            <Divider type="vertical" />
            <span>{timeParse(audio?.duration)}</span>
          </div>
        </div>
        <Tooltip title={mouseoverTime}>
          <div className="slider-runway" onClick={sliderClick} onMouseMove={sliderMouseover}>
            <div className="slider-bar" style={{ transform: `translateX(-${100 - percent}%)` }} />
          </div>
        </Tooltip>
      </div> */}


      {/* <div className="control-wrapper" style={{ fontSize: '12px' }}>
        <span title={playMode.label} onClick={() => togglePlayMode(playMode.value)}>
          {playMode.icon}
        </span>
      </div> */}

      {/* <Lyric
        visible={lyricVisible}
        running={running}
        currentTime={currentTime}
        onClose={() => setLyricVisible(false)}
      /> */}
    </div>
  );
};

const data = [
  {
    title: '心雨',
    price: '50¥',
    imageStr: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    musicStr: 'http://music.163.com/song/media/outer/url?id=317151.mp3',
    duration: '04:31',
  },
  {
    title: 'I Hate U I Love U',
    price: '50¥',
    imageStr: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    musicStr: 'https://music.163.com/song/media/outer/url?id=516497142.mp3',
    duration: '03:48',
  },
  {
    title: 'Love2',
    price: '50¥',
    imageStr: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    musicStr: 'https://music.163.com/song/media/outer/url?id=2037756767.mp3',
    duration: '03:04',
  },
  {
    title: '一格格',
    price: '50¥',
    imageStr: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    musicStr: 'https://music.163.com/song/media/outer/url?id=2034166259.mp3',
    duration: '03:09',
  },
  {
    title: '絆ノ奇跡',
    price: '50¥',
    imageStr: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    musicStr: 'https://music.163.com/song/media/outer/url?id=2033848662.mp3',
    duration: '03:43',
  },
  {
    title: '别哭了吧',
    price: '50¥',
    imageStr: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    musicStr: 'https://music.163.com/song/media/outer/url?id=2035884608.mp3',
    duration: '02:34',
  },
  {
    title: '烂泥',
    price: '50¥',
    imageStr: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    musicStr: 'https://music.163.com/song/media/outer/url?id=411314656.mp3',
    duration: '02:29',
  },
  {
    title: '知足',
    price: '50¥',
    imageStr: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    musicStr: 'https://music.163.com/song/media/outer/url?id=2037926385.mp3',
    duration: '04:10',
  },
  {
    title: '山海',
    price: '50¥',
    imageStr: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    musicStr: 'https://music.163.com/song/media/outer/url?id=411314659.mp3',
    duration: '04:11',
  },
];

const Music: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  
  const { musicName, setMusicModel, addCount } = useModel('MusicModel', model => (
    {
      musicName: model.musicName,
      setMusicModel: model.setMusicModel,
      addCount: model.addCount,
    }
  ))

  const { name, count, add, minus, changeName } = useModel('counter', (ret) => ({
    name: ret.name,
    count: ret.counter,
    add: ret.increment,
    minus: ret.decrement,
    changeName: ret.changeName,
  }));

  // return (
  //   <div>
  //     <button onClick={changeName('abcd')}>change</button>
  //     <button onClick={setMusicModel('ds', 'sdddd')}>musicChange</button>
  //     <button onClick={add}>add by 1</button>
  //     {name}
  //     {count}
  //     {musicName}
  //     <button onClick={minus}>minus by 1</button>
  //   </div>
  // );

  // const musicList = [
  //   {
  //     title: 'Let It Be',
  //     artist: 'The Beatles',
  //   },
  //   {
  //     title: 'Imagine',
  //     artist: 'John Lennon',
  //   },
  //   {
  //     title: 'What a Wonderful World',
  //     artist: 'Louis Armstrong',
  //   },
  // ];

  // const randomHex = () => {
  //   let hex Math.floor
  // }

  function randomHex() {
    let hex = Math.floor(Math.random() * 0xffffff).toString(16);
    return `#${("000000" + hex).slice(-6)}`
  }

  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
    >
      <Card
        style={{
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '20px',
          flex: 1,
        }}
      >
        {/* 模仿mubert AI生成音乐的页面 */}
        The function of AI creating music is under development, so stay tuned
      </Card>
      {/* <div
        style={{
          fontSize: '28px',
          color: token.colorTextHeading,
          textAlign: 'center',
          marginBottom: '30px',
      }}
      >
        Listen to Earn
      </div> */}
      <Card
        style={{
          borderRadius: 0,
          //backgroundImage: "url('https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg')",
          //background: 'linear-gradient(to right bottom, #f00, #00f)',
          height: '80%',
          textAlign: 'center',
          marginBottom: '80px',
        }}
        bordered={false}
      >
      <div
          style={{
             display: 'flex',
            // display: 'flex: 1 2 auto',
            flexWrap: 'wrap',
            // marginTop: 40,
            // marginBottom: 20,
            alignItems: 'center'
          }}
        >
      <div>
        <Image
          src={musicListenStr}
          preview={false}
          style={{
            width: '300px',
          }}
        >
        </Image>
      </div>
      
      <List
        // grid={{
        //   gutter: 16,
        //   xs: 1,
        //   sm: 2,
        //   md: 4,
        //   lg: 4,
        //   xl: 6,
        //   xxl: 6,
        // }}
        style={{
          marginLeft: '50px',
          flex: 1,
        }}
        // itemLayout='horizontal'
        dataSource={data}
        renderItem={(item) => (
        <List.Item
          onClick={() => {
            // window.open('https://pro.ant.design/docs/getting-started');
            setMusicModel(item.title, item.musicStr);
            // addCount;
          }}
        >
          <div
            // style={{
            //   marginLeft: '50px',
            // }}
          >
            <Image
              width={40}
              height={40}
              // src={item.imageStr}
              preview={false}
              style={{
                //background: '#1890ff',
                background: randomHex(),
              }}
              // preview={{
              //   src: 'https://zos.alipayobjects.com/rmsportal/EkXWVvAaFJKCzhMmQYiX.png',
              // }}
            />
          </div>
          <div>
            {item.title}
          </div>
          <div>
            {item.duration}
          </div>
          
          {/* <div>
            {item.price}
          </div> */}
        </List.Item>
        )}
      />
      </div>
      </Card>
    </PageContainer>
    // <PageContainer>
    //   音乐
      
    //   <audio src="http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3" autoPlay></audio>
    // </PageContainer>
  );
};
export default Music;