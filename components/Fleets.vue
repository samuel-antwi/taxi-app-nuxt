<script setup lang="ts">
  const client = useSupabaseClient()

  const { data: fleets } = await useAsyncData("fleets", async () => {
    const { data } = await client.from("fleets").select("*")
    return data
  })
</script>

<template>
  <div
    v-if="fleets?.length > 0"
    class="grid grid-cols-2 md:gap-4 md:grid-cols-4"
  >
    <button
      v-for="fleet in fleets"
      :key="fleet.id"
      class="flex items-center justify-center rounded-md car-type"
    >
      <div class="flex flex-col">
        <img class="w-16 mb-1" :src="fleet.image" :alt="fleet.name" />
        <p class="font-semibold capitalize">
          {{ fleet.type }}
        </p>
      </div>
    </button>
  </div>
</template>

<style scss>
  span {
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;
    font-size: 14px;
  }

  .car-type {
    height: 90px;
  }
</style>
