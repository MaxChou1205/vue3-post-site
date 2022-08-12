import { ref } from 'vue'

const isOpen = ref(false)

export const useModal = () => {
  const toggle = () => {
    isOpen.value = !isOpen.value
  }
  return {
    isOpen,
    toggle,
  }
}