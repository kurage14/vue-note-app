<script setup>
import { ref, watchEffect } from 'vue';
import { useNoteStore } from '../stores/noteStore';
import { useRoute, useRouter } from 'vue-router';

const noteStore = useNoteStore();
const router = useRouter();
const route = useRoute();

// 查詢原有資料並顯示
let noteId = 0;
const noteTitle = ref('');
const noteContent = ref('');
watchEffect(()=>{
  // 取得網址的id參數
  noteId = Number(route.params.id);
  // 取得該id參數的note
  const currentNote = noteStore.notes.find(note => note.id === noteId);

  if(currentNote){
    noteTitle.value = currentNote.title;
    noteContent.value = currentNote.content; 
  }
})

// 儲存變更
const isEdited = ref(false);
const showSuccessAlert = ref(false);
const editNote = () => {
  if(noteTitle.value && noteContent.value){
    isEdited.value = noteStore.editNote(noteId, noteTitle.value, noteContent.value);
  }
  if(isEdited.value){
    showSuccessAlert.value = true;
    setTimeout(()=>{
      showSuccessAlert.value = false;
      router.push({ path: '/' });
    },1000);
  }
}
</script>
<template>
<div class="container p-5">
  <div class="alert alert-success text-left" role="alert" v-show="showSuccessAlert">
    更新成功!
  </div>
  <h2 class="mb-5">編輯筆記</h2>
  <form @submit.prevent="editNote()">
    <div class="mb-3">
        <input type="text" class="form-control" id="title" placeholder="請輸入標題..." v-model="noteTitle">
    </div>
    <div class="mb-3">
        <textarea class="form-control" id="note" rows="20" v-model="noteContent"></textarea>
    </div>
    <div class="d-flex justify-content-end">
      <button type="submit" class="btn btn-outline-success">更新 <i class="fa-solid fa-floppy-disk"></i></button>
    </div>
  </form>
</div>

</template>

<style scoped>
  
</style>