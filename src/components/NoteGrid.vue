<script setup>
import { useNoteStore } from '../stores/noteStore';
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
const noteStore = useNoteStore();
const { notes } = storeToRefs(noteStore); //state (狀態) 跟 getters (計算屬性) 解構賦值，同時保有響應式狀態
const { markedPinned } = noteStore; //actions (方法) 直接解構就行

// deleteModal2
const selectedNoteId = ref(0);
const deleteModal = ref(null);
onMounted(()=>{
    deleteModal.value = new bootstrap.Modal('#deleteModal2');
})
const showDeleteModal = (noteId) => {
    selectedNoteId.value = noteId;
    deleteModal.value.show();
}
const confirmDelete = () => {
    noteStore.deleteNote(selectedNoteId.value);
    deleteModal.value.hide();
}
</script>

<template>
<main id="result" class="container mt-4">
    <div class="row d-flex justify-content-start">
        <div class="col-4 mr-2 mb-4" v-for="note in notes">
            <router-link :to="{name: 'edit', params: {id: note.id }}">
                <div class="card">
                    <i class="fa-solid fa-thumbtack me-3 mb-3" :class="{rotate : note.pinned}" @click.prevent="markedPinned(note.id)"></i>
                    <div class="card-body">
                        <h5 class="card-title">{{ note.title }}</h5>
                        <hr>
                        <p class="card-text">{{ note.content }}</p>
                    </div>
                    <div class="d-flex justify-content-end" @click.prevent="showDeleteModal(note.id)">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </router-link>
        </div>
        <!-- <div class="col-4 mr-2 mb-4">            
            <div class="card" v-for="note in noteStore.unPinnedNotes">
                <i class="fa-solid fa-thumbtack me-3 mb-3" @click="noteStore.markedPinned(note.id)"></i>
                <div class="card-body">
                    <h5 class="card-title">{{ note.title }}</h5>
                    <hr>
                    <p class="card-text">{{ note.content }}</p>
                </div>
            </div>
        </div> -->
    </div>
    <!-- deleteModal -->
    <div class="modal" tabindex="-1" id="deleteModal2">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">刪除資料</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>確定刪除此筆資料?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="confirmDelete()">確定</button>
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<style scoped>
.card{
    transition: all 0.3s;
}
.card:hover{
    background-color: #f0f0f0;
    box-shadow: 2px 3px 10px #dedede;
    cursor: pointer;
}
.card i{
  position: relative;
  top: 10px;
  left: 10px;
}
.rotate{
  transform: rotate(45deg);
  color: red;
}
.card i{
    cursor: pointer;
}
.card i:hover{
    color:chocolate;
}
</style>