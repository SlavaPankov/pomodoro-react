export function getTimerStrTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  let secondsLeftStr = `${secondsLeft}`;
  if (secondsLeft < 10) {
    secondsLeftStr = `0${secondsLeft}`;
  }

  return `${minutes}:${secondsLeftStr}`;
}
