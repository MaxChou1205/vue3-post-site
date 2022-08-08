import { defineStore } from "pinia"
import dayjs from "dayjs";
import { IPost, today, thisWeek, thisMonth, TimelinePost } from "@/models/post"
import { Period } from "@/models/constants"


export const usePosts = defineStore("posts", {
  state: (): IState => ({
    ids: [today.id, thisWeek.id, thisMonth.id],
    content: new Map([[today.id, today], [thisWeek.id, thisWeek], [thisMonth.id, thisMonth]]),
    selectedPeriod: "Today",
  }),
  getters: {
    filteredPosts: (state: IState): TimelinePost[] => {
      return state.ids
        .map(id => {
          const post = state.content.get(id);

          if (!post) throw Error(`post ${id} not found`);

          return {
            ...post,
            created: dayjs(post.created)
          };
        })
        .filter(post => {
          if (state.selectedPeriod === "Today") {
            return post.created.isSame(dayjs(), "day");
          }
          if (state.selectedPeriod === "This Week") {
            return post.created.isSame(dayjs(), "week");
          }
          if (state.selectedPeriod === "This Month") {
            return post.created.isSame(dayjs(), "month");
          }

          return post;
        });
    }
  },
  actions: {
    setSelectedPeriod(periods: Period) {
      this.selectedPeriod = periods;
    }
  }
})

interface IState {
  ids: string[],
  // content: Record<string, Post>
  content: Map<string, IPost>,
  selectedPeriod: Period
}