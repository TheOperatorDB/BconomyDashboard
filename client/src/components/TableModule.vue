<template>
  <div>
    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="bg-gray-50 dark:bg-gray-800">
        <tr class="border-b border-gray-200 dark:border-gray-700">
          <th
            v-for="col in columns"
            :key="col.key"
            :class="[
              'px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 tracking-wider',
              col.sortable ? 'cursor-pointer select-none' : '',
            ]"
            @click="col.sortable ? handleSort(col.key) : null"
          >
            {{ col.label }}
            <span v-if="col.sortable && sortKey === col.key">
              <svg class="inline w-3 h-3" fill="none" viewBox="0 0 20 20">
                <path
                  :d="sortAsc ? 'M6 8l4 4 4-4' : 'M6 12l4-4 4 4'"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </th>
        </tr>
        <tr v-if="columns.some((col) => col.filterable)">
          <th
            v-for="col in columns"
            :key="col.key"
            class="px-3 py-1 bg-gray-50 dark:bg-gray-800"
          >
            <div v-if="col.filterable">
              <template
                v-if="col.filterOptions && Array.isArray(col.filterOptions)"
              >
                <select
                  class="border px-2 py-1 rounded font-normal text-xs w-full dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                  v-model="filters[col.key]"
                  @change="handleFilter"
                >
                  <option value="">All</option>
                  <option
                    v-for="opt in col.filterOptions"
                    :key="opt"
                    :value="opt"
                  >
                    {{ opt }}
                  </option>
                </select>
              </template>
              <template v-else>
                <input
                  type="text"
                  class="border px-2 py-1 rounded text-xs w-full dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                  v-model="filters[col.key]"
                  @input="handleFilter"
                  :placeholder="`Filter...`"
                  style="font-weight: normal"
                />
              </template>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
        <tr
          v-for="row in filteredRows"
          :key="row[rowKey]"
          class="transition-colors duration-150 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
          @click="$emit('rowClick', row)"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            class="px-3 py-4 whitespace-nowrap text-xs text-gray-700 dark:text-gray-200 dark:bg-gray-800"
          >
            <slot :name="col.key" :row="row">
              <template v-if="Array.isArray(row[col.key])">
                <template v-if="row[col.key].length === 0"></template>
                <template v-else>{{ row[col.key] }}</template>
              </template>
              <template v-else>
                {{ row[col.key] }}
              </template>
            </slot>
          </td>
        </tr>
        <tr v-if="filteredRows.length === 0">
          <td
            :colspan="columns.length"
            class="text-center py-6 text-gray-400 dark:text-gray-500 dark:bg-gray-800 text-sm"
          >
            Nothing found
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, required: true },
  rowKey: { type: String, default: "id" },
});

const emit = defineEmits(["rowClick", "sort", "filterChange"]);

const sortKey = ref("");
const sortAsc = ref(true);
const filters = ref({});

onMounted(() => {
  props.columns.forEach((col) => {
    if (col.filterable) {
      if (filters.value[col.key] === undefined) {
        filters.value[col.key] = "";
      }
    }
  });
});

const initialRows = ref([]);

onMounted(() => {
  initialRows.value = [...props.rows];
});

function handleSort(key) {
  if (sortKey.value !== key) {
    sortKey.value = key;
    sortAsc.value = true;
  } else if (sortAsc.value === true) {
    sortAsc.value = false;
  } else {
    sortKey.value = "";
    sortAsc.value = true;
  }
  emit("sort", { key: sortKey.value, asc: sortAsc.value });
}

function handleFilter() {
  emit("filterChange", { ...filters.value });
}

const filteredRows = computed(() => {
  let result = [...props.rows];

  // Filtering
  props.columns.forEach((col) => {
    if (col.filterable && filters.value[col.key]) {
      if (col.filterOptions && Array.isArray(col.filterOptions)) {
        // Dropdown filter
        result = result.filter(
          (row) => String(row[col.key]) === filters.value[col.key]
        );
      } else {
        // Search filter
        const val = filters.value[col.key].toLowerCase();

        result = result.filter((row) => {
          const cell = row[col.key];
          if (Array.isArray(cell)) {
            return cell.some((item) =>
              String(item ?? "")
                .toLowerCase()
                .includes(val)
            );
          } else {
            return String(cell ?? "")
              .toLowerCase()
              .includes(val);
          }
        });
      }
    }
  });

  // Sorting
  if (sortKey.value) {
    result = [...result];

    result.sort((a, b) => {
      let aVal = a[sortKey.value];
      let bVal = b[sortKey.value];
      if (aVal == null) aVal = "";
      if (bVal == null) bVal = "";

      const aNum = Number(aVal);
      const bNum = Number(bVal);
      const isANum = !isNaN(aNum) && aVal !== "";
      const isBNum = !isNaN(bNum) && bVal !== "";
      if (isANum && isBNum) {
        return sortAsc.value ? aNum - bNum : bNum - aNum;
      }

      aVal = aVal.toString();
      bVal = bVal.toString();
      const cmp = aVal.localeCompare(bVal, undefined, {
        numeric: true,
        sensitivity: "base",
      });
      return sortAsc.value ? cmp : -cmp;
    });
  }

  return result;
});
</script>
