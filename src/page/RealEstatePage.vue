<script setup lang="js">
import RealEstateFilter from '../components/filter/RealEstateFilter.vue'
import AddButton from '../components/buttons/AddButton.vue'
import Advertisement from '../components/Advertisement.vue'
</script>
<template>
  <div>
    <div class="filter-container ">
        <div class="d-flex justify-content-between">
            <real-estate-filter></real-estate-filter>
            <AddButton></AddButton>
        </div>
    </div>
    <div class=" mt-3">
    <div class="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
        <div class="col">
        <div class="py-3">
            <Advertisement></Advertisement>
        </div>
        </div>
        <div class="col">
        <div class="py-3">
            <Advertisement></Advertisement>
        </div>
        </div>
        <div class="col">
        <div class="py-3"><Advertisement></Advertisement></div>
        </div>
        <div class="col">
        <div class="py-3"><Advertisement></Advertisement></div>
        </div>
      
    </div>
    </div>
  </div>
</template>
<style scoped>

</style>