<script setup lang="ts">
  import { useRoute, useRouter } from "vue-router"
  import { ref } from "vue"
  import GoogleSignIn from "@/components/social-login/GoogleSignIn.vue"
  import FacebookSignIn from "@/components/social-login/FacebookSignIn.vue"

  const currentUser = useSupabaseUser()
  const client = useSupabaseClient()

  const route = useRoute()
  const router = useRouter()

  const login = route.name === "login"

  const inputType = ref("password")
  const email = ref("")
  const password = ref("")
  const isLoading = ref(false)
  const errorMsg = ref("")

  // Show or hide password
  const togglePassword = () => {
    if (inputType.value === "password") {
      return (inputType.value = "text")
    } else {
      return (inputType.value = "password")
    }
  }

  // oAuth provider login
  const loginWithProvider = async (provider: "google" | "facebook") => {
    try {
      isLoading.value = true
      const { user, error } = await client.auth.signIn({ provider })
      if (error) throw error
      isLoading.value = false
    } catch (error) {
      errorMsg.value = error.message
      isLoading.value = false
    }
  }

  const handleLogin = async () => {
    try {
      isLoading.value = true
      const { error } = await client.auth.signIn({
        email: email.value,
        password: password.value,
      })

      if (error) throw error
      isLoading.value = false
      router.push("/")
    } catch (error) {
      console.log(error)
      errorMsg.value = error.message
      isLoading.value = false
    }
  }

  watchEffect(() => {
    if (currentUser.value) {
      navigateTo("/")
    }
  })
</script>

<template>
  <div class="min-h-screen px-4 dark:bg-at-dark-primary">
    <div
      class="max-w-lg p-8 mx-auto bg-white rounded-lg shadow-lg dark:bg-at-dark-secondary"
    >
      <div class="flex justify-between">
        <h2
          v-if="login"
          v-bind:class="{ active: login }"
          class="font-semibold tracking-wider uppercase border-b-4"
        >
          Sign in
        </h2>
        <router-link
          v-else
          v-bind:class="{ active: login }"
          class="font-semibold tracking-wider uppercase border-b-4"
          to="/login"
          >Sign in</router-link
        >
        <div class="border-r-4"></div>
        <router-link
          class="font-semibold tracking-wider uppercase border-b-4"
          to=" /signup"
          >Register</router-link
        >
      </div>
      <div class="pt-10 md:px-10">
        <div v-if="errorMsg" class="py-3 mb-4 bg-gray-100">
          <p class="text-center text-red-500">
            {{ errorMsg }}
          </p>
        </div>
        <form @submit.prevent="handleLogin">
          <div class="flex flex-col mb-6">
            <label
              class="mb-3 font-semibold tracking-wider text-gray-600 uppercase"
              for="email"
              >Email address:</label
            >
            <input
              v-model="email"
              class="py-3 dark:bg-at-dark-secondary"
              type="text"
            />
          </div>
          <div class="flex flex-col">
            <label
              class="mb-3 font-semibold tracking-wider text-gray-600 uppercase"
              for="password"
              >Password:</label
            >
            <div class="relative">
              <input v-model="password" class="w-full py-3" :type="inputType" />
              <button
                v-if="password"
                type="button"
                @click="togglePassword"
                class="absolute tracking-wider text-gray-600 right-2 top-3"
              >
                <span v-if="inputType === 'text'">HIDE</span>
                <span v-else>SHOW</span>
              </button>
            </div>
          </div>
          <button
            class="w-full py-3 mt-5 font-semibold tracking-widest uppercase bg-gray-700 text-gray-50 dark:text-gray-300"
          >
            <span>{{ isLoading ? "Loading..." : "Sign in" }}</span>
          </button>
          <router-link class="block pt-4 mb-3 text-center" to="/"
            >Forgot password?</router-link
          >
          <div class="py-6">
            <OrDivider class="mb-10" />
            <div class="flex items-center space-x-2">
              <GoogleSignIn
                :isLoading="isLoading"
                class="w-full"
                @click="loginWithProvider('google')"
              />
              <FacebookSignIn
                class="w-full"
                :isLoading="isLoading"
                @click="loginWithProvider('facebook')"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .active {
    border-bottom: 4px solid #0770cf !important;
  }

  input[type="password"] {
    letter-spacing: 0.3em;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 18px;
    color: #374151;
  }
</style>
