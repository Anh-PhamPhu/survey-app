<template>
  <PageComponent>
      <template v-slot:header>
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
          <router-link
            :to="{ name: 'SurveyCreate'}"
            class="
              py-2
              px-3
              text-white
              bg-emerald-500
              rounded-md
              hover:bg-emerald-600
            "
          >
            Add new Surveys
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </router-link>
        </div>
      </template>

      <div v-if="surveys.loading" class="flex justify-center h-max z-50">Loading...
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6 animate-spin" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
      
      <div v-else>
        <div v-if="surveys.data.length === 0" class="flex justify-center">
          <NoneData>
          </NoneData>
        </div>
        <div class="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <SurveyListItem 
              v-for="(survey, ind) in surveys.data"
              :key="survey.id"
              :survey="survey"
              :style="{animationDelay: `${ind * 0.1}s`}"
              class="opacity-0 animate-fade-in-down"
              @delete="deleteSurvey(survey)"
            />
        </div>
        <div 
          v-if="surveys.data.length !== 0"
          class="flex justify-center mt-5"
        >
          <nav
            class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a 
              v-for="(link, i) of surveys.links"
              :key="i"
              :disabled="!link.url"
              href="#"
              @click="getForPage($event,link)"
              aria-current="page"
              class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
              :class="[
                link.active
                  ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                i === 0 ? 'rounded-l-md bg-gray-100 text-gray-700' : '',
                i === surveys.links.length - 1 ? 'rounded-r-md' : '',
              ]"
              v-html="link.label"
            ></a>
          </nav>
        </div>
      </div>
  </PageComponent>
</template>

<script setup>
import PageComponent from '../components/PageComponent.vue';
import store from '../store';
import { computed } from 'vue';
import SurveyListItem from '../components/SurveyListItem.vue';
import NoneData from '../components/NoneData.vue';

const surveys = computed(() => {
  return store.state.surveys;
})

store.dispatch('getSurveys');

const deleteSurvey = (survey) => {
  if(confirm(`Are you want to delete this survey? Operation can't be undone!!`)){
    //delete survey
    store.dispatch('deleteSurvey', survey.id)
      .then(() => {
        store.dispatch('getSurveys');
      })
  }
}

function getForPage(ev, link){
  ev.preventDefault();

  if(!link.url || link.active){
    return;
  }

  store.dispatch("getSurveys", {url: link.url});
}
</script>