<template>
  <div class="bg-white shadow rounded-lg overflow-hidden mt-5">
    <div class="p-2 bg-gradient-to-r from-purple-50 to-pink-50">
      <div class="flex justify-between">
        <div class="ml-4 flex">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">
              <template v-if="profile.factionTag">
                [{{ profile.factionTag }}]
              </template>
              <template v-if="profile.title">
                <i v-tooltip="profile.title.desc">{{ profile.title.title }}</i>
              </template>
              {{ profile.name }}
            </h3>
            <p class="text-sm text-gray-600">#{{ profile.id }}</p>
          </div>
        </div>
        <div class="text-right">
          <span
            class="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-dark-green-800"
          >
            {{ profile?.rank?.emoji }}
            {{ profile?.rank?.title }}
          </span>
          <span
            class="inline-flex ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
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
            <dt class="font-medium text-gray-900">Bconomy Coins <i>(BC)</i></dt>
            <dd class="text-gray-500 capitalize">{{ profile.bc }}</dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900">
              Supporter Points <i>(SP)</i>
            </dt>
            <dd class="text-gray-500">{{ profile.sp }}</dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900">
              Karmatic Reputation <i>(KR)</i>
            </dt>
            <dd class="text-gray-500">{{ profile.kr ?? 0 }}</dd>
          </div>
        </div>
      </div>
      <div class="py-4 space-y-4 border-t">
        <div class="grid grid-cols-3 gap-4 text-sm">
          <div>
            <dt class="font-medium text-gray-900">Farm plots</dt>
            <dd class="text-gray-500 capitalize">
              {{ profile.nbFarmPlots + profile.nbFarmPlotsExtra }}
              <i>({{ profile.nbFarmPlotsExtra }} extra)</i>
            </dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900">Generators</dt>
            <dd class="text-gray-500">
              {{ profile.nbGenerators + profile.nbGeneratorsExtra }}
              <i>({{ profile.nbGeneratorsExtra }} extra)</i>
            </dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900">Stables</dt>
            <dd class="text-gray-500">
              {{ profile.nbStables + profile.nbStablesExtra }}
              <i>({{ profile.nbStablesExtra }} extra)</i>
            </dd>
          </div>
        </div>
      </div>
      <div class="py-4 space-y-4 border-t">
        <div class="grid grid-cols-4 gap-4 text-sm">
          <div>
            <dt class="font-medium text-gray-900">Fishing</dt>
            <dd class="text-gray-500 capitalize">
              {{ profile.upgrades?.fish + profile.upgrades?.fishExtra }}
              <i>({{ profile.upgrades?.fishExtra || 0 }} extra)</i>
            </dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900">Hunting</dt>
            <dd class="text-gray-500 capitalize">
              {{ profile.upgrades?.hunt + profile.upgrades?.huntExtra }}
              <i>({{ profile.upgrades?.huntExtra || 0 }} extra)</i>
            </dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900">Exploring</dt>
            <dd class="text-gray-500 capitalize">
              {{ profile.upgrades?.explore + profile.upgrades?.exploreExtra }}
              <i>({{ profile.upgrades?.exploreExtra || 0 }} extra)</i>
            </dd>
          </div>
          <div>
            <dt class="font-medium text-gray-900">Mining</dt>
            <dd class="text-gray-500 capitalize">
              {{ profile.upgrades?.mine + profile.upgrades?.mineExtra }}
              <i>({{ profile.upgrades?.mineExtra || 0 }} extra)</i>
            </dd>
          </div>
        </div>
      </div>
      <div
        v-if="profile.registrationDate"
        class="border-t pt-4 text-xs text-gray-500"
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
