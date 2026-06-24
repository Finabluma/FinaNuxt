import { homeQuery } from '~/queries'

export const useHomeStore = defineStore('home', {
  state: () => ({
    data: null,
    loading: false,
    error: null
  }),

  getters: {
    sections: (state) => state.data?.sections || []
  },

  actions: {
    async fetchHome(lang) {
      const sanity = useSanity()

      this.loading = true
      this.error = null

      try {
        const result = await sanity.fetch(homeQuery, { lang })

        const normalized = {
          ...result,
          sections: result?.sections || []
        }

        this.data = normalized

        // ✅ ESTO ES LO QUE TE FALTA
        return normalized
      } catch (err) {
        this.error = err
        console.error('Error fetching home:', err)
        return null
      } finally {
        this.loading = false
      }
    }
  }
})
