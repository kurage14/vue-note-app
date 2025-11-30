<script setup>
import { ref } from 'vue';
import { useNoteStore } from '../stores/noteStore';
import { useRouter } from 'vue-router';
const noteStore = useNoteStore();
const router = useRouter();

const keyword = ref('');
const searchNotes = () => {
    noteStore.searchNotes(keyword.value);
    router.push({name: 'search'});
};
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary bg-light">
        <div class="container-fluid d-flex">
            <router-link :to="{ name: 'home' }" class="navbar-brand">
                <img src="/note_logo.png" alt="" class="logo">
                <span>My Notes</span>
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                <form class="d-flex" role="search" @submit.prevent="searchNotes()">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" @keydown.enter="searchNotes()" v-model="keyword"/>
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.logo{
    width: 50px;
}
</style>