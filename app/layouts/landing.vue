<template>
  <div class="min-h-screen flex flex-col bg-background font-sans antialiased">
    <slot />
  </div>
</template>

<script setup>
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap",
    },
  ],
})
</script>
