<script setup lang="ts">
import { computed, ref } from "vue";
import dayjs from "dayjs";
import { Post, today, thisMonth, thisWeek } from "@/models/post";

const periods = ["Today", "This Week", "This Month"];
const selectedPeriod = ref(periods[0]);
const posts = computed(() => {
  return [today, thisWeek, thisMonth]
    .map(post => {
      return {
        ...post,
        created: dayjs(post.created)
      };
    })
    .filter(post => {
      if (selectedPeriod.value === "Today") {
        return post.created.isSame(dayjs(), "day");
      } else if (selectedPeriod.value === "This Week") {
        return post.created.isSame(dayjs(), "week");
      } else if (selectedPeriod.value === "This Month") {
        return post.created.isSame(dayjs(), "month");
      }

      return post;
    });
});

const changePeriod = (period: string) => {
  selectedPeriod.value = period;
};
</script>

<template>
  <nav class="mt-5 px-4 py-4 shadow rounded">
    <span class="flex justify-center gap-6">
      <a
        v-for="period in periods"
        :key="period"
        class="p-1 cursor-pointer"
        :class="{ active: selectedPeriod === period }"
        @click="changePeriod(period)"
        >{{ period }}</a
      >
    </span>

    <div v-for="post in posts" :key="post.id">
      {{ post.created.format("YYYY/MM/DD") }}
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.active {
  color: #555;
  border-bottom: 2px solid #5e5e5e;
}
</style>
