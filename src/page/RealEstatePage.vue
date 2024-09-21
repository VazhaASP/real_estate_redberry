<script setup lang="js">
import AddAgentButton from '../components/buttons/AddAgentButton.vue'

import Advertisement from '../components/Advertisement.vue'
import { getRealEstates } from '../http/realEstate';
import { ref, onMounted } from 'vue';
import {getRegions, getCity} from "../http/classificator"

console.log(getRealEstates())

const staticRealEstate = ref([]);
const realEstates = ref(null);
const regionList = ref([]);
const regionModel = ref([])

const filterRegion = () => {
  console.log('Selected Regions:', regionModel.value)
  if (regionModel.value.length === 0) {
    // If no regions selected, show the entire list
    realEstates.value = [...staticRealEstate.value]
  } else {
    realEstates.value = staticRealEstate.value.filter((estate) =>
      regionModel.value.includes(estate.city.region_id)
    );
  }
  closeDropdown()
}

// Function to manually close the dropdown
const closeDropdown = () => {
  const dropdown = document.querySelector('.dropdown-menu');
  dropdown.classList.toggle('show')
}

const price = ref([
  {value: 50000, name: "50,000 ₾"},
  {value: 100000, name: "100,000 ₾"},
  {value: 150000, name: "150,000 ₾"},
  {value: 200000, name: "200,000 ₾"},
  {value: 250000, name: "250,000 ₾"},
])

onMounted( async() => {
    await getRealEstates()
    .then(res => {
      console.log(res); // Log the result
      staticRealEstate.value = res.data
      realEstates.value = res.data
    })
    .catch(error => {
      console.error(error); // Handle any errors
    });
    await getRegions().then((response) =>{
        regionList.value = response.data

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
          <div class="d-flex justify-content-between border border-1 rounded align-items-center">
            <div class="btn-group me-3 p-1">
              <button 
                type="button" 
                class="btn dropdown-toggle filter-dropdown-btn" 
                data-bs-toggle="dropdown" 
                data-bs-auto-close="false"
                data-bs-display="static" 
                aria-expanded="false">
                რეგიონი
              </button>
              <div class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start drop p-4">
                <h5 class="title">რეგიონების მიხედვით</h5>
                <div class="region-list row mt-3">
                  <div class="col-4 mb-3" v-for="(item, index) in regionList" :value="item.id" :key="index">
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" :value="item.id" :id="`flexCheckChecked-${item.id}`" v-model="regionModel">
                    <label class="form-check-label" :for="`flexCheckChecked-${item.id}`">
                      {{ item.name }}
                    </label>
                  </div>
                  </div>
                
                </div>
                <div class="d-flex justify-content-end">
                  <button class="btn choose" @click="filterRegion">არჩევა</button>
                </div>
              </div>
            </div>
            <div class="btn-group me-3 p-1">
              <button 
                type="button" 
                class="btn dropdown-toggle filter-dropdown-btn" 
                data-bs-toggle="dropdown" 
                data-bs-display="static"
                data-bs-auto-close="false" 
                aria-expanded="false">
                საფასო კატეგორია
              </button>
              <div class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start small-drop drop p-4">
                <h5 class="title">ფასის მიხედვით</h5>
                <div class="row mt-3">
                  <div class="col-6">
                    <div class="mb-3">
                      <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="დან">
                    </div>
                    <div>
                      <p>მინ. ფასი</p>
                      <ul>
                        <li v-for="(item, index) in price" :key="index">{{ item.name }}</li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="მდე">
                    </div>
                    <div>
                      <p>მაქს. ფასი</p>
                      <ul>
                        <li v-for="(item, index) in price" :key="index">{{ item.name }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-end">
                  <button class="btn choose" @click="filterRegion">არჩევა</button>
                </div>
              </div>
              
            </div>
            <div class="btn-group me-3 p-1">
              <button 
                type="button" 
                class="btn dropdown-toggle filter-dropdown-btn" 
                data-bs-toggle="dropdown" 
                data-bs-display="static"
                data-bs-auto-close="false" 
                aria-expanded="false">
                ფართობი
              </button>
              <div class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start small-drop drop p-4">
                <h5 class="title">ფართობის მიხედვით</h5>
                <div class="row mt-3">
                  <div class="col-6">
                    <div class="mb-3">
                      <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="დან">
                    </div>
                    <div>
                      <p>მინ. მ</p>
                      <ul>
                        <!-- <li v-for="(item, index) in price" :key="index">{{ item.name }}</li> -->
                      </ul>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="mb-3">
                      <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="მდე">
                    </div>
                    <div>
                      <p>მაქს. მ</p>
                      <ul>
                        <!-- <li v-for="(item, index) in price" :key="index">{{ item.name }}</li> -->
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-end">
                  <button class="btn choose" @click="filterRegion">არჩევა</button>
                </div>
              </div>
              
            </div>
            <div class="btn-group me-3 p-1">
              <button 
                type="button" 
                class="btn dropdown-toggle filter-dropdown-btn" 
                data-bs-toggle="dropdown" 
                data-bs-display="static"
                data-bs-auto-close="false" 
                aria-expanded="false">
                საძინებლების რაოდენობა
              </button>
              <div class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start small-drop drop p-4">
                <h5 class="title">საძინებლების რაოდენობა</h5>
                <div class=" mt-3">
                 
                
                </div>
                <div class="d-flex justify-content-end">
                  <button class="btn choose" @click="filterRegion">არჩევა</button>
                </div>
              </div>
              
            </div>
          </div>
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
.drop{
  width: 731px;
/* height: 284px; */
padding: 24px 0px 0px 0px;
gap: 32px;
border-radius: 10px;
opacity: 0px;
border: 1px solid #DBDBDB;
box-shadow: 5px 5px 12px 0px #02152614;

}

.small-drop{
  Width:382px;
}
.form-check-input:checked {
    background-color: #45A849; /* Change background color */
    border-color: #45A849; /* Change border color */
}
.title{
  font-family: FiraGO;
font-size: 16px;
font-weight: 500;
line-height: 19.2px;
color: #021526;

}
.choose{
  width:77px;
/* height: 33px; */
padding: 8px 14px 8px 14px;
gap: 2px;
border-radius: 8px;
opacity: 0px;
background: #F93B1D;
color:white;

}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}


</style>