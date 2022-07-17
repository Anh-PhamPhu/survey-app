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

      <div class="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2 md:grid-cols-3">
          <SurveyListItem 
            v-for="survey in surveys"
            :key="survey.id"
            :survey="survey"
            @delete="deleteSurvey(survey)"
          />
      </div>
  </PageComponent>
</template>

<script setup>
import PageComponent from '../components/PageComponent.vue';
import store from '../store';
import { computed } from 'vue';
import SurveyListItem from '../components/SurveyListItem.vue';

const surveys = computed(() => {
  return store.state.surveys.data;
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
// console.log(surveys)
</script>