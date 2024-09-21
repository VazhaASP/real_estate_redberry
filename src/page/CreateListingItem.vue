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
<div class="container mb-5"> 
    <div class=" align-items-center">
        <h5 class="form-title w-100 text-center">ლისტინგის დამატება</h5>
    </div>
    <section class="mt-5"> 
        <h4 class="section-title">
            გარიგების ტიპი
        </h4>
        <div class="row align-items-start  ">
          
            <div class="col-12">
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
            </div>
   
        </div>
    </section>
    <section class="mt-5"> 
        <h4 class="section-title">
            მდებარეობა
        </h4>
        <div class="row align-items-start  mt-4">
          
            <div class="col-6">
        <div class="form-group">
                <label for="surname" class="form-label custom-label">მისამართი *</label>
                 <Field name="name" class="form-control custom-field" v-model="formData.name" />
                 <p class="under-text mt-2">
                    <i class="bi bi-check-lg"></i>
                    მინიმუმ ორი სიმბოლო
                 </p>
            </div>  
          </div>
    <div class="col-6">
        <div class="form-group">
                <label for="surname" class="form-label custom-label">საფოსტო ინდექსი *</label>
                <Field name="name" class="form-control custom-field" v-model="formData.name" />
                <p class="under-text mt-2">
                    <i class="bi bi-check-lg"></i>
                    მხოლოდ რიცხვები
                 </p>
            </div>
    
    </div> 
    <div class="col-6">
        <div class="form-group">
                <label for="surname" class="form-label custom-label">რეგიონი</label>
                 <Field name="name" class="form-control " v-model="formData.name" >
                    <select class="form-select custom-field" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                 </Field>
                 
            </div>  
          </div>
          <div class="col-6">
        <div class="form-group">
                <label for="surname" class="form-label custom-label">ქალაქი</label>
                 <Field name="name" class="form-control " v-model="formData.name" > 
                    <select class="form-select custom-field" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                 </Field>
                 
            </div>  
          </div>
        </div>
    </section>
    <section class="mt-5"> 
        <h4 class="section-title">
            ბინის დეტალები
        </h4>
        <div class="row align-items-start  mt-4">
          
            <div class="col-6">
        <div class="form-group">
                <label for="surname" class="form-label custom-label">ფასი </label>
                 <Field name="name" class="form-control custom-field" v-model="formData.name" />
                 <p class="under-text mt-2">
                    <i class="bi bi-check-lg"></i>
                    მხოლოდ რიცხვები
                 </p>
            </div>  
          </div>
    <div class="col-6">
        <div class="form-group">
                <label for="surname" class="form-label custom-label">ფართობი</label>
                <Field name="name" class="form-control custom-field" v-model="formData.name" />
                <p class="under-text mt-2">
                    <i class="bi bi-check-lg"></i>
                    მხოლოდ რიცხვები
                 </p>
            </div>
    
    </div> 
    <div class="col-6">
        <div class="form-group">
                <label for="surname" class="form-label custom-label">საძინებლების რაოდენობა * </label>
                 <Field name="name" class="form-control custom-field" v-model="formData.name" />
                 <p class="under-text mt-2">
                    <i class="bi bi-check-lg"></i>
                    მხოლოდ რიცხვები
                 </p>
            </div>  
          </div>
          <div class="col-12">
            <div class="form-group">
                <label for="surname" class="form-label custom-label">აღწერა *</label>
                    <Field name="name" class="form-control  " v-model="formData.name" > 
                        <textarea class="form-control custom-field"  id="floatingTextarea2" style="height: 100px"></textarea>
                    </Field>
                    <p class="under-text mt-2">
                    <i class="bi bi-check-lg"></i>
                    მინიმუმ ხუთი სიტყვა
                 </p>
            </div> 
          </div>
          <div class="col-12">
            <label for="surname" class="form-label custom-label">ატვირთე ფოტო *</label>
            <div class="custom-file-upload d-flex justify-content-center align-items-center">
  <label for="formFile" class="form-label w-100 h-100 d-flex justify-content-center align-items-center position-relative">
    <span class="icon"><i class="bi bi-plus-circle"></i></span> <!-- Add the plus icon -->
  </label>
  <input class=" position-absolute top-0 start-0 w-100 h-100" type="file" id="formFile">
</div>
          </div>
        </div>

    </section>
    <section class="mt-5 "> 
        <h4 class="section-title">
            აგენტი
        </h4>
        <div class="row align-items-start  mt-2"> 
            <div class="col-6">
                <div class="form-group">
                        <label for="surname" class="form-label custom-label">აირჩიე</label>
                        <Field name="name" class="form-control " v-model="formData.name" >
                            <select class="form-select custom-field" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </Field>
                        
                    </div>  
             </div> 
        </div>
    </section>
    <section class="button-section"> 
        <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-outline-danger me-3">გაუქმება</button> 
            <button type="button" class="btn btn-danger">დაამატე ლისტინგი</button>
        </div>
        
    </section>
</div>
</template>

<style scoped>

.form-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px; /* Space between the fields */
}


.radio-container {
  display: flex;
  align-items: center;
  gap: 20px; /* Space between the radio buttons */
}



.button-section{
margin-top: 10vh !important;
}


</style>
