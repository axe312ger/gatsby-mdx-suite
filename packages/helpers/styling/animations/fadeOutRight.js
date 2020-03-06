import { css, keyframes as emotionKeyframes } from 'emotion'

const keyframes = emotionKeyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }`

const styles = css``

export default { keyframes, styles }
