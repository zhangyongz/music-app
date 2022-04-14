import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(duration)
dayjs.extend(relativeTime)

export const formatSecond = (second: number) => {
  if (isNaN(second)) {
    return '00:00'
  }
  return dayjs.duration(second, "second").format('mm:ss')
}

export const formatMilliSecond = (milliSecond: number) => {
  if (isNaN(milliSecond)) {
    return '00:00'
  }
  return dayjs.duration(milliSecond, "millisecond").format('mm:ss')
}
