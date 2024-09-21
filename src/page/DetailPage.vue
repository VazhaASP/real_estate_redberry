<script setup lang="js">
import { ref, onMounted } from "vue";
import { getRealEstate, deleteRealEstate } from "../http/realEstate"
import { useRoute, useRouter } from "vue-router"; 

const realEstate = ref({})
const route = useRoute();
const router = useRouter();
const showModal = ref(false)
const estateId = ref(null)
const  formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

    return `${month}/${day}/${year}`; // Return in MM/DD/YY format
}


const openModal = (id) => {
    showModal.value = true;
    estateId.value = id
  };
  
  // Function to close the modal
  const closeModal = () => {
    showModal.value = false;
  };

  const confirmDeletion = async() =>{
    try {
        await deleteRealEstate(estateId.value).then((res) =>{
            closeModal();
            router.push('/');
        })
    } catch (error) {
        
    }
  }
onMounted(async() => {
    const id = route.params.id;
    await getRealEstate(id).then((res) =>{
        console.log(res);
        if (res.status === 200) {
            realEstate.value = res.data
        }
        
    })
});
</script>
<template>
    <div>
        <a class="back-icon a-style" href="/real_estate_redberry/">
            
            <i class="bi bi-arrow-left-short"></i>
        </a>
        <div class="mt-2">
            <div class="row gx-5">
                <div class="col-7">
                <div class="p-3">
                    <div class="position-relative">
                        <img :src="realEstate.image" class="card-img-top" alt="Real estate image" >
                        <div class="position-absolute top-0 start-0 p-2 text-white bg-dark bg-opacity-50 rounded">
                        {{ realEstate.is_rental == 0 ? "იყიდება" : "ქირავდება" }}
                        </div>
                    </div>
                    <div class="mt-2 ">
                        <p class="created-date text-end ">გამოქვეყნების თარიღი {{ formatDate(realEstate.created_at) }}</p>
                    </div>
                    
                </div>
                </div>
                <div class="col-5">
                <div class="p-3">
                    <p class="price">{{ realEstate.price }} ₾</p>
                    <div class="d-flex flex-column">
                        <div class="d-flex align-items-center mb-3" >
                            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.55527 2.95547C5.5623 -0.0515637 10.4377 -0.0515643 13.4447 2.95547C16.4517 5.96251 16.4517 10.8379 13.4447 13.8449L7.99999 19.2896L2.55527 13.8449C-0.451772 10.8379 -0.451772 5.96251 2.55527 2.95547ZM7.99999 10.6002C9.21501 10.6002 10.2 9.61522 10.2 8.4002C10.2 7.18517 9.21501 6.2002 7.99999 6.2002C6.78496 6.2002 5.79999 7.18517 5.79999 8.4002C5.79999 9.61522 6.78496 10.6002 7.99999 10.6002Z" fill="#808A93"/>
                            </svg>
                            <span class="address ms-2">{{ realEstate.city?.name }}, {{ realEstate.address }}</span>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H16C16.5304 18 17.0391 17.7893 17.4142 17.4142C17.7893 17.0391 18 16.5304 18 16V2C18 1.46957 17.7893 0.960859 17.4142 0.585786C17.0391 0.210714 16.5304 0 16 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V16ZM9 3H15V9H13V5H9V3ZM3 9H5V13H9V15H3V9Z" fill="#021526" fill-opacity="0.5"/>
                            </svg>
                            <span class="address ms-2">ფართი {{ realEstate.area }} მ²</span>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.5625 10.4129C18.1291 10.2226 17.6608 10.1246 17.1875 10.125H4.8125C4.3392 10.1245 3.87097 10.2224 3.4375 10.4125C2.82485 10.6804 2.30353 11.121 1.93724 11.6804C1.57096 12.2398 1.37559 12.8938 1.375 13.5625V18.375C1.375 18.5573 1.44743 18.7322 1.57636 18.8611C1.7053 18.9901 1.88016 19.0625 2.0625 19.0625C2.24484 19.0625 2.4197 18.9901 2.54864 18.8611C2.67757 18.7322 2.75 18.5573 2.75 18.375V18.0313C2.75111 17.9404 2.78769 17.8536 2.85191 17.7894C2.91614 17.7252 3.00293 17.6886 3.09375 17.6875H18.9062C18.9971 17.6886 19.0839 17.7252 19.1481 17.7894C19.2123 17.8536 19.2489 17.9404 19.25 18.0313V18.375C19.25 18.5573 19.3224 18.7322 19.4514 18.8611C19.5803 18.9901 19.7552 19.0625 19.9375 19.0625C20.1198 19.0625 20.2947 18.9901 20.4236 18.8611C20.5526 18.7322 20.625 18.5573 20.625 18.375V13.5625C20.6243 12.8939 20.4289 12.24 20.0626 11.6806C19.6964 11.1213 19.1751 10.6808 18.5625 10.4129Z" fill="#808A93"/>
                            <path d="M16.1562 3.9375H5.84375C5.20557 3.9375 4.59353 4.19102 4.14227 4.64227C3.69102 5.09353 3.4375 5.70557 3.4375 6.34375V9.4375C3.43752 9.46413 3.44373 9.4904 3.45564 9.51422C3.46755 9.53805 3.48483 9.55878 3.50612 9.57478C3.52741 9.59078 3.55213 9.60161 3.57833 9.60642C3.60453 9.61123 3.63148 9.60989 3.65707 9.6025C4.03238 9.49273 4.42146 9.43717 4.8125 9.4375H4.99426C5.03668 9.43777 5.07771 9.42234 5.10944 9.39418C5.14117 9.36602 5.16136 9.32712 5.16613 9.28496C5.20363 8.94903 5.36356 8.63868 5.61537 8.41318C5.86718 8.18768 6.19323 8.06284 6.53125 8.0625H8.9375C9.27574 8.06253 9.60211 8.18722 9.85419 8.41275C10.1063 8.63828 10.2664 8.94881 10.3039 9.28496C10.3087 9.32712 10.3289 9.36602 10.3606 9.39418C10.3923 9.42234 10.4334 9.43777 10.4758 9.4375H11.5268C11.5692 9.43777 11.6102 9.42234 11.642 9.39418C11.6737 9.36602 11.6939 9.32712 11.6987 9.28496C11.7361 8.94925 11.8959 8.63908 12.1474 8.41361C12.399 8.18814 12.7247 8.06316 13.0625 8.0625H15.4688C15.807 8.06253 16.1334 8.18722 16.3854 8.41275C16.6375 8.63828 16.7976 8.94881 16.8352 9.28496C16.8399 9.32712 16.8601 9.36602 16.8919 9.39418C16.9236 9.42234 16.9646 9.43777 17.007 9.4375H17.1875C17.5786 9.43731 17.9676 9.49302 18.3429 9.60293C18.3686 9.61033 18.3955 9.61167 18.4218 9.60683C18.448 9.602 18.4727 9.59113 18.4941 9.57508C18.5154 9.55903 18.5326 9.53824 18.5445 9.51436C18.5564 9.49049 18.5625 9.46417 18.5625 9.4375V6.34375C18.5625 5.70557 18.309 5.09353 17.8577 4.64227C17.4065 4.19102 16.7944 3.9375 16.1562 3.9375Z" fill="#808A93"/>
                            </svg>
                            <span class="address ms-2">საძინებელი {{ realEstate.bedrooms }}</span>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.01717 0.338139C6.80803 0.554674 6.69051 0.848379 6.69045 1.15465V4.14122H1.11507C0.819339 4.14122 0.535715 4.2629 0.326598 4.47948C0.117481 4.69607 0 4.98982 0 5.29612V9.91571C0 10.222 0.117481 10.5158 0.326598 10.7323C0.535715 10.9489 0.819339 11.0706 1.11507 11.0706H6.69045V18H8.9206V11.0706H12.859C13.0225 11.0705 13.1839 11.0333 13.3319 10.9614C13.4799 10.8896 13.6108 10.7849 13.7154 10.6548L15.8709 7.97548C15.9543 7.87172 16 7.74095 16 7.60591C16 7.47088 15.9543 7.34011 15.8709 7.23635L13.7154 4.55698C13.6108 4.42691 13.4799 4.32225 13.3319 4.2504C13.1839 4.17856 13.0225 4.14128 12.859 4.14122H8.9206V1.15465C8.92055 0.926271 8.85513 0.703031 8.7326 0.513154C8.61007 0.323278 8.43594 0.175289 8.23221 0.0878981C8.02849 0.000506892 7.80432 -0.0223635 7.58805 0.0221781C7.37178 0.0667197 7.17311 0.176673 7.01717 0.338139Z" fill="#021526" fill-opacity="0.5"/>
                            </svg>
                            <span class="address ms-2">საფოსტო ინდექსი {{ realEstate.zip_code }}</span>
                        </div>
                        <div class="mt-5 description">
                            <p>{{ realEstate.description }}</p>
                        </div>
                        <div class="author-section p-3 mt-2">
                            <div class="d-flex align-items-center">
                                <img :src="realEstate.agent?.avatar" class="author-avatar rounded-circle"/>
                                <div class="ms-3">
                                    <p class="author-name">{{ realEstate.agent?.name }} {{ realEstate.agent?.surname }}</p>
                                    <span class="role">აგენტი</span>
                                </div>
                            </div>
                            <div class="contact mt-2">
                                <div class="d-flex align-items-center contact-text mb-2">
                                    <i class="bi bi-envelope me-2"></i> 
                                    <span>{{ realEstate.agent?.email }}</span>
                                </div>
                                <div class="d-flex align-items-center contact-text">
                                    <i class="bi bi-telephone me-2"></i> 
                                    <span>{{ realEstate.agent?.phone }}</span>
                                </div>
                            </div>
                            
                        </div>
                        <div class="mt-5">
                            <button type="button" class="btn btn-outline-secondary" @click="openModal(realEstate.id)">ლისტინგის წაშლა</button>
                        </div>
                    </div>
              
                    
                </div>
                </div>
            </div>
            
        </div>
        <div class="modal fade" tabindex="-1" :class="{ show: showModal }" style="display: block" v-if="showModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class=" d-flex justify-content-end p-2">
                        <button type="button" class="btn-close" @click="closeModal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <p>გსურთ წაშალოთ ლისტინგი?</p>
                        <div>
                            <button type="button" class="btn btn-outline-danger me-3" @click="closeModal">გაუქმება</button> 
                            <button type="button" class="btn btn-danger" @click="confirmDeletion">დადასტურება</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.back-icon{
font-size: 30px;
}
.card-img-top{
    height: 670px;
    width: 100%;
}
.price{
    font-family: FiraGO;
font-size: 48px;
font-weight: 700;
line-height: 57.6px;
color: #021526;
}
.address{
    font-family: FiraGO;
font-size: 24px;
font-weight: 400;
line-height: 28.8px;
color: #021526B2;
}
.description{
    font-family: FiraGO;
font-size: 16px;
font-weight: 400;
line-height: 26px;

}
.author-section{
    width: 503px;
height: 174px;
gap: 0px;
border-radius: 8px;
opacity: 0px;
border: 1px solid #DBDBDB

}
.author-avatar{
    width: 72px;
height: 72px;
top: 24px;
left: 20px;
gap: 0px;
opacity: 0px;

}
.author-name{
    font-family: FiraGO;
font-size: 16px;
font-weight: 400;
line-height: 19.2px;
color: #021526;
margin-bottom: 5px !important;

}
.role{
    font-family: FiraGO;
font-size: 14px;
font-weight: 400;
line-height: 16.8px;
text-align: left;
color: #676E76;

}
.contact-text{
    font-family: FiraGO;
font-size: 14px;
font-weight: 400;
line-height: 16.8px;
color: #808A93;

}
.created-date{
    font-family: FiraGO;
font-size: 16px;
font-weight: 400;
line-height: 19.2px;
color: #808A93;


}
</style>