<script lang="ts" setup>
  const props = defineProps({
    isLoading: Boolean,
  })

  const { isLoading } = toRefs(props)
</script>

<template>
  <div>
    <div>
      <button
        type="button"
        class="flex items-center justify-center w-full p-3 border border-gray-700 hover:text-gray-500"
      >
        <img
          class="w-6 mr-4"
          src="../../assets/images/facebook-signin.png"
          alt="google sign in"
        />
        <p v-if="isLoading" class="text-gray-600">Loading...</p>
        <p v-else class="font-semibold">Facebook</p>
      </button>
    </div>
  </div>
</template>
