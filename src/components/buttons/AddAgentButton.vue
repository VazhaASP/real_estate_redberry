<script setup lang="js">
 import { ref } from "vue";
  import { useField, Form, Field, ErrorMessage } from "vee-validate";
  import * as yup from "yup";
  import { createAgent } from "../../http/agent";
  
  const showModal = ref(false); // State for modal visibility
  const formData = ref({
    name: "",
    surname: "",
    email: "",
    avatar: null,
    tel: ""
  });
  
  // Validation schema using vee-validate with yup
  const nameRules = yup.string().required("Name is required").min(2, "Name must be at least 2 characters");
  const surnameRules = yup.string().required("Surname is required").min(2, "Surname must be at least 2 characters");
  const emailRules = yup
    .string()
    .required("E-mail is required")
    .email("E-mail must be valid")
    .matches(/@redberry.ge$/, "E-mail must end with @redberry.ge");
  const telRules = yup
    .string()
    .required("Phone number is required")
    .matches(/^5\d{8}$/, "Tel-number must be in the format 5XXXXXXXXX");
  
  // Function to open the modal
  const openModal = () => {
    showModal.value = true;
  };
  
  // Function to close the modal
  const closeModal = () => {
    showModal.value = false;
  };
  
  const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.avatar = file;
  }
};

// Form submission handler
const onSubmit = async (values) => {
  try {
    await createAgent(
      values.name,
      values.surname,
      values.email,
      values.tel,
      formData.value.avatar // Pass the uploaded avatar
    );
    console.log("Agent created successfully");
    closeModal(); // Close the modal after successful submission
  } catch (error) {
    console.error("Failed to create agent:", error);
  }
};

</script>
<template>
    <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-danger me-3">  <a href="/create-new-listing"><i class="bi bi-plus"></i> ლისტინგის დამატება</a> </button>
            <button type="button" class="btn btn-outline-danger" @click="openModal">     
                <i class="bi bi-plus"></i> აგენტის დამატება</button>

        </div>

        <div class="modal fade" tabindex="-1" :class="{ show: showModal }" style="display: block" v-if="showModal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header d-flex justify-content-between align-items-center">
        <h5 class="modal-title w-100 text-center">აგენტის დამატება</h5>
        <button type="button" class="btn-close" @click="closeModal"></button>
      </div>
      <div class="modal-body">
        <!-- Validation Form -->
        <Form @submit="onSubmit"></Form>
        <div class="row mb-3">
  <div class="col-md-6">
    <label for="name" class="form-label">სახელი *</label>
    <Field name="name" class="form-control" :rules="nameRules" v-model="formData.name" />
    <ErrorMessage name="name" class="text-danger" />
  </div>

  <div class="col-md-6">
    <label for="surname" class="form-label">გვარი *</label>
    <Field name="name" class="form-control"  v-model="formData.name" />
    <ErrorMessage name="surname" class="text-danger" />
  </div>
</div>

<div class="row">
  <div class="col-md-6 mb-3">
    <label for="email" class="form-label">ელ-ფოსტა</label>
    <Field name="email" class="form-control" :rules="emailRules" v-model="formData.email" />
    <ErrorMessage name="email" class="text-danger" />
  </div>

  <div class="col-md-6 mb-3">
    <label for="tel-number" class="form-label">ტელეფონის ნომერი</label>
    <Field name="tel" class="form-control" :rules="telRules" v-model="formData.tel" />
    <ErrorMessage name="tel" class="text-danger" />
  </div>
  <div class="col-md-6 mb-3 ">
  <label for="avatar" class="form-label">ატვირთე ფოტო</label>
  <div class="custom-file-upload">
    <input type="file" id="avatar" name="avatar" class="form-control custom-div" @change="handleFileUpload" />
    <span class="file-name" v-if="formData.avatar">{{ formData.avatar.name }}</span>
  </div>
  <ErrorMessage name="avatar" class="text-danger" />
</div>

  </div>
</div>
  </div>
</div>
        </div>
        
</template>
<style scoped>
  .modal {
    display: none;
    transition: opacity 0.15s linear;
  }
  
  .modal.show {
    display: block;
    width: 1009px;
height: 784px;
top: 148px;
left: 455px;
gap: 0px;
border-radius: 10px 0px 0px 0px;
opacity: 0px;

  }
  .name{
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
  .surname{

  }
  /* #avatar{
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    border: 1px solid red !important;
    box-sizing: border-box;
  /* border-color:red; */
  /* border-style: dotted; */
  

  .custom-file-upload {
  position: relative;
  display: inline-block;
}

.custom-file-upload input[type="file"] {
  display: none; /* Hide the default file input */
}

input[type=file] {
  width: 100%;
  height: auto;
  border: 1px dotted black; /* Dotted border */
  border-radius: 4px; /* Adjust as needed */
  opacity: 1; /* Make sure it is visible */
}

.file-name {
  display: block;
  margin-top: 5px;
  color: #555; /* Adjust as needed */
}



</style>