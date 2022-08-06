import dayjs from "@/models/dayjs";

export interface Post {
  id: string,
  title: string,
  created: string
}

export interface TimelinePost extends Omit<Post, 'created'> {
  created: dayjs.Dayjs
}

export const today: Post = {
  id: "1",
  title: "Today",
  created: dayjs().toISOString(),
}

export const thisWeek: Post = {
  id: "2",
  title: "This Week",
  created: dayjs().startOf('isoWeek').toISOString(),
}

export const thisMonth: Post = {
  id: "3",
  title: "This Month",
  created: dayjs().startOf('month').toISOString(),
}