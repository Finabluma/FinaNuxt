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

        // 👇 opcional: normalizar datos
        this.data = {
          ...result,
          sections: result?.sections || []
        }
      } catch (err) {
        this.error = err
        console.error('Error fetching home:', err)
      } finally {
        this.loading = false
      }
    }
  }
})
