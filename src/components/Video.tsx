import { VideoHTMLAttributes } from 'react';
import VideoWrapper from './styles';

const Video: React.FC<VideoHTMLAttributes<HTMLVideoElement>> = (props) => {
  return (
    <VideoWrapper>
      <video
        width="560"
        height="315"
        controls
        {...props}
      ></video>
    </VideoWrapper>
  );
};

export default Video;