<script setup lang="js">
import RegionSelect from '../select/RegionSelect.vue'
import PriceSelect from '../select/PriceSelect.vue'
import AreaSelect from '../select/AreaSelect.vue'
import BedRoomCount from '../select/BedRoomCount.vue'
</script>
<template>
  
        <div class="d-flex justify-content-between border border-1 rounded align-items-center">
            <RegionSelect></RegionSelect>
            <PriceSelect></PriceSelect>
            <AreaSelect></AreaSelect>
         <BedRoomCount></BedRoomCount>
        </div>

</template>
<style scoped>
.filter-container{
width: Fixed 1,596px;
height: 47px;

}
.select-size{
    /* width: 70px; */
height: 28px;
gap: 24px;
opacity: 0px;
font-family: FiraGO;
font-size: 16px;
font-weight: 500;
line-height: 19.2px;
text-align: center;
color: #021526;


}
</style>