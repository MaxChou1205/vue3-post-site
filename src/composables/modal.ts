import {
  ref, shallowRef 
} from 'vue'
import SignupForm from '@/components/SignupForm.vue'
import LoginForm from '@/components/LoginForm.vue'

const isOpen = ref(false)
const component = shallowRef()

export const useModal = () => {
  const toggle = (type: 'signup' | 'login') => {
    isOpen.value = !isOpen.value
    if (type === 'signup') {
      component.value = SignupForm
    } else if (type === 'login') {
      component.value = LoginForm
    }
  }

  const hide = () => {
    isOpen.value = false
  }

  return {
    isOpen,
    component,
    toggle,
    hide,
  }
}