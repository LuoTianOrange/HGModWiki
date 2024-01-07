<template>
    <div class="main">
        <el-form class="labelbox">
            <el-form-item v-for="(label, index) in CMlabel" :key="index" class="labeldiv">
                <el-label for="from">{{ label }}</el-label>
                <el-input class="input-1" v-model="CMParameter[CMlabelKey[index]]" />
            </el-form-item>
            <el-form-item label="工作站" class="labeldiv">
                <el-select v-model="selectedPlace" placeholder="请选择工作站">
                <el-option v-for="item in places" :key="item.value" :label="item.key" :value="item.value">
                </el-option>
            </el-select>
            </el-form-item>
        </el-form>
        <div style="margin-top: 20px;">
            <el-button type="primary" @click="generateOutput">生成JSON</el-button>
            <el-button type="primary" @click="copyToClipboard">复制JSON</el-button><br>
            <el-input type="textarea" :rows="5" placeholder="点击按钮生成json" v-model="outputString"
                style="width: 500px;margin-top: 20px;" />
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const selectedPlace = ref('')
//工作站选择
const places = ref([
    { key: '工作台', value: '1' },
    { key: '铁砧', value: '2' },
    // { key: '工作站3', value: '86' },
])

const CMlabel = ref([
    "ID(炼金物品专用ID)",
    "mat1(配方物品1的ID)",
    "mat1num(配方物品1所需数量)",
    "mat2(配方物品2的ID)",
    "mat2num(配方物品2所需数量)",
    "mat3(配方物品3的ID)",
    "mat3num(配方物品3所需数量)",
    "result(配方结果物品ID)",
    "resultnum(配方结果物品获得数量)",
    "place(工作站ID)"
])
const CMParameter = reactive({
    ID: '',
    mat1: '',
    mat1num: '',
    mat2: '',
    mat2num: '',
    mat3: '',
    mat3num: '',
    result: '',
    resultnum: '',
    place: ''
})

const CMlabelKey = ref(Object.keys(CMParameter))
const outputString = ref('')
//生成json
const generateOutput = () => {
    // console.log(CMParameter)  
    CMParameter.place = selectedPlace.value;
    let result = '{' + '\n'
    for (let i = 0; i < CMlabelKey.value.length; i++) {
        result += `"${CMlabelKey.value[i]}":"${CMParameter[CMlabelKey.value[i]]}",\n`
    }
    result = result.slice(0, -2) + '\n}'
    outputString.value = result
}
//复制文本到剪切板
const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(outputString.value)
        ElMessage({
            message: '复制成功',
            type: 'success',
        })
    } catch (err) {
        ElMessage({
            message: '复制失败',
            type: 'error',
        })
    }
}
</script>

<style>
.main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.labeldiv {
    margin: 5px 0;
    flex-basis: calc(50% - 10px);
}

.labelbox {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.btn-1 {
    margin-top: 20px;
    width: 160px;
    height: 50px;
    border-radius: 10px;
}

.input-1 {}
</style>