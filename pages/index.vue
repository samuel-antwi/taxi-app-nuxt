<script setup lang="ts">
  const user = useSupabaseUser()
  const client = useSupabaseClient()

  const { data: fleets } = await useAsyncData("fleets", async () => {
    const { data } = await client.from("fleets").select("*")
    return data
  })

  console.log(fleets.value)
</script>

<template>
  <div class="max-w-5xl px-5 mx-auto">
    <h1>Welcome Home</h1>
  </div>
</template>
