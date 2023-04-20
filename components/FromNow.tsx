"use client";

import { parseISO, intervalToDuration, formatDuration } from "date-fns";

export default function FromNow({ datetime }: { datetime: string }) {
  const duration = intervalToDuration({
    start: parseISO(datetime),
    end: new Date(),
  });

  let displayDuration;
  if (
    duration.minutes &&
    duration.minutes >= 2 &&
    !(duration.hours || duration.days)
  ) {
    displayDuration = formatDuration(duration, {
      format: ["minutes"],
    });
  } else if (duration.hours && !duration.days) {
    displayDuration = formatDuration(duration, {
      format: ["hours", "minutes"],
    });
  } else if (duration.days && !duration.months) {
    displayDuration = formatDuration(duration, {
      format: ["days", "hours"],
    });
  } else if (duration.months) {
    displayDuration = formatDuration(duration, {
      format: ["months", "days"],
    });
  } else {
    displayDuration = formatDuration(duration);
  }
  return <>{displayDuration} ago</>;
}
