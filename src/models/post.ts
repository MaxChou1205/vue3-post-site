import dayjs from '../models/dayjs'

export interface IPost {
  id: string
  title: string
  created: string
  markdown: string
  html: string
  authorId: string
}

export interface TimelinePost extends Omit<IPost, 'created'> {
  created: dayjs.Dayjs
}

export const today: IPost = {
  id: '1',
  title: 'Today',
  created: dayjs().toISOString(),
  markdown: '',
  html: '',
  authorId: '-1',
}

export const thisWeek: IPost = {
  id: '2',
  title: 'This Week',
  created: dayjs().startOf('isoWeek').toISOString(),
  markdown: '',
  html: '',
  authorId: '-1',
}

export const thisMonth: IPost = {
  id: '3',
  title: 'This Month',
  created: dayjs().startOf('month').toISOString(),
  markdown: '',
  html: '',
  authorId: '-1',
}