<script setup lang="ts">
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
          class="w-10 mr-4"
          src="@/assets/images/google-signin.jpeg"
          alt="google sign in"
        />
        <p v-if="isLoading">Loading...</p>
        <p v-else class="font-semibold">Google</p>
      </button>
    </div>
  </div>
</template>
