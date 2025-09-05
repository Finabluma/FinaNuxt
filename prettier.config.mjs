// prettier.config.mjs
export default {
  // No usar punto y coma al final de las líneas
  semi: false,

  // Usar comillas simples
  singleQuote: true,

  // Comas finales solo donde sea válido en ES5
  trailingComma: "es5",

  // Indentación de 2 espacios
  tabWidth: 2,

  // Insertar espacio después de los corchetes en objetos y arrays
  bracketSpacing: true,

  // Controla la forma de las llaves de los bloques
  bracketSameLine: false,

  // Longitud máxima de línea antes de hacer salto de línea
  printWidth: 100,

  // Usar comillas simples en JSX también (aunque no uses JSX en Nuxt, es seguro)
  jsxSingleQuote: true,
};
