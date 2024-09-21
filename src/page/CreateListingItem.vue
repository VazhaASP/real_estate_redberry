<script setup lang="js">
import { ref, onMounted } from "vue";
import { useForm,  useField, Form, Field, ErrorMessage } from "vee-validate";
import {getRegions, getCity} from "../http/classificator"
import { getAgents } from "../http/agent";
import { createRealEstate } from "../http/realEstate"
import * as yup from "yup";

const formData = ref({
    address: "",
    region_id: null,
    description: "",
    image: null,
    city_id: null,
    zip_code: "",
    price: "",
    area: "",
    bedrooms: "",
    is_rental: 0,
    agent_id: null
  });

  const addressRules = yup
  .string()
  .required("მისამართი სავალდებულოა")
  .min(2, "მისამართი უნდა იყოს მინიმუმ 2 სიმბოლო");
  const zipCodeRules = yup
  .string()
  .required("საფოსტო კოდი სავალდებულოა")
  .matches(/^\d+$/, "საფოსტო კოდი უნდა იყოს რიცხვითი");

const priceRules = yup
  .string()
  .required("ფასი სავალდებულოა")
  .matches(/^\d+(\.\d{1,2})?$/, "ფასი უნდა იყოს რიცხვითი მნიშვნელობა");

const areaRules = yup
  .string()
  .required("ფართობი სავალდებულოა")
  .matches(/^\d+(\.\d{1,2})?$/, "ფართობი უნდა იყოს რიცხვითი");

const bedroomsRules = yup
  .string()
  .required("საძინებელი სავალდებულოა")
  .matches(/^\d+$/, "საძინებელი უნდა იყოს მთლიანი რიცხვი");

const descriptionRules = yup
  .string()
  .required("აღწერა სავალდებულოა");
//   .min(5, "აღწერა უნდა შედგებოდეს მინიმუმ 5 სიტყვისგან");

const isRentalRules = yup
  .boolean()
  .nullable()
  .required("გაყიდვა/დაქირავება სავალდებულოა");

const agentRules = yup
  .number()
  .nullable()
  .required("აგენტის არჩევა სავალდებულოა");

  const imageRules = yup
  .mixed()
  .required("სურათის ატვირთვა სავალდებულოა") // Image upload is required
  .test("fileType", "სურათი უნდა იყოს JPEG ან PNG ფორმატში", (value) => {
    return value && (value.type === "image/jpeg" || value.type === "image/png");
  })
  .test("fileSize", "სურათის ზომა არ უნდა აღემატებოდეს 1MB-ს", (value) => {
    return value && value.size <= 1024 * 1024; // File size should be <= 1MB
  });

  const regionRules = yup
  .array()
  .min(1, "რეგიონის არჩევა სავალდებულოა") 
  .required("რეგიონის არჩევა სავალდებულოა");

const cityRules = yup
  .array()
  .min(1, "ქალაქის არჩევა სავალდებულოა") 
  .required("ქალაქის არჩევა სავალდებულოა");

const schema = yup.object({
    address:addressRules,
    zip_code: zipCodeRules,
    price: priceRules,
    area: areaRules,
    bedrooms: bedroomsRules,
    description: descriptionRules,
    is_rental: isRentalRules,
    agent_id: agentRules,
    image: imageRules,
    region_id: regionRules,
    city_id: cityRules
});

// Usage of the schema in a form
const { validate, errors, resetForm } = useForm({
  validationSchema: schema,
  initialValues: formData.value
});

  const regionList = ref([]);
  const cityList = ref([]);
  const agent = ref([])


const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.image = file;
  }
};

const onSubmit = async (values) => {
  try {
    const isValid = await validate();
  
  // If form is invalid, return early
  if (!isValid) {
    console.log("Form is invalid. Please correct the errors.");
    return;
  }
  console.log('value', values);
  
    await createRealEstate(
        formData.value.address,
      formData.value.region_id,
      formData.value.description,
      formData.value.image,
      formData.value.city_id,
      formData.value.zip_code,
      formData.value.price,
      formData.value.area,
      formData.value.bedrooms,
      formData.value.is_rental,
      formData.value.agent_id
    );
    console.log("Real Estate created successfully");
  } catch (error) {
    console.error("Failed to create real estate:", error);
  }
};
onMounted( async() =>{
    await getRegions().then((response) =>{
        regionList.value = response.data

    });
await getCity().then((response)=>{
    cityList.value = response.data
});
await getAgents().then((response)=>{
    agent.value = response.data
    console.log(response.data);
    
})

})
  
</script>

<template>
<div class="container mb-5"> 
    <div class=" align-items-center">
        <h5 class="form-title w-100 text-center">ლისტინგის დამატება</h5>
    </div>
    <form @submit.prevent="onSubmit(formData)">
    <section class="mt-5"> 
        <h4 class="section-title">
            გარიგების ტიპი
        </h4>
        <div class="row align-items-start  ">
          
            <div class="row align-items-start">
                <div class="col-12">
                    <div class="radio-container">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="is_rental" id="flexRadioDefault1" value="0" v-model="formData.is_rental">
                            <label class="form-check-label" for="flexRadioDefault1">
                                იყიდება
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="is_rental" id="flexRadioDefault2" value="1" v-model="formData.is_rental" >
                            <label class="form-check-label" for="flexRadioDefault2">
                                ქირავდება
                            </label>
                        </div>
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
                    <label for="address" class="form-label custom-label">მისამართი *</label>
                    <Field name="address" class="form-control custom-field" :rules="addressRules" v-model="formData.address" />
                    <ErrorMessage name="address" class="error-text" />
                    <p class="under-text mt-2">
                        <i class="bi bi-check-lg"></i>
                        მინიმუმ ორი სიმბოლო
                    </p>
                    
                </div>  
          </div>
    <div class="col-6">
        <div class="form-group">
                <label for="zip_code" class="form-label custom-label">საფოსტო ინდექსი *</label>
                <Field name="zip_code" class="form-control custom-field" :rules="zipCodeRules" v-model="formData.zip_code" />
                <ErrorMessage name="zip_code" class="error-text" />
                <p class="under-text mt-2">
                    <i class="bi bi-check-lg"></i>
                    მხოლოდ რიცხვები
                 </p>
            </div>
    
    </div> 
    <div class="col-6">
        <div class="form-group">
                <label for="surname" class="form-label custom-label">რეგიონი *</label>
                 <Field name="region_id" class="form-control " :rules="regionRules"  >
                    <select class="form-select custom-field" aria-label="Default select example" v-model="formData.region_id">
                        <option selected></option>
                        <option  v-for="(item, index) in regionList" :value="item.id">{{ item.name }}</option>
                    </select>
                 </Field>
                 <ErrorMessage name="region_id" class="error-text" />
            </div>  
          </div>
          <div class="col-6">
                <div class="form-group" v-if="formData.region_id">
                    <label for="city_id" class="form-label custom-label">ქალაქი *</label>
                    <Field name="city_id" class="form-control " :rules="cityRules"  > 
                        <select class="form-select custom-field" aria-label="Default select example" v-model="formData.city_id">
                            <option selected></option>
                            <option v-for="(item,index) in cityList" :value="item.id">{{ item.name }}</option>
                        
                        
                        </select>
                    </Field>
                    <ErrorMessage name="city_id" class="error-text" />
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
                    <label for="price" class="form-label custom-label">ფასი *</label>
                    <Field name="price" class="form-control custom-field" :rules="priceRules" v-model="formData.price" />
                    <ErrorMessage name="price" class="error-text" />
                    <p class="under-text mt-2">
                        <i class="bi bi-check-lg"></i>
                        მხოლოდ რიცხვები
                    </p>
                </div>  
            </div>
            <div class="col-6">
                <div class="form-group">
                    <label for="area" class="form-label custom-label">ფართობი *</label>
                    <Field name="area" class="form-control custom-field" :rules="areaRules" v-model="formData.area" />
                    <ErrorMessage name="area" class="error-text" />
                    <p class="under-text mt-2">
                        <i class="bi bi-check-lg"></i>
                        მხოლოდ რიცხვები
                    </p>
                </div>
            
            </div> 
            <div class="col-6">
                <div class="form-group">
                    <label for="bedrooms" class="form-label custom-label">საძინებლების რაოდენობა * </label>
                    <Field name="bedrooms" class="form-control custom-field" :rules="bedroomsRules" v-model="formData.bedrooms" />
                    <ErrorMessage name="bedrooms" class="error-text" />
                    <p class="under-text mt-2">
                        <i class="bi bi-check-lg"></i>
                        მხოლოდ რიცხვები
                    </p>
                </div>  
            </div>
            <div class="col-12">
                <div class="form-group">
                    <label for="description" class="form-label custom-label">აღწერა *</label>
                    <Field name="description" class="form-control" :rules="descriptionRules"  > 
                        <textarea class="form-control custom-field"  id="floatingTextarea2" style="height: 100px" v-model="formData.description"></textarea>
                    </Field>
                    <ErrorMessage name="description" class="error-text" />
                    <p class="under-text mt-2">
                        <i class="bi bi-check-lg"></i>
                        მინიმუმ ხუთი სიტყვა
                    </p>
                </div> 
            </div>
            <div class="col-md-12 my-3">
                <label for="image" class="form-label custom-label">ატვირთე ფოტო *</label>
                <div class="custom-file-upload d-flex justify-content-center align-items-center">
                    <label for="formFile" class="form-label w-100 h-100 d-flex justify-content-center align-items-center position-relative">
                    <span class="icon"><i class="bi bi-plus-circle"></i></span>
                    </label>
                    <Field type="file" id="formFile" name="image" class="position-absolute top-0 start-0 w-100 h-100"  @change="handleFileUpload" />

                </div>
                <span class="file-name" v-if="formData.image">{{ formData.image.name }}</span>
                <ErrorMessage name="image" class="error-text" />
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
                        <label for="agent_id" class="form-label custom-label">აირჩიე *</label>
                        <Field name="agent_id" class="form-control "  :rules="agentRules">
                            <select class="form-select custom-field" aria-label="Default select example" v-model="formData.agent_id">
                                <option selected></option>
                                <option v-for="(item,index) in agent" :value="item.id">{{ item.name }}</option>
                            </select>
                        </Field>
                        <ErrorMessage name="agent_id" class="error-text" />
                    </div>  
             </div> 
        </div>
    </section>
    <section class="button-section"> 
        <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-outline-danger me-3">გაუქმება</button> 
            <button type="submit" class="btn btn-danger">დაამატე ლისტინგი</button>
        </div>
        
    </section>
</Form>
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
