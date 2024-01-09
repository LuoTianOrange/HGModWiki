### JSON快速制作器
#### CM快速制作
<template>
    <div class="main">
        <el-form class="labelbox">
            <el-form-item class="labeldiv">
                <el-label for="from">配方ID</el-label>
                <el-input class="input-1" v-model.number="CMParameter['ID']" oninput="this.value = this.value.replace(/[^0-9]/g, '');" @input="generateOutput" clearable />
            </el-form-item>
            <el-form-item v-for="(label, index) in CMlabel" :key="index" class="labeldiv">
                <el-label for="from" v-if="label !== ''">{{ label }}</el-label>
                <el-input class="input-1" v-model.number="CMParameter[CMlabelKey[index]]" v-if="label !== ''" oninput="this.value = this.value.replace(/[^0-9]/g, '');" @input="generateOutput" clearable />
            </el-form-item>
            <el-form-item label="工作站" class="labeldiv workspace">
                <el-select v-model="CMParameter['place']" placeholder="请选择工作站" @change="generateOutput">
                    <el-option v-for="item in places" :key="item.value" :label="item.key" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div style="margin-top: 20px;">
            <!--<el-button type="primary" @click="generateOutput" :icon="Plus">生成JSON</el-button>-->
            <el-button type="primary" @click="copyToClipboard" :icon="DocumentCopy">复制到剪切板</el-button><br>
            <el-input type="textarea" :rows="12" v-model="outputString" style="margin-top: 20px;"
                class="el-place" @load="generateOutput" />
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { DocumentCopy,Plus } from '@element-plus/icons-vue'
    
//工作站选择
const places = ref([
    { key: '工作台', value: 0 },
    { key: '熔炉', value: 1 },
    { key: '随手制造', value: 2 },
    { key: '超大锅', value: 3 },
    { key: '铁砧', value: 4 },
    { key: '鸟鸟商店', value: 5 },
    { key: '切割机', value: 6 },
    { key: '炼金台', value: 7 },
    { key: '种子转换机', value: 8 },
    { key: '小际姬4407商店', value: 9 },
    { key: '阿米商店', value: 10 },
    { key: '星神商店', value: 11 },
    { key: 'genso商店', value: 12 },
    { key: '明石商店', value: 13 },
    { key: '？？？器械', value: 14 },
    { key: '饰品台', value: 15 },
    { key: '火龙果商店', value: 16 },
    { key: '萤萤商店', value: 17 },
    { key: '星雪商店', value: 18 },
    { key: '？？？器械', value: 19 },
    { key: '电工台', value: 20 },
    { key: '压碳机', value: 21 },
    { key: '亚物质分子转换机', value: 22 },
    { key: '芒芒商店', value: 23 },
    { key: 'leko商店', value: 24 },
    { key: '酿造桶', value: 25 },
    { key: '反物质熔炉', value: 26 },
    { key: '亚原子复制机', value: 27 },
    { key: '百科全书', value: 28 },
    { key: '炼金解析机', value: 29 },
    { key: '中中商店', value: 30 },
    { key: '小际姬1349商店', value: 31 },
    { key: '小库商店', value: 32 },
    { key: '皓际商店', value: 33 },
    { key: 'VV商店', value: 34 },
    { key: '月商店', value: 35 },
    { key: '柠宁商店', value: 36 },
    { key: '沧曙商店', value: 37 },
    { key: '斩斩商店', value: 38 },
    { key: '笔笔商店', value: 39 },
    { key: '材料解析', value: 40 },
    { key: '？？？器械', value: 41 },
    { key: '帕瓦商店', value: 42 },
    { key: '鬼鬼商店', value: 43 },
    { key: '高温熔炉', value: 44 },
    { key: 'cc商店', value: 45 },
    { key: '小际姬424商店', value: 46 },
    { key: '法法商店', value: 47 },
    { key: '魔石熔炉', value: 48 },
    { key: '核子熔炉', value: 49 },
])
//标签
const CMlabel = ref([
    "",
    "材料1的ID",
    "材料1所需数量",
    "材料2的ID",
    "材料2所需数量",
    "材料3的ID",
    "材料3所需数量",
    "输出物品ID)",
    "输出物品获得数量",
])
//参数
const CMParameter = reactive({
    ID: 0,
    mat1: 0,
    mat1num: 0,
    mat2: 0,
    mat2num: 0,
    mat3: 0,
    mat3num: 0,
    result: 0,
    resultnum: 0,
    place: 0
})

const CMlabelKey = ref(Object.keys(CMParameter))
const outputString = ref('')
    
//生成json
const generateOutput = () => {
    // console.log(CMParameter)  
    //CMParameter.place = selectedPlace.value;
    //let result = '{' + '\n'
    //for (let i = 0; i < CMlabelKey.value.length; i++) {
    //    const value = CMParameter[CMlabelKey.value[i]];
    //    result += `"${CMlabelKey.value[i]}":${value},\n`
    //}
    //result = result.slice(0, -2) + '\n}'
    outputString.value = JSON.stringify(CMParameter, (k, v) => {
        if(v === "") {
            return 0
        }
        return v;
    }, 4)
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

generateOutput()
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

.workspace {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

@media screen and (width <=768px) {
    .el-place {
        width: 300px;
    }
}

@media screen and (width > 768px) {
    .el-place {
        width: 500px;
    }
}
</style>
