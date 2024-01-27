type Props = {
  date: Date;
  forceLocale?: string;
};

const DateBefore = (props: Props) => {
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - props.date.getTime()) / 1000
  );

  const rtf = new Intl.RelativeTimeFormat("cs", { numeric: "auto" });

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, "second");
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return rtf.format(-minutes, "minute");
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return rtf.format(-hours, "hour");
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return rtf.format(-days, "day");
  } else {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return props.date.toLocaleDateString("en", options);
  }
};
export default DateBefore;
