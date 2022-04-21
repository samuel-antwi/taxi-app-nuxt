import { ref } from "vue"

const showModal = ref(false)

const toggleModal = () => {
  showModal.value = !showModal.value
}

export const useModal = () => {
  return { showModal, toggleModal }
}
