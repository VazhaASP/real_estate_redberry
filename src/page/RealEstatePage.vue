<script setup lang="js">
import RealEstateFilter from '../components/filter/RealEstateFilter.vue'
import AddAgentButton from '../components/buttons/AddAgentButton.vue'

import Advertisement from '../components/Advertisement.vue'
import { getRealEstates } from '../http/realEstate';
import { ref, onMounted } from 'vue';

console.log(getRealEstates())

const realEstates = ref(null);

onMounted( () => {
    getRealEstates()
  .then(res => {
    console.log(res); // Log the result
    realEstates.value = res.data
  })
  .catch(error => {
    console.error(error); // Handle any errors
  });

}
)



</script>
<template>
  <div>
    <div class="modal-dialog modal-dialog-centered">
    </div>
    <div class="filter-container ">
        <div class="d-flex justify-content-between">
            <real-estate-filter></real-estate-filter>
            <AddAgentButton></AddAgentButton>
            
          
        </div>
    </div>
    <div class=" mt-3">
        <div class="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
    <!-- Loop through realEstates and render Advertisement for each -->
    <div class="col" v-for="(realEstate, index) in realEstates" :key="index">
      <div class="py-3">
        <!-- Pass the current realEstate item as a prop to Advertisement -->
        <Advertisement :realEstate="realEstate" />
      </div>
    </div>
  </div>
    </div>
  </div>
</template>
<style scoped>

</style>