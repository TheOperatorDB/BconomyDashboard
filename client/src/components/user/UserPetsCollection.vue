<template>
  <CollapsibleModule
    title="🗃️ Pets Collection"
    headerBg="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900"
    class="bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden mt-6"
  >
    <div class="transition-all duration-300 ease-in-out dark:bg-gray-800">
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead>
            <tr
              class="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700"
            >
              <th
                class="px-2 py-2 text-left w-32 text-gray-700 dark:text-gray-200"
              >
                Pet Species
              </th>
              <th
                v-for="skin in allSkins"
                :key="skin"
                class="px-2 py-2 text-center w-24 text-gray-700 dark:text-gray-200"
              >
                {{ skin }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-900">
            <tr
              v-for="species in allSpecies"
              :key="species"
              :class="[
                'transition-colors',
                hasAllSkins(species)
                  ? 'bg-green-50 dark:bg-green-900 hover:bg-green-100 dark:hover:bg-green-800 border-l-4 border-l-green-400 dark:border-l-green-700'
                  : 'hover:bg-yellow-50 hover:dark:bg-gray-700 dark:bg-gray-800',
              ]"
            >
              <td
                :class="[
                  'px-2 py-2 font-semibold sticky left-0 z-10 border-r border-gray-100 dark:border-gray-700 w-32 text-gray-700 dark:bg-gray-800 dark:text-gray-200',
                  hasAllSkins(species) ? 'bg-green-50 dark:bg-green-900' : '',
                ]"
              >
                {{ species }}
                <span
                  v-if="hasAllSkins(species)"
                  class="ml-2 inline-block text-green-600 dark:text-green-300"
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
                  class="inline-block px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
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
import CollapsibleModule from "../CollapsibleModule.vue";

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

const props = defineProps({ pets: Array });
const pets = props.pets;

function userHasSkin(species, skin) {
  return (
    pets &&
    pets.some(
      (p) =>
        p.species === species &&
        (p.skin === skin ||
          (skin === "Base skin" && (!p.skin || p.skin === "Base skin")))
    )
  );
}

function hasAllSkins(species) {
  return allSkins.every((skin) => userHasSkin(species, skin));
}
</script>
