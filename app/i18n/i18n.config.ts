export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      bienvenido: 'Welcome',
      inicio: 'Home',
      categoria: 'Category',
      volver: 'Return to',
      cargando: 'loading',
      proyectos: 'Projects',
      tambien: 'You can also take a look at',
      noproyecta: 'There are no projects in this category yet'
    },
    es: {
      bienvenido: 'Bienvenido',
      inicio: 'Inicio',
      categoria: 'Categoría',
      volver: 'Volver a',
      cargando: 'cargando',
      proyectos: 'Proyectos',
      tambien: 'También puedes echar un vistazo a',
      noproyecta: 'Aún no hay proyectos en esta categoría'
    }
  }
}))
