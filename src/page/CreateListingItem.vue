<script setup lang="js">
import { ref } from "vue";
import { useField, Form, Field, ErrorMessage, } from "vee-validate";

const formData = ref({
    name: "",
    surname: "",
    email: "",
    avatar: null,
    tel: ""
  });
  
</script>

<template>
   <div class="modal-content">
<div class="radio-container">
    <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
        <label class="form-check-label" for="flexRadioDefault1">
        იყიდება
        </label>
    </div>
  <div class="form-check">
         <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
        <label class="form-check-label" for="flexRadioDefault2">
         ქირავდება
        </label>
  </div>
</div>
    <div class="modal-header d-flex justify-content-between align-items-center">
        <h5 class="modal-title w-100 text-center">ლისტინგის დამატება</h5>
    </div>
    <div class="modal-dialog modal-dialog-centered">
        
        <div class="form-container">
            <div class="form-group">
                <label for="surname" class="form-label address">მისამართი</label>
                 <Field name="name" class="form-control address-field" v-model="formData.name" />
            </div>
            <div class="form-group">
                <label for="surname" class="form-label address">საფოსტო ინდექსი</label>
                <Field name="name" class="form-control address-field" v-model="formData.name" />
            </div>
            <div class="form-group">
                <label for="surname" class="form-label address">რეგიონი</label>
                <Field name="name" class="form-control address-field" v-model="formData.name" />
            </div>
            <div class="form-group">
                <label for="surname" class="form-label address">ქალაქი</label>
                <Field name="name" class="form-control address-field" v-model="formData.name" />
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.address{
    width: 384px;
height: 17px;
gap: 0px;
opacity: 0px;
font-family: FiraGO;
font-size: 14px;
font-weight: 500;
line-height: 16.8px;
text-align: left;
color: #021526;
}
.address-field{
    width: Fixed (384px)px;
height: Fixed (42px)px;
padding: 10px 0px 0px 0px;
gap: 0px;
border-radius: 6px 0px 0px 0px;
border: 1px 0px 0px 0px;
opacity: 0px;

}
.form-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px; /* Space between the fields */
}

.address-field {
  width: 100%; /* Ensure input fields take up full width of their containers */
}
.radio-container {
  display: flex;
  align-items: center;
  gap: 20px; /* Space between the radio buttons */
}

</style>
