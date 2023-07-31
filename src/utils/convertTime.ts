import { getNoun } from './getNoun';
import { EConvertTypeMode } from '../types/EConverTypeMode';

export function convertTime(time: number, mode?: EConvertTypeMode) {
  const hours = (time / 3600);
  const roundHours = Math.floor(hours);
  const minutes = (hours - roundHours) * 60;
  const roundMinutes = Math.round(minutes);
  if (!roundHours) {
    if (mode === EConvertTypeMode.short) {
      return `${roundMinutes} ${getNoun(roundMinutes, 'мин', 'мин', 'мин')}`;
    }
    return `${roundMinutes} ${getNoun(roundMinutes, 'минута', 'минуты', 'минут')}`;
  }

  if (!roundMinutes) {
    if (mode === EConvertTypeMode.short) {
      return `${roundHours} ${getNoun(roundHours, 'ч', 'ч', 'ч')}`;
    }
    return `${roundHours} ${getNoun(roundHours, 'час', 'часа', 'часов')}`;
  }

  if (mode === EConvertTypeMode.short) {
    return `${roundHours} ${getNoun(roundHours, 'ч', 'ч', 'ч')} и ${roundMinutes} ${getNoun(roundMinutes, 'мин', 'мин', 'мин')}`;
  }

  return `${roundHours} ${getNoun(roundHours, 'час', 'часа', 'часов')} и ${roundMinutes} ${getNoun(roundMinutes, 'минута', 'минуты', 'минут')}`;
}
