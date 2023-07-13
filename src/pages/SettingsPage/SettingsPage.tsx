import React from 'react';
import { Content } from '../../shared/Content';
import { SettingTitle } from '../../shared/SettingsTitle';
import { Sliders } from '../../shared/Sliders';
import { Switches } from '../../shared/Switches';

export function SettingsPage() {
  return (
    <Content>
      <SettingTitle />
      <Sliders />
      <Switches />
    </Content>
  );
}
