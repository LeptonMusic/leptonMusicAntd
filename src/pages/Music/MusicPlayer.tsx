import React, { Component } from 'react';
import { Button, Checkbox, Icon, List, Radio, Spin, Tooltip } from 'antd';

const MusicPlayer = () => {
  const [status, setStatus] = useState('idle');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [musicList, setMusicList] = useState([]);

  useEffect(() => {
    const musicPlayer = new Audio();
    musicPlayer.addEventListener('play', () => {
      setStatus('playing');
      setIsPlaying(true);
    });
    musicPlayer.addEventListener('pause', () => {
      setStatus('paused');
      setIsPlaying(false);
    });
    musicPlayer.addEventListener('stop', () => {
      setStatus('stopped');
      setIsPlaying(false);
    });
    musicPlayer.addEventListener('error', () => {
      setStatus('error');
    });
    return () => musicPlayer.removeEventListener('play', () => {});
  }, []);

  const handlePlay = () => {
    if (status === 'paused') {
      musicPlayer.play();
      setStatus('playing');
      setIsPlaying(true);
    } else if (status === 'stopped') {
      musicPlayer.play();
      setStatus('playing');
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (status === 'playing') {
      musicPlayer.pause();
      setStatus('paused');
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (status === 'playing') {
      musicPlayer.stop();
      setStatus('stopped');
      setIsPlaying(false);
    } else if (status === 'paused') {
      musicPlayer.stop();
      setStatus('stopped');
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (currentTrack < musicList.length - 1) {
      setCurrentTrack(currentTrack + 1);
    }
  };

  const handlePrevious = () => {
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
    }
  };

  return (
    <div>
      <List
        bordered
        dataSource={musicList}
        size="small"
        renderItem={({ item }) => (
          <List.Item key={item.id}>
            <div className="ant-list-item-content">
              <h4>{item.title}</h4>
              <p>{item.artist}</p>
            </div>
          </List.Item>
        )}
      />
      <Button onClick={handlePlay}>Play</Button>
      <Button onClick={handlePause}>Pause</Button>
      <Button onClick={handleStop}>Stop</Button>
      <Radio.Group value={status} onChange={setStatus}>
        <Radio value="idle">Idle</Radio>
        <Radio value="playing">Playing</Radio>
        <Radio value="paused">Paused</Radio>
      </Radio.Group>
      <Spin spinning={isPlaying} />
      <Tooltip title="Current Track">
        <span>{currentTrack + 1}</span>
      </Tooltip>
      <List
        bordered
        size="small"
        dataSource={[
          {
            title: 'Next',
            onClick: handleNext,
          },
          {
            title: 'Previous',
            onClick: handlePrevious,
          },
        ]}
      />
    </div>
  );
};

export default MusicPlayer;