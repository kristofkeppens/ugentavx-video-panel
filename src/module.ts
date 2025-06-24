import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'url',
      name: 'Livestream url',
      description: 'Url for the HLS livestream',
      defaultValue: 'https://localhost/',
    })
    .addTextInput({
      path: 'videoType',
      name: 'videotype',
      description: 'video type',
      defaultValue: 'application/x-mpegURL',
    })
    .addBooleanSwitch({
      path: 'autoplay',
      name: 'Autoplay livestream on load',
      defaultValue: true,
    });
});
