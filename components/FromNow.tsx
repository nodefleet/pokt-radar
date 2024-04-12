"use client";

export default function FromNow({ datetime }: { datetime: string }) {
  const parsedDatetime = new Date(datetime);
  const now = new Date();
  const elapsedMilliseconds = now.getTime() - parsedDatetime.getTime();

  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);
  const elapsedMonths = Math.floor(elapsedDays / 30);

  let displayDuration;

  if (elapsedMinutes >= 2 && !elapsedHours && !elapsedDays) {
    displayDuration = `${elapsedMinutes} minutes`;
  } else if (elapsedHours && !elapsedDays) {
    displayDuration = `${elapsedHours} hours, ${elapsedMinutes % 60} minutes`;
  } else if (elapsedDays && !elapsedMonths) {
    displayDuration = `${elapsedDays} days, ${elapsedHours % 24} hours`;
  } else if (elapsedMonths) {
    displayDuration = `${elapsedMonths} months, ${elapsedDays % 30} days`;
  } else {
    displayDuration = "a few seconds";
  }

  return <>{displayDuration} ago</>;
}
