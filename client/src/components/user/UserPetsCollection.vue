<template>
  <CollapsibleModule
    title="🗃️ Pets Collection"
    headerBg="bg-gradient-to-r from-gray-50 to-green-100 dark:from-gray-900 dark:to-green-900 "
  >
    <div class="transition-all duration-300 ease-in-out dark:bg-gray-800">
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead>
            <tr
              class="bg-gray-50 dark:bg-gray-800 border-b-2 border-gray-100 dark:border-gray-900"
            >
              <th
                class="px-2 py-2 text-left w-32 text-gray-700 dark:text-gray-200"
              >
                Pet Species
              </th>
              <th
                v-for="skin in allSkins"
                :key="skin"
                :class="[
                  'px-2 py-2 text-center w-24 text-gray-700 dark:text-gray-200',
                  skinCompletionMap[skin]
                    ? 'bg-green-100 dark:bg-green-900 border-b-4 border-b-green-400 dark:border-b-green-900'
                    : '',
                ]"
              >
                {{ skin }}
                <span
                  v-if="skinCompletionMap[skin]"
                  class="ml-1 inline-block text-green-600 dark:text-green-300"
                  title="You own every species for this skin variant"
                >
                  ⭐
                </span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-900">
            <tr
              v-for="species in allSpecies"
              :key="species"
              :class="[
                'transition-colors',
                speciesCompletionMap[species]
                  ? 'bg-green-50 dark:bg-gray-700 '
                  : 'hover:bg-yellow-50 hover:dark:bg-gray-700 dark:bg-gray-800',
              ]"
            >
              <td
                :class="[
                  'px-2 py-2 font-semibold sticky left-0 z-10 border-r border-gray-100 dark:border-gray-900 w-32 text-gray-700 dark:bg-gray-800 dark:text-gray-200',
                  speciesCompletionMap[species]
                    ? 'bg-green-100 dark:bg-green-900 border-r-4 border-r-green-400 dark:border-r-green-900'
                    : '',
                ]"
              >
                {{ species }}
                <span
                  v-if="speciesCompletionMap[species]"
                  class="ml-2 inline-block text-green-600 dark:text-green-200"
                  title="Complete collection for this species"
                >
                  ⭐
                </span>
              </td>
              <td
                v-for="skin in allSkins"
                :key="skin"
                class="px-2 py-2 text-center w-24"
              >
                <span
                  v-if="userHasSkin(species, skin)"
                  class="inline-block px-2 py-1 rounded text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 shadow"
                  title="Owned"
                  >✔</span
                >
                <span
                  v-else
                  class="inline-block px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-900 text-gray-400 dark:text-gray-500"
                  title="Missing"
                  >—</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </CollapsibleModule>
</template>

<script setup>
import { computed } from "vue";
import CollapsibleModule from "../CollapsibleModule.vue";

const props = defineProps({ pets: Array });

const allSpecies = [
  "Bat",
  "Crocodile",
  "Dog",
  "Dolphin",
  "Donkey",
  "Dove",
  "Dragon",
  "Eagle",
  "Goose",
  "Gorilla",
  "Invader",
  "Junglefowl",
  "Kangaroo",
  "Lizard",
  "Mustang",
  "Otter",
  "Ox",
  "Peacock",
  "Phoenix",
  "Poodle",
  "Pig",
  "Rabbit",
  "Rat",
  "Scorpion",
  "Seal",
  "Snail",
  "Snake",
  "Tiger",
  "Turtle",
  "Visitor",
  "Whale",
];

const allSkins = [
  "Base skin",
  "Alpha",
  "Beta",
  "Gamma",
  "Delta",
  "Epsilon",
  "Zeta",
  "Eta",
  "Sunkissed",
];

const speciesCompletionMap = computed(() => {
  const map = {};
  allSpecies.forEach((species) => {
    map[species] = allSkins.every((skin) => userHasSkin(species, skin));
  });
  return map;
});

function userHasSkin(species, skin) {
  const normalizedSkin = skin === null ? "Base skin" : skin;

  return (
    props.pets &&
    props.pets.some(
      (p) =>
        p.species === species &&
        (p.skin === normalizedSkin ||
          (normalizedSkin === "Base skin" &&
            (!p.skin || p.skin === "Base skin")))
    )
  );
}

const skinCompletionMap = computed(() => {
  const map = {};
  allSkins.forEach((skin) => {
    map[skin] = allSpecies.every((species) => userHasSkin(species, skin));
  });
  return map;
});
</script>
