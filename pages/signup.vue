}
<script setup lang="ts">
  import { reactive, ref } from "vue"

  const client = useSupabaseClient()

  const user = reactive({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  })

  const currentUser = useSupabaseUser()

  let isLoading = ref(false)
  let errorMsg = ref("")

  const route = useRoute()
  const router = useRouter()
  const signup = route.name === "signup"

  const updateUserProfile = async (update: object) => {
    try {
      let { error } = await client.from("profiles").upsert(update)
      if (error) {
        throw error
      }
    } catch (error) {
      console.log(error)
      errorMsg.value = error.message
    }
  }

  const handleRegister = async () => {
    try {
      isLoading.value = true
      const { error } = await client.auth.signUp({
        email: user.email,
        password: user.password,
      })

      if (error) throw error
      isLoading.value = false

      const update = {
        id: currentUser.value.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
      }
      await updateUserProfile(update)
      router.push({ name: "home" })
    } catch (error) {
      console.log(error)
      errorMsg.value = error.message
      isLoading.value = false
    }
  }
</script>

<template>
  <div class="min-h-screen dark:bg-at-dark-primary">
    <div class="signup-content">
      <div class="flex justify-between">
        <router-link
          class="font-semibold tracking-wider uppercase border-b-4"
          :to="{ name: 'login' }"
          >Sign in</router-link
        >
        <div class="border-r-4"></div>
        <h3
          v-if="signup"
          v-bind:class="{ active: signup }"
          class="font-semibold tracking-wider uppercase border-b-4"
        >
          Sign Up
        </h3>
        <router-link
          v-else
          v-bind:class="{ active: signup }"
          class="font-semibold tracking-wider uppercase border-b-4"
          :to="{ name: 'register' }"
          >Register</router-link
        >
      </div>
      <div class="pt-10 md:px-10">
        <div v-if="errorMsg" class="py-3 mb-4 bg-gray-100">
          <p class="text-center text-red-500">
            {{ errorMsg }}
          </p>
        </div>
        <form @submit.prevent="handleRegister">
          <div class="flex flex-col mb-6">
            <label
              class="mb-2 font-semibold tracking-wider text-gray-600 uppercase"
              for="first name"
              >First name:</label
            >
            <input
              v-model="user.firstName"
              class="py-3 dark:bg-at-dark-secondary"
              type="text"
            />
          </div>
          <div class="flex flex-col mb-6">
            <label
              class="mb-2 font-semibold tracking-wider text-gray-600 uppercase"
              for="last name"
              >Last name:</label
            >
            <input
              v-model="user.lastName"
              class="py-3 dark:bg-at-dark-secondary"
              type="text"
            />
          </div>
          <div class="flex flex-col mb-6">
            <label
              class="mb-2 font-semibold tracking-wider text-gray-600 uppercase"
              for="email"
              >Email address:</label
            >
            <input
              v-model="user.email"
              class="py-3 dark:bg-at-dark-secondary"
              type="text"
            />
          </div>
          <div class="flex flex-col mb-6">
            <label
              class="mb-2 font-semibold tracking-wider text-gray-600 uppercase"
              for="mobile number"
              >Mobile number:</label
            >
            <input
              v-model="user.phoneNumber"
              class="py-3 dark:bg-at-dark-secondary"
              type="text"
              id="mobile number"
            />
          </div>
          <div class="flex flex-col mb-6">
            <label
              class="mb-2 font-semibold tracking-wider text-gray-600 uppercase"
              for="password"
              >Password:</label
            >
            <input v-model="user.password" class="py-3" type="password" />
          </div>
          <button
            :disabled="isLoading"
            class="w-full py-3 mt-5 font-semibold tracking-wider uppercase bg-gray-700 disabled:bg-gray-400 text-gray-50 dark:text-gray-300"
          >
            <span v-if="isLoading">Loading...</span>
            <span v-else>Submit</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .signup-content {
    @apply max-w-xl p-8 mx-auto bg-white rounded-lg shadow-lg;
  }
  .active {
    border-bottom: 4px solid #0770cf !important;
  }
</style>
