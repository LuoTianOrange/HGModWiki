<template>
    <div class="main">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="WSITEM" name="WSITEM">
                <el-form class="labelbox">
                    <el-form-item class="labeldiv">
                        <el-label for="from">物品ID</el-label>
                        <el-input class="input-1" v-model.number="WSITEM_Parameter.ID"
                            oninput="this.value = this.value.replace(/[^0-9]/g, '');" @input="generateOutput" clearable
                            maxlength="10" type="text" show-word-limit />
                    </el-form-item>

                    <el-form-item label="模板物品ID" class="labeldiv workspace">
                        <client-only><el-select v-model="WSITEM_Parameter.GOBJID" clearable placeholder="GOBJID" filterable
                                remote allow-create default-first-option :remote-method="remoteMethod" :loading="loading"
                                @change="generateOutput">
                                <el-option v-for="item in options" :key="item.id"
                                    :label="item.id + (item.name ? ' (' + item.name + ')' : '')" :value="item.id">
                                    <span style="vertical-align: top;">{{ item.name }}</span> <img :src="item.src"
                                        style="width:30px;object-fit: contain;display:inline-block" v-if="item.src" />
                                </el-option>
                            </el-select></client-only>
                    </el-form-item>
                    <el-form-item class="labeldiv">
                        <el-label for="from">物品中文名</el-label>
                        <el-input class="input-1" v-model="WSITEM_Parameter.nameCn" placeholder="nameCn"
                            @input="generateOutput" clearable type="text" />
                    </el-form-item>
                    <el-form-item class="labeldiv">
                        <el-label for="from">物品英文名</el-label>
                        <el-input class="input-1" v-model="WSITEM_Parameter.nameEn" placeholder="nameEn"
                            @input="generateOutput" clearable type="text" />
                    </el-form-item>
                </el-form>
                <div style="margin-top: 20px;">
                    <!--<el-button type="primary" @click="generateOutput" :icon="Plus">生成JSON</el-button>-->
                    <el-button type="primary" @click="copyToClipboard" :icon="DocumentCopy">复制到剪切板</el-button><br>
                    <el-input type="textarea" :rows="12" v-model="WSITEM_Output" style="margin-top: 20px;"
                        class="el-place" />
                </div>
            </el-tab-pane>

            <el-tab-pane label="CM" name="CM">
                <el-form class="labelbox">
                    <el-form-item class="labeldiv">
                        <el-label for="from">配方ID</el-label>
                        <el-input class="input-1" v-model.number="CM_Parameter.ID"
                            oninput="this.value = this.value.replace(/[^0-9]/g, '');" @input="generateOutput" clearable
                            maxlength="10" type="text" show-word-limit />
                    </el-form-item>
                    <div style="width: 100%; "></div>
                    <el-form-item label="材料1" class="labeldiv workspace">
                        <client-only>
                            <el-select v-model="CM_Parameter.mat1" clearable placeholder="mat1" filterable remote
                                allow-create default-first-option :remote-method="remoteMethod" :loading="loading"
                                @change="generateOutput">
                                <el-option v-for="item in options" :key="item.id"
                                    :label="item.id + (item.name ? ' (' + item.name + ')' : '')" :value="item.id">
                                    <span style="vertical-align: top;">{{ item.name }}</span> <img :src="item.src"
                                        style="width:30px;object-fit: contain;display:inline-block" v-if="item.src" />
                                </el-option>
                            </el-select>
                        </client-only>
                    </el-form-item>
                    <el-form-item class="labeldiv el-from-item">
                        <el-label for="from">材料1数量</el-label>
                        <el-input-number class="input-1" v-model.number="CM_Parameter.mat1num" placeholder="mat1num"
                            :min="1" oninput="this.value = this.value.replace(/[^0-9]/g, '');" @input="generateOutput"
                            clearable maxlength="10" type="text" show-word-limit />
                    </el-form-item>

                    <el-form-item label="材料2" class="labeldiv workspace">
                        <client-only><el-select v-model="CM_Parameter.mat2" clearable placeholder="mat2" filterable remote
                                allow-create default-first-option :remote-method="remoteMethod" :loading="loading"
                                @change="generateOutput">
                                <el-option v-for="item in options" :key="item.id"
                                    :label="item.id + (item.name ? ' (' + item.name + ')' : '')" :value="item.id">
                                    <span style="vertical-align: top;">{{ item.name }}</span> <img :src="item.src"
                                        style="width:30px;object-fit: contain;display:inline-block" v-if="item.src" />
                                </el-option>
                            </el-select></client-only>
                    </el-form-item>
                    <el-form-item class="labeldiv">
                        <el-label for="from">材料2数量</el-label>
                        <el-input-number class="input-1" v-model.number="CM_Parameter.mat2num" placeholder="mat2num"
                            :min="0" oninput="this.value = this.value.replace(/[^0-9]/g, '');" @input="generateOutput"
                            clearable maxlength="10" type="text" show-word-limit />
                    </el-form-item>

                    <el-form-item label="材料3" class="labeldiv workspace">
                        <client-only><el-select v-model="CM_Parameter.mat3" clearable placeholder="mat3" filterable remote
                                allow-create default-first-option :remote-method="remoteMethod" :loading="loading"
                                @change="generateOutput" style="width: 100%">
                                <el-option v-for="item in options" :key="item.id"
                                    :label="item.id + (item.name ? ' (' + item.name + ')' : '')" :value="item.id">
                                    <span style="vertical-align: top;">{{ item.name }}</span> <img :src="item.src"
                                        style="width:30px;object-fit: contain;display:inline-block" v-if="item.src" />
                                </el-option>
                            </el-select></client-only>
                    </el-form-item>
                    <el-form-item class="labeldiv">
                        <el-label for="from">材料3数量</el-label>
                        <el-input-number class="input-1" v-model.number="CM_Parameter.mat3num" placeholder="mat3num"
                            :min="0" oninput="this.value = this.value.replace(/[^0-9]/g, '');" @input="generateOutput"
                            clearable maxlength="10" type="text" show-word-limit />
                    </el-form-item>

                    <el-form-item label="材料4" class="labeldiv workspace">
                        <client-only><el-select v-model="CM_Parameter.mat2" clearable placeholder="mat4" filterable remote
                                allow-create default-first-option :remote-method="remoteMethod" :loading="loading"
                                @change="generateOutput">
                                <el-option v-for="item in options" :key="item.id"
                                    :label="item.id + (item.name ? ' (' + item.name + ')' : '')" :value="item.id">
                                    <span style="vertical-align: top;">{{ item.name }}</span> <img :src="item.src"
                                        style="width:30px;object-fit: contain;display:inline-block" v-if="item.src" />
                                </el-option>
                            </el-select></client-only>
                    </el-form-item>
                    <el-form-item class="labeldiv" >
                        <el-label for="from">材料4数量</el-label>
                        <el-input-number class="input-1" v-model.number="CM_Parameter.mat4num" placeholder="mat4num"
                            :min="0" oninput="this.value = this.value.replace(/[^0-9]/g, '');" @input="generateOutput"
                            clearable maxlength="10" type="text" show-word-limit />
                    </el-form-item>

                    <el-form-item label="输出物品" class="labeldiv workspace">
                        <client-only><el-select v-model="CM_Parameter.result" clearable placeholder="result" filterable
                                remote allow-create default-first-option :remote-method="remoteMethod" :loading="loading"
                                @change="generateOutput">
                                <el-option v-for="item in options" :key="item.id"
                                    :label="item.id + (item.name ? ' (' + item.name + ')' : '')" :value="item.id">
                                    <span style="vertical-align: top;">{{ item.name }}</span> <img :src="item.src"
                                        style="width:30px;object-fit: contain;display:inline-block" v-if="item.src" />
                                </el-option>
                            </el-select></client-only>
                    </el-form-item>
                    <el-form-item class="labeldiv">
                        <el-label for="from">输出物品数量</el-label>
                        <el-input-number class="input-1" v-model.number="CM_Parameter.resultnum" placeholder="resultnum"
                            :min="1" oninput="this.value = this.value.replace(/[^0-9]/g, '');" @input="generateOutput"
                            clearable maxlength="10" type="text" show-word-limit />
                    </el-form-item>

                    <el-form-item label="工作站" class="labeldiv workspace">
                        <client-only><el-select v-model="CM_Parameter.place" filterable placeholder="请选择工作站"
                                @change="generateOutput" style="width: 100%">
                                <el-option v-for="item in places" :key="item.value" :label="item.key" :value="item.value">
                                </el-option>
                            </el-select></client-only>
                    </el-form-item>
                </el-form>
                <div style="margin-top: 20px;">
                    <!--<el-button type="primary" @click="generateOutput" :icon="Plus">生成JSON</el-button>-->
                    <el-button type="primary" @click="copyToClipboard" :icon="DocumentCopy">复制到剪切板</el-button><br>
                    <el-input type="textarea" :rows="12" v-model="CM_Output" style="margin-top: 20px;" class="el-place" />
                </div>
            </el-tab-pane>

            <el-tab-pane label="WSAMMO" name="WSAMMO">
                <el-form class="labelbox">
                    <el-form-item class="labeldiv">
                        <el-label for="from">弹幕ID</el-label>
                        <el-input class="input-1" v-model.number="WSAMMO_Parameter['ID']"
                            oninput="this.value = this.value.replace(/[^0-9]/g, '');" @input="generateOutput" clearable
                            maxlength="10" type="text" show-word-limit />
                    </el-form-item>
                </el-form>
                <div style="margin-top: 20px;">
                    <!--<el-button type="primary" @click="generateOutput" :icon="Plus">生成JSON</el-button>-->
                    <el-button type="primary" @click="copyToClipboard" :icon="DocumentCopy">复制到剪切板</el-button><br>
                    <el-input type="textarea" :rows="20" v-model="WSAMMO_Output" style="margin-top: 20px;"
                        class="el-place" />
                </div>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { DocumentCopy, Plus } from '@element-plus/icons-vue'
import requests from './requests';

const loading = ref(false)
const options = ref([])
const remoteMethod = async (query) => {
    //console.log(query)
    if (query) {
        loading.value = true
        let url = 'https://hgadventure.huijiwiki.com/w/api.php'

        await requests.request({
            url: url,
            method: 'GET',
            params: {
                action: 'ask',
                query: `[[type::物品]] [[${/^\d+$/.test(query) ? 'Id' : '名称'}::~${query}]]|?Id|?名称|?图片`,
                format: 'json'
            }
        }).then((r) => {
            console.log(r.data)
            loading.value = false
            options.value = []
            if (!r.data || !r.data.query.results) return;
            r = r.data.query.results
            let res = []
            Object.keys(r).forEach(i => {
                let v = r[i].printouts
                let src = v['图片'][0]
                if (src.indexOf('.') === -1) src = src + '.png'
                src = 'https://hgadventure.huijiwiki.com/wiki/Special:FilePath/' + src
                res.push({ id: v.Id[0], name: v['名称'][0], src: src })
            })
            options.value = res
        })
    } else {
        options.value = []
    }
}

const activeName = ref('WSITEM')
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

const WSITEM_Parameter = reactive({
    ID: 10001,
    GOBJID: '',
    nameCn: '',
    nameEn: '',
})
const CM_Parameter = reactive({
    ID: 10001,
    mat1: '',
    mat1num: 1,
    mat2: '',
    mat2num: '',
    mat3: '',
    mat3num: '',
    mat4: '',
    mat4num: '',
    result: '',
    resultnum: 1,
    place: 0
})
const WSAMMO_Parameter = reactive({
    ID: 0,
})

const WSITEM_Output = ref('')
const CM_Output = ref('')
const WSAMMO_Output = ref('')

const handleClick = function (tab, e) {
    //console.log(tab, e);
    setTimeout(generateOutput, 10);
}

const toUnicode = function (s) {
    return s.replace(/[^\x00-\x7F]/g, x => "\\u" + ("000" + x.codePointAt(0).toString(16)).slice(-4));
}

//生成json
const generateOutput = () => {
    // console.log(CM_Parameter)  
    switch (activeName.value) {
        case 'WSITEM':
            WSITEM_Output.value = JSON.stringify(WSITEM_Parameter, (k, v) => {
                if (v === "") {
                    if (k === 'GOBJID' || k === 'nameCn') return '必填';
                    return;
                }
                if (typeof v === 'string') {
                    if (k === 'GOBJID') {
                        if (/^\d+$/.test(v)) {
                            return parseInt(v);
                        } else {
                            return '只能是正整数';
                        }
                    }
                    return toUnicode(v);
                }
                return v;
            }, 4).replace('\\\\u', '\\u')
            break
        case 'CM':
            CM_Output.value = JSON.stringify(CM_Parameter, (k, v) => {
                if (v === "") {
                    if (k === 'mat1' || k === 'result') return '必填';
                    if (k === 'mat1num' || k === 'resultnum') return 1;
                    if (k === 'mat2num' && CM_Parameter.mat2 != '') return 1;
                    if (k === 'mat3num' && CM_Parameter.mat3 != '') return 1;
                    if (k === 'mat4num' && CM_Parameter.mat4 != '') return 1;
                    return;
                }
                if (typeof v === 'string') {
                    if (/^\d+$/.test(v)) {
                        return parseInt(v);
                    } else {
                        return '只能是正整数';
                    }
                }
                if (typeof v === 'number') {
                    if ((k === 'mat2num' && CM_Parameter.mat2 === '') || (k === 'mat3num' && CM_Parameter.mat2 === '') || (k === 'mat4num' && CM_Parameter.mat2 === '')) return;
                }
                //console.log(k, CM_Parameter)

                return v;
            }, 4)
            break
        case 'WSAMMO':
            WSAMMO_Output.value = JSON.stringify(WSAMMO_Parameter, (k, v) => {
                if (v === "") {
                    return;
                }
                return v;
            }, 4)
            break
    }

}
//复制文本到剪切板
const copyToClipboard = async () => {
    var r = ''
    switch (activeName.value) {
        case 'WSITEM':
            r = WSITEM_Output.value
            break
        case 'CM':
            r = CM_Output.value
            break
        case 'WSAMMO':
            r = WSAMMO_Output.value
            break
    }
    try {
        await navigator.clipboard.writeText(r)
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


onMounted(() => {
    generateOutput()
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

.workspace .el-select__input {
    width: 100% !important;
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

.el-form-item__content {
    flex-direction: column !important;
    align-items: flex-start !important;
}
</style>