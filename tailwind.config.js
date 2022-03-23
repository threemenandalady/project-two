module.exports = {
  content: ["./views/**/*.{html,js,handlebars}", './node_modules/tw-elements/dist/js/**/*.js' ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ]
}
