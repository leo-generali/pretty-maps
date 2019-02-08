export const roundToTwo = (num) => +(Math.round(num + 'e+2') + 'e-2');

export const secondsToHHMMSS = (activitySeconds) => {
  console.log(activitySeconds);

  const hours = Math.floor(activitySeconds / 3600);
  const minutes = Math.floor((activitySeconds % 3600) / 60);
  const seconds = Math.floor((activitySeconds % 3600) % 60);

  const hDisplay = hours > 0 ? `${hours}:` : '';
  const mDisplay = minutes > 0 ? minutes : '';
  const sDisplay = seconds > 0 ? seconds : '';
  return `${hDisplay}${mDisplay}:${sDisplay}`;
};