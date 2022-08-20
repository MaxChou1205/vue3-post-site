import {
  ref, shallowRef 
} from 'vue'
import SignupForm from '@/components/SignupForm.vue'
import SigninForm from '@/components/SigninForm.vue'

const isOpen = ref(false)
const component = shallowRef()

export const useModal = () => {
  const toggle = (type: 'signup' | 'signin') => {
    isOpen.value = !isOpen.value
    if (type === 'signup') {
      component.value = SignupForm
    } else if (type === 'signin') {
      component.value = SigninForm
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