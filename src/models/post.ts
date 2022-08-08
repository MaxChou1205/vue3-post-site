import dayjs from "../models/dayjs";

export interface IPost {
  id: string,
  title: string,
  created: string
}

export interface TimelinePost extends Omit<IPost, 'created'> {
  created: dayjs.Dayjs
}

export const today: IPost = {
  id: "1",
  title: "Today",
  created: dayjs().toISOString(),
}

export const thisWeek: IPost = {
  id: "2",
  title: "This Week",
  created: dayjs().startOf('isoWeek').toISOString(),
}

export const thisMonth: IPost = {
  id: "3",
  title: "This Month",
  created: dayjs().startOf('month').toISOString(),
}