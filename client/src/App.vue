<template>
  <div
    id="app"
    :class="['min-h-screen', isDark ? 'dark bg-gray-700' : 'bg-gray-50']"
  >
    <!-- Navigation -->
    <nav
      :class="[
        isDark
          ? 'bg-gray-900 shadow-sm border-b border-gray-800'
          : 'bg-white shadow-sm border-b border-gray-200',
        'transition-colors duration-300 sticky top-0 z-30',
      ]"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center gap-2">
            <img
              src="/img/detective.svg"
              alt="Bconomy Logo"
              class="w-8 h-8 object-contain"
            />
            <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">
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
            <button
              @click="toggleDark"
              class="px-3 py-2 rounded-md text-sm font-medium transition-colors bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              title="Toggle dark mode"
            >
              <span v-if="isDark">🌙</span>
              <span v-else>☀️</span>
            </button>
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              :class="[
                $route.path === item.href
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                  : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800',
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
import { ref, onMounted, provide } from "vue";
import "floating-vue/dist/style.css";

const navigation = [
  { name: "Market", href: "/market" },
  { name: "Users", href: "/users" },
  { name: "Pets", href: "/pets" },
  { name: "Database", href: "/database" },
];

const isDark = ref(false);

function toggleDark() {
  isDark.value = !isDark.value;
  updateTheme();
}

function updateTheme() {
  document.documentElement.classList.toggle("dark", isDark.value);
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
}

// Provide dark mode state to child components
provide("isDark", isDark);

// Initialize theme
onMounted(() => {
  // Check saved preference first
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  } else {
    // Fall back to system preference
    isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  updateTheme();

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        // Only if user hasn't set a preference
        isDark.value = e.matches;
        updateTheme();
      }
    });
});
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
