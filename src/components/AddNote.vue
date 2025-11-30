<script setup>
import { ref } from 'vue';
import { useNoteStore } from '../stores/noteStore';
import { useRouter } from 'vue-router';
const noteStore = useNoteStore();
const newTitle = ref('');
const newContent = ref('請輸入筆記內容...');
const isAdded = ref(false);
const showSuccessAlert = ref(false);
const router = useRouter();

const clearPlaceholder = () => {
  document.querySelector('#title').placeholder = '';
};
const clearTextArea = () => {
  newContent.value = '';
};
const createNote = () => {
  if(newTitle.value){
    isAdded.value = noteStore.addNote(newTitle.value,newContent.value);
  }
  if(isAdded.value){
    showSuccessAlert.value = true;
    setTimeout(()=>{
      showSuccessAlert.value = false;
      router.push({ path: '/' });
    },1000);
  }
};
</script>
<template>
<div class="container p-5">
  <div class="alert alert-success text-left" role="alert" v-show="showSuccessAlert">
    更新成功!
  </div>
  <h2 class="mb-5">新增筆記</h2>
  <form @submit.prevent="createNote()">
    <div class="mb-3">
      <input type="text" class="form-control" id="title" placeholder="請輸入標題..." v-model="newTitle" @focus="clearPlaceholder()">
    </div>
    <div class="mb-3">
      <textarea class="form-control" id="note" rows="20" v-model="newContent" @focus="clearTextArea()"></textarea>
    </div>
    <div class="d-flex justify-content-end">
      <button type="submit" class="btn btn-outline-success">儲存 <i class="fa-solid fa-floppy-disk"></i></button>
    </div>
  </form>
</div>
</template>

<style scoped>
  
</style>