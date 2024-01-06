<template>
    <div class="main">
        <form class="labelbox">
            <div v-for="i in CMlabel" :key="i.index" class="labeldiv">
                <label for="from">{{ i }}</label>
                <input class="input-1" />
            </div>
        </form>
        <div>
            <button class="btn-1">生成JSON</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const CMlabel = ref(["ID", "mat1", "mat1num", "mat2", "mat2num", "mat3", "mat3num", "result", "resultnum", "place"])
const CMParameter = ref({
    name: '',
    ID: '',
    mat1: '',
    mat1num: '',
    mat2: '',
    mat2num: '',
    mat3: '',
    mat3num: '',
    result: '',
    resultnum: '',
    place: '',
})
</script>

<style>
.main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.labeldiv {
    margin: 5px 0;
}

.labelbox {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    max-height: 400px;
    flex-wrap: wrap;
}

.btn-1 {
    width: 180px;
    height: 50px;
    border-radius: 10px;
    color: #fff;
    font-size: 1.1rem;
    /* border: 1px solid #d1d1d1; */
    background-color: #727272;
}

.input-1 {
    margin-left: 10px;
    width: 120px;
    height: 40px;
    border: 1px solid #d1d1d1;
    font-size: 1.2rem;
    margin-right: 10px;
    /* background-color: #fff; */
}
</style>