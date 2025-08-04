<template>
  <div
    id="app"
    :class="[
      'min-h-screen flex flex-col',
      isDark ? 'dark bg-gray-700' : 'bg-gray-50',
    ]"
  >
    <!-- Environment Ribbon -->
    <div
      v-if="isDevelopment"
      class="fixed top-0 right-0 w-32 h-32 overflow-hidden z-50 pointer-events-none"
    >
      <div
        class="absolute top-[15px] right-[-30px] w-[120px] transform rotate-45 bg-purple-500 text-white text-xs text-center py-1 font-medium shadow-lg"
      >
        DEV
      </div>
    </div>
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
        <div class="flex h-16">
          <!-- Logo and Title -->
          <div class="flex items-center gap-2">
            <img
              src="/img/detective.svg"
              alt="Bconomy Logo"
              class="w-8 h-8 object-contain"
            />
            <h1
              class="hidden sm:block text-xl font-bold text-gray-900 dark:text-gray-100"
            >
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

          <!-- Navigation and Controls -->
          <div class="flex items-center justify-end flex-1 space-x-4">
            <!-- Mobile Menu Button -->
            <div class="sm:hidden relative">
              <button
                @click="isMenuOpen = !isMenuOpen"
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 focus:outline-none"
              >
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    v-if="!isMenuOpen"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <!-- Mobile Menu Dropdown -->
              <div
                v-if="isMenuOpen"
                class="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
              >
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  :class="[
                    $route.path === item.href
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                      : 'text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800',
                    'block px-4 py-2 text-sm',
                  ]"
                  @click="isMenuOpen = false"
                >
                  {{ item.name }}
                </router-link>
              </div>
            </div>
            <!-- Desktop Navigation -->
            <div class="hidden sm:flex items-center space-x-4">
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
            <div
              class="flex border-l border-gray-200 dark:border-gray-700 ml-4 pl-4"
            >
              <div class="relative">
                <input
                  type="text"
                  :value="displayedApiKey"
                  @input="updateApiKey"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  placeholder="Enter API Key"
                  class="w-48 pl-3 pr-8 py-2 text-sm rounded-md border transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 bg-gray-50 border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  v-if="apiKey"
                  @click="clearApiKey"
                  @mousedown.prevent
                  class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                  title="Clear API key"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <button
                @click="showApiHelp = true"
                class="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
              </button>
              <button
                @click="toggleDark"
                class="px-3 py-2 rounded-md text-sm font-medium transition-colors bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                title="Toggle dark mode"
              >
                <span v-if="isDark">🌙</span>
                <span v-else>☀️</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main
      class="flex-1 max-w-7xl w-full mx-auto py-6 pb-12 sm:px-6 lg:px-8 min-h-[calc(100vh-8rem)]"
    >
      <div class="h-full">
        <router-view />
      </div>
    </main>

    <!-- Footer -->
    <footer
      class="sticky bottom-0 inset-x-0 py-2 px-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 z-40"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end">
        <a
          href="https://github.com/TheOperatorDB/BconomyDashboard"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clip-rule="evenodd"
            />
          </svg>
          <span>View on GitHub</span>
        </a>
      </div>
    </footer>

    <!-- API Key Help Dialog -->
    <Teleport to="body">
      <div
        v-if="showApiHelp"
        class="fixed inset-0 flex items-start justify-center z-50 bg-black/20 backdrop-blur-sm"
        @click.self="showApiHelp = false"
      >
        <div
          class="bg-white dark:!bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4 mt-32"
        >
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              API Key Information
            </h3>
            <button
              @click="showApiHelp = false"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="space-y-4 text-gray-600 dark:text-gray-300">
            <p class="font-medium">To use your own API key:</p>
            <ol class="list-decimal list-inside space-y-2 ml-2">
              <li>
                Type
                <code class="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded"
                  >/resetapikey</code
                >
                in Bconomy.net console chat
              </li>
              <li>Copy and paste the key here</li>
              <li>
                To revoke access, type
                <code class="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded"
                  >/resetapikey</code
                >
                again in game
              </li>
            </ol>
            <p
              class="mt-4 text-sm bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded"
            >
              <span class="font-medium">Note:</span> If no key is provided, a
              default key will be used <i>(may hit API rate limits)</i>.
            </p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, provide, computed } from "vue";
import "floating-vue/dist/style.css";

const isDevelopment = computed(() => import.meta.env.MODE === "development");

const navigation = [
  { name: "Market", href: "/market" },
  { name: "Users", href: "/users" },
  { name: "Pets", href: "/pets" },
  { name: "Database", href: "/database" },
];

const isDark = ref(false);
const apiKey = ref(localStorage.getItem("bconomy_api_key") || "");
const showApiHelp = ref(false);
const isMenuOpen = ref(false);

const isInputFocused = ref(false);
const displayedApiKey = ref("");

function updateApiKey(event) {
  const newKey = event.target.value;
  apiKey.value = newKey;
  displayedApiKey.value = newKey;
  localStorage.setItem("bconomy_api_key", newKey);
}

function handleFocus() {
  isInputFocused.value = true;
  displayedApiKey.value = apiKey.value;
}

function handleBlur() {
  isInputFocused.value = false;
  displayedApiKey.value = apiKey.value ? "••••••••" : "";
}

function clearApiKey() {
  apiKey.value = "";
  displayedApiKey.value = "";
  localStorage.removeItem("bconomy_api_key");
}

// Initialize displayed value
onMounted(() => {
  displayedApiKey.value = apiKey.value ? "••••••••" : "";
});

function toggleDark() {
  isDark.value = !isDark.value;
  updateTheme();
}

function updateTheme() {
  document.documentElement.classList.toggle("dark", isDark.value);
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
}

provide("isDark", isDark);
provide("apiKey", apiKey);

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  } else {
    isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  updateTheme();

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
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

html,
body {
  height: 100%;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  display: none;
}

* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.router-view-container {
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
}
</style>
