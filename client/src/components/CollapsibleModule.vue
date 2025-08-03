<template>
  <div
    class="bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden mt-6 border-2 border-gray-100 dark:border-gray-800"
    :class="headerBg"
  >
    <div
      class="flex items-center justify-between p-6 cursor-pointer"
      @click="toggle"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        <slot name="icon"> </slot>
        {{ title }}
      </h3>
      <svg
        :class="[
          'w-5 h-5 text-gray-500 dark:text-gray-100 transform transition-transform duration-300',
          isOpen ? 'rotate-180' : 'rotate-0',
        ]"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
    <div v-show="isOpen" class="transition-all duration-300 ease-in-out">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  open: { type: Boolean, default: false },
  headerBg: { type: String, default: "" },
});
const emit = defineEmits(["update:open"]);

const isOpen = ref(props.open);

watch(
  () => props.open,
  (val) => {
    isOpen.value = val;
  }
);

function toggle() {
  isOpen.value = !isOpen.value;
  emit("update:open", isOpen.value);
}
</script>
