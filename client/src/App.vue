<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center gap-2">
            <img
              src="/img/detective.svg"
              alt="Bconomy Logo"
              class="w-8 h-8 object-contain"
            />
            <h1 class="text-xl font-bold text-gray-900">
              <a
                href="https://bconomy.net/play/"
                target="_blank"
                rel="noopener"
                class="underline"
                >Bconomy.net</a
              >
              Spyboard
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              :class="[
                $route.path === item.href
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              ]"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import "floating-vue/dist/style.css";

const navigation = [
  { name: "Market", href: "/market" },
  { name: "Users", href: "/" },
  { name: "Pets", href: "/pets" },
  { name: "Items", href: "/items" },
];
</script>

<style>
#app {
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
}
</style>
