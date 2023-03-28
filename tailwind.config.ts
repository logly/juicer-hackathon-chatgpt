import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
  theme: {
    extend: {
      colors: {
        main: "#5a4775"
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ]
}
