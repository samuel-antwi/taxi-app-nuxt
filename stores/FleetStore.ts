import { defineStore } from "pinia"
import { useModal } from "@/composables/useModal.js"
import type { fleetsType } from "@/types/fleets"
import type { Fleet } from "@/types/fleet"

const client = useSupabaseClient()

export const useFleetStore = defineStore("FleetStore", {
  state: () => ({
    fleets: [] as unknown as fleetsType,
    fleet: {} as Fleet,
    isLoading: false,
    errorMsg: "",
  }),

  getters: {},

  actions: {
    async getFleets() {
      try {
        this.isLoading = true
        const { data: fleets, error } = await client.from("fleets").select("*")
        this.fleets = fleets
        console.log(fleets)
        this.isLoading = false
        if (error) throw error
      } catch (error) {
        this.errorMsg = error.message
        console.log(error.message)
      }
    },
  },
})
