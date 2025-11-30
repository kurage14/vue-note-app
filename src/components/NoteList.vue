<script setup>
import { useNoteStore } from '../stores/noteStore';
import { ref, onMounted } from 'vue';
const noteStore = useNoteStore();

// deleteModal
const selectedNoteId = ref(0);
const deleteModal = ref(null);
onMounted(()=>{
    deleteModal.value = new bootstrap.Modal('#deleteModal');
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
    <div class="sidebar">
        <div class="container">
            <div class="text-center">
                <router-link  :to="{ name: 'add' }">
                    <button type="button" class="btn btn-dark w-100 mt-3">新增筆記</button>  
                </router-link>
            </div>
            <div class="row">
                <div class="col-12 mb-4">
                    <h5 class="mt-4">重要</h5>
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between" v-for="note in noteStore.pinnedNotes">
                            <router-link :to="{name: 'edit', params: {id: note.id }}">
                                <span>{{ note.title }}</span>
                            </router-link>
                            <div class="icon-group">
                                <i class="fa-solid fa-thumbtack me-2 rotate" @click="noteStore.markedPinned(note.id)"></i>
                                <i class="fa-solid fa-trash" @click="showDeleteModal(note.id)"></i>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="col-12 mb-4">
                    <h5 class="mt-4">筆記列表</h5>
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between" v-for="note in noteStore.unPinnedNotes">
                            <router-link :to="{name: 'edit', params: {id: note.id }}">
                                <span>{{ note.title }}</span>
                            </router-link>
                            <div class="icon-group">
                                <i class="fa-solid fa-thumbtack me-2" @click="noteStore.markedPinned(note.id)"></i>
                                <i class="fa-solid fa-trash" @click="showDeleteModal(note.id)"></i>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- deleteModal -->
    <div class="modal" tabindex="-1" id="deleteModal">
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
</template>

<style scoped>
.sidebar{
    width: 100%;
    background-color: #f0f0f0;
    height: 80vh;
}
.icon-group i{
  cursor: pointer;
}
.icon-group i:hover{
  color:chocolate;
}
.rotate{
color: red;
transform: rotate(45deg);
}
</style>