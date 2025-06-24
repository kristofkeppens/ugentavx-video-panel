import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import VideoPlayer from "./VideoJsPlayer";

// styles
import 'video.js/dist/video-js.css';

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id, replaceVariables }) => {
  const styles = useStyles2(getStyles);

  if ( options.autoplay === true ) {
    options.autoplay = 'muted';
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <VideoPlayer 
        url={options.url}
        videoType={options.videoType}
        autoplay={options.autoplay}
      />
    </div>
  );
};
