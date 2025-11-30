<script setup>
// import Axios from './components/Axios.vue'
import ToolBar from './components/ToolBar.vue'
import NoteList from './components/NoteList.vue';
</script>

<template>
  <!-- <Axios /> -->
   <header>
    <ToolBar />
   </header>
   <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <NoteList />
      </div>
      <div class="col-9">
        <!-- <h2>右邊欄位</h2> -->
         <router-view />
      </div>
    </div>
   </div>
   <footer>
    <p>Copyright© jellyfish.com</p>
   </footer>
</template>

<style scoped>
footer{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: black;
}
footer p{
    color: white;
    line-height: 50px;
    text-align: center;
    margin: 0;
    width: 100%;
}
</style>
