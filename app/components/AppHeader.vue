<template>
  <header class="global-header">
    <span
      role="status"
      aria-live="polite"
    ></span>
    <div class="flex items-center justify-between">
      <h1 class="f-sm mb-0 font-bold">ofm</h1>
      <div
        aria-label="Navegación principal"
        class="flex justify-end"
      >
        <LangSwitcher />
        <ThemeToogle />
      </div>
    </div>
  </header>
</template>
