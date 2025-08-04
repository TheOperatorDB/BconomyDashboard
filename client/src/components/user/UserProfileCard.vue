<template>
  <div
    class="dark:bg-gray-800 shadow rounded-lg overflow-hidden mt-5 border border-gray-900"
  >
    <div
      class="p-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-900"
    >
      <div class="flex justify-between">
        <div class="ml-4 flex">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              <template v-if="profile.factionTag">
                [{{ profile.factionTag }}]
              </template>
              <template v-if="profile.title">
                <i v-tooltip="profile.title.desc">{{ profile.title.title }}</i>
              </template>
              {{ profile.name }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              #{{ profile.id }}
            </p>
          </div>
        </div>
        <div class="text-right">
          <span
            class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-dark-green-800 dark:text-green-200"
          >
            {{ profile?.rank?.emoji }}
            {{ profile?.rank?.title }}
          </span>
          <span
            class="inline-flex ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
          >
            🌟 {{ profile.tier }}
          </span>
        </div>
      </div>
    </div>
    <div class="m-6">
      <div class="py-4 space-y-4">
        <div class="grid grid-cols-3 gap-4 text-sm">
          <div>
            <dt class="font-medium text-gray-900 dark:text-gray-100">
              Bconomy Coins <i>(BC)</i>
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 capitalize">
              {{ profile.bc }}
            </dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900 dark:text-gray-100">
              Supporter Points <i>(SP)</i>
            </dt>
            <dd class="text-gray-500 dark:text-gray-400">{{ profile.sp }}</dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900 dark:text-gray-100">
              Karmatic Reputation <i>(KR)</i>
            </dt>
            <dd class="text-gray-500 dark:text-gray-400">
              {{ profile.kr ?? 0 }}
            </dd>
          </div>
        </div>
      </div>
      <div class="py-4 space-y-4 border-t border-gray-100 dark:border-gray-800">
        <div class="grid grid-cols-3 gap-4 text-sm">
          <div>
            <dt class="font-medium text-gray-900 dark:text-gray-100">
              Farm plots
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 capitalize">
              {{ profile.nbFarmPlots + profile.nbFarmPlotsExtra }}
              <i>({{ profile.nbFarmPlotsExtra }} extra)</i>
            </dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900 dark:text-gray-100">
              Generators
            </dt>
            <dd class="text-gray-500 dark:text-gray-400">
              {{ profile.nbGenerators + profile.nbGeneratorsExtra }}
              <i>({{ profile.nbGeneratorsExtra }} extra)</i>
            </dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900 dark:text-gray-100">
              Stables
            </dt>
            <dd class="text-gray-500 dark:text-gray-400">
              {{ profile.nbStables + profile.nbStablesExtra }}
              <i>({{ profile.nbStablesExtra }} extra)</i>
            </dd>
          </div>
        </div>
      </div>
      <div class="py-4 space-y-4 border-t border-gray-100 dark:border-gray-800">
        <div class="grid grid-cols-4 gap-4 text-sm">
          <div>
            <dt class="font-medium text-gray-900 dark:text-gray-100">Fish</dt>
            <dd class="text-gray-500 dark:text-gray-400 capitalize">
              {{ profile.upgrades?.fish + profile.upgrades?.fishExtra }}
              <i>({{ profile.upgrades?.fishExtra || 0 }} extra)</i>
            </dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900 dark:text-gray-100">Hunt</dt>
            <dd class="text-gray-500 dark:text-gray-400 capitalize">
              {{ profile.upgrades?.hunt + profile.upgrades?.huntExtra }}
              <i>({{ profile.upgrades?.huntExtra || 0 }} extra)</i>
            </dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900 dark:text-gray-100">
              Explore
            </dt>
            <dd class="text-gray-500 dark:text-gray-400 capitalize">
              {{ profile.upgrades?.explore + profile.upgrades?.exploreExtra }}
              <i>({{ profile.upgrades?.exploreExtra || 0 }} extra)</i>
            </dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900 dark:text-gray-100">Mine</dt>
            <dd class="text-gray-500 dark:text-gray-400 capitalize">
              {{ profile.upgrades?.mine + profile.upgrades?.mineExtra }}
              <i>({{ profile.upgrades?.mineExtra || 0 }} extra)</i>
            </dd>
          </div>
        </div>
      </div>
      <div
        v-if="profile.registrationDate"
        class="border-t border-gray-100 dark:border-gray-800 pt-4 text-xs text-gray-500 dark:text-gray-400"
      >
        <div>
          Registration date:
          {{ formatDate(profile.registrationDate) }}
          <i>({{ timestampToDaysAgo(profile.registrationDate) }} days ago)</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { utils } from "@/composables/utils.js";
const { formatDate, timestampToDaysAgo } = utils();

defineProps({ profile: Object });
</script>
