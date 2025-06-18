import moment from "moment";

export const formatTime = (seconds: number) => {
  return moment.utc(seconds * 1000).format("m:ss");
};
