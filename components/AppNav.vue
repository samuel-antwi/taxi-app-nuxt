<script lang="ts" setup>
  const user = useSupabaseUser()
  const client = useSupabaseClient()
  const router = useRouter()

  const signOut = async () => {
    await client.auth.signOut()
    router.push("/login")
  }
</script>

<template>
  <div class="py-4 text-gray-100 bg-gray-800">
    <div class="nav-wrapper">
      <nuxt-link to="/">Home</nuxt-link>
      <div class="flex items-center justify-between space-x-4">
        <nuxt-link to="/about">About</nuxt-link>
        <nuxt-link to="/products">Products</nuxt-link>
        <button @click="signOut" v-if="user">Log Out</button>
        <nuxt-link v-else to="/login">Login</nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .nav-wrapper {
    @apply flex items-center justify-between max-w-5xl px-4 mx-auto;
  }
</style>
