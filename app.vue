<template>
  <div class="flex flex-col min-h-screen dark:bg-ocean-bg bg-mist-bg transition-colors duration-300">
    <Navbar />
    <main class="flex-1">
      <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
    </main>
    <Footer />
  </div>
</template>
