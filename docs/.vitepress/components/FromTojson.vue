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
                                    <span style="vertical-align: top;">{{ item.name }}</span>
                                    <img :src="item.src" style="width:30px;object-fit: contain;display:inline-block"
                                        v-if="item.src" />
                                    <span style="float:right;color:var(--el-text-color-secondary);font-size: 13px;">{{
                                        item.id }}</span>
                                </el-option>
                            </el-select></client-only>
                    </el-form-item>
                    <el-form-item class="labeldiv" v-for="i in [['物品中文名', 'nameCn'],['物品英文名', 'nameEn'],['物品描述', 'description'],['图片路径', 'iconPath'],]">
                        <el-label for="from">{{ i[0] }}</el-label>
                        <el-input class="input-1" v-model="WSITEM_Parameter[i[1]]" :placeholder="i[1]"
                            @input="generateOutput" clearable type="text" />
                    </el-form-item>
                    <el-form-item class="labeldiv" v-for="i in [['攻击力(饱食度)','atk'],['贴图大小', 'Size'],['贴图位置X', 'FposX'],['贴图位置Y', 'FposY'],['最大堆叠数量', 'maxNum'],['物品价格', 'price']]">
                        <el-label for="from">{{ i[0] }}</el-label>
                        <el-input class="input-1" v-model.number="WSITEM_Parameter[i[1]]" :placeholder="i[1]"
                            @input="generateOutput" clearable type="text" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                    </el-form-item>
                    <el-form-item label="物品类型" class="labeldiv workspace">
                        <client-only>
                            <el-select v-model="WSITEM_Parameter.itemType" clearable placeholder="itemType" filterable @change="generateOutput">
                                <el-option v-for="i in itemTypeGroup" :key="i.index" :label="i.key"
                                    :value="i.value"></el-option>
                            </el-select>
                        </client-only>
                    </el-form-item>
                    <el-form-item label="是否可放于副手" class="labeldiv workspace" placeholder="OHand" >
                        <el-radio-group v-model="WSITEM_Parameter.OHand" @change="generateOutput">
                          <el-radio-button :label="true">是</el-radio-button>
                          <el-radio-button :label="false">否</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                
                <div style="margin-top: 20px;" v-if="WSITEM_Parameter.itemType == 3">
                    <el-label style="font-size: 1.3rem;">武器专用参数</el-label>
                    <el-form class="labelbox">
                        <el-form-item label="武器类型" class="labeldiv workspace">
                            <el-select v-model="WSITEM_Parameter.weaponType" clearable placeholder="weaponType" filterable @change="generateOutput">
                                <el-option v-for="i in weaponTypeGroup" :key="i.index" :label="i.key"
                                    :value="i.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="伤害类型" class="labeldiv workspace">
                            <el-select v-model="WSITEM_Parameter.demageType" clearable placeholder="demageType" filterable @change="generateOutput">
                                <el-option v-for="i in damageTypeGroup" :key="i.index" :label="i.key"
                                    :value="i.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="k[0]" class="labeldiv workspace" v-for="k in [['力量补正','STRRate'],['智力补正','INTRate'],['技巧补正','TECRate']]">
                            <el-select v-model="WSITEM_Parameter[k[1]]" clearable :placeholder="k[1]" filterable @change="generateOutput">
                                <el-option v-for="i in RateGroup" :key="i.index" :label="i.key"
                                    :value="i.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="labeldiv" v-for="i in [['最小攻击力', 'miniATK'], ['弹幕ID', 'AmmoID']]">
                          <el-label for="from">{{ i[0] }}</el-label>
                          <el-input class="input-1" v-model.number="WSITEM_Parameter[i[1]]" :placeholder="i[1]"
                            @input="generateOutput" clearable type="text" oninput="this.value = this.value.replace(/[^0-9]/g, '');"/>
                        </el-form-item>
                        <el-form-item class="labeldiv">
                          <el-label for="from">攻击角度</el-label>
                          <el-input class="input-1" v-model.number="WSITEM_Parameter.DAngle" :placeholder="DAngle"
                            @input="generateOutput" clearable type="text" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                        </el-form-item>
                        <el-form-item class="labeldiv">
                          <el-label for="from">使用弹药类型</el-label>
                          <el-input class="input-1" v-model.number="WSITEM_Parameter.UseAType" :placeholder="UseAType"
                            @input="generateOutput" clearable type="text" oninput="this.value = this.value.replace(/[^0-9]/g, '');" />
                        </el-form-item>
                        <div style="width: 100%;"></div>
                        <el-form-item class="labeldiv">
                          <el-label for="from">反作用力</el-label>
                          <el-input-number class="input-1" v-model="WSITEM_Parameter.PPower" placeholder="PPower"
                            @input="generateOutput" clearable :min="0" />
                        </el-form-item>
                        <el-form-item class="labeldiv">
                          <el-label for="from">弹幕数量</el-label>
                          <el-input-number class="input-1" v-model="WSITEM_Parameter.AmmoNum" placeholder="AmmoNum"
                            @input="generateOutput" clearable :min="1" />
                        </el-form-item>
                        <el-form-item class="labeldiv">
                          <el-label for="from">攻击速度（实际值=该值除100）</el-label>
                          <el-input-number class="input-1" v-model="WSITEM_Parameter.atkSpeed" placeholder="atkSpeed"
                            @input="generateOutput" clearable :min="0" :max="2000" />
                        </el-form-item>
                        <el-form-item class="labeldiv" v-for="i in [['魔力消耗（实际值=该值除100）', 'MPCost'], ['生命消耗（实际值=该值除100）', 'HPCost'], ['耐力消耗（实际值=该值除100）', 'EPCost'], ['G值消耗（实际值=该值除10）', 'GCost'], ['过载消耗', 'OLCost']]">
                          <el-label for="from">{{i[0]}}</el-label>
                          <el-input-number class="input-1" v-model="WSITEM_Parameter[i[1]]" :placeholder="i[1]"
                            @input="generateOutput" clearable :min="0" />
                        </el-form-item>
                        
                        <el-form-item label="是否近战攻击" class="labeldiv workspace">
                            <el-radio-group v-model="WSITEM_Parameter.CloseATK" @change="generateOutput">
                          <el-radio-button :label="true">是</el-radio-button>
                          <el-radio-button :label="false">否</el-radio-button>
                        </el-radio-group>
                        </el-form-item>
                        <el-form-item label="是否随机攻击角度" class="labeldiv workspace">
                          <el-radio-group v-model="WSITEM_Parameter.RDAngle" @change="generateOutput">
                            <el-radio-button :label="true">是</el-radio-button>
                            <el-radio-button :label="false">否</el-radio-button>
                          </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>
                
                <div style="margin-top: 20px;" v-if="WSITEM_Parameter.itemType == 7">
                    <el-label style="font-size: 1.3rem;">建筑专用参数</el-label>
                    <el-form class="labelbox">
                        <el-form-item class="labeldiv el-from-item">
                            <el-label for="from">大建筑类型</el-label>
                            <el-input class="input-1" v-model.number="WSITEM_Parameter.BDType" placeholder="BDType"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '');" @input="generateOutput"
                                clearable maxlength="10" type="text" show-word-limit />
                        </el-form-item>
                        <el-form-item class="labeldiv el-from-item">
                            <el-label for="from">建筑类型</el-label>
                            <el-input class="input-1" v-model.number="WSITEM_Parameter.BuildingType" placeholder="BuildingType"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '');" @input="generateOutput"
                                clearable maxlength="10" type="text" show-word-limit />
                        </el-form-item>
                        <el-form-item class="labeldiv el-from-item">
                            <el-label for="from">光照颜色</el-label>
                            <el-input class="input-1" v-model="WSITEM_Parameter.LightColor" placeholder="LightColor"
                                @input="generateOutput"
                                clearable maxlength="9" type="text" show-word-limit />
                            <client-only><el-color-picker v-model="WSITEM_Parameter.LightColor" show-alpha color-format="hex" :predefine="['#ff4b4b','#55f5ff', '#ffff00', '#ff7c81', '#fb6e92', '#7c9eff', '#81fe7c', '#ffaa4b', '#008000', '#006da0', '#7b92ff', '#eda4ff', '#fea500', '#ff7061', '#fffe84', '#916df6', '#93c0ff', '#93fdff', '#93ffc3', '#c3c3c3', '#FFFAFA']" @change="generateOutput" /></client-only>
                        </el-form-item>
                        <el-form-item class="labeldiv el-from-item">
                            <el-label for="from">光照范围</el-label>
                            <el-input class="input-1" v-model.number="WSITEM_Parameter.LightRange" placeholder="LightRange"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '');" @input="generateOutput"
                                clearable maxlength="10" type="text" show-word-limit />
                        </el-form-item>
                        <el-form-item class="labeldiv el-from-item">
                            <el-label for="from">光照强度</el-label>
                            <el-input class="input-1" v-model.number="WSITEM_Parameter.LightIntensity" placeholder="LightIntensity"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '');" @input="generateOutput"
                                clearable maxlength="10" type="text" show-word-limit />
                        </el-form-item>
                        
                        <el-form-item class="labeldiv el-from-item">
                            <el-label for="from">建筑生命值</el-label>
                            <el-input-number class="input-1" v-model.number="WSITEM_Parameter.BuildHP" placeholder="BuildHP"
                                :min="0" oninput="this.value = this.value.replace(/[^0-9]/g, '');" @input="generateOutput"
                                clearable maxlength="10" type="text" show-word-limit />
                        </el-form-item>
                        
                        <div style="width: 100%;"></div>
                        <el-form-item label="是否有碰撞器" class="labeldiv workspace">
                            <el-radio-group v-model="WSITEM_Parameter.collider" @change="generateOutput">
                          <el-radio-button :label="true">是</el-radio-button>
                          <el-radio-button :label="false">否</el-radio-button>
                        </el-radio-group>
                        </el-form-item>
                        <el-form-item label="是否是地板" class="labeldiv workspace">
                            <el-radio-group v-model="WSITEM_Parameter.surface" @change="generateOutput">
                          <el-radio-button :label="true">是</el-radio-button>
                          <el-radio-button :label="false">否</el-radio-button>
                        </el-radio-group>
                        </el-form-item>
                        <el-form-item label="是否只能放在液体中" class="labeldiv workspace">
                          <el-radio-group v-model="WSITEM_Parameter.BdInSea" @change="generateOutput">
                          <el-radio-button :label="true">是</el-radio-button>
                          <el-radio-button :label="false">否</el-radio-button>
                        </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>
                
                <div style="margin-top: 20px;" v-if="WSITEM_Parameter.itemType == 12 || (WSITEM_Parameter.itemType >= 17 && WSITEM_Parameter.itemType <= 20)">
                    <el-label style="font-size: 1.3rem;">装备/食物专用参数</el-label>
                    <el-form class="labelbox">
                      <el-row :gutter="5" v-for="(item, index) in WSITEM_Parameter.buffs" :key="index">
                        <el-col :span="10">
                          <el-form-item class="labeldiv">
                            <el-label for="from">Buff ID</el-label>
                            <el-input class="input-1" v-model.number="WSITEM_Parameter.buffs[index]" placeholder="buff ID"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '');" @input="generateOutput"
                                clearable maxlength="10" type="text" show-word-limit />
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item class="labeldiv">
                            <el-label for="from">Buff等级</el-label>
                            <el-input-number class="input-1" v-model="WSITEM_Parameter.buffsLV[index]" placeholder="buff LV"
                                :min="1" @input="generateOutput"
                                clearable maxlength="10" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="4" style="flex-direction: column;justify-content: center;align-items: center;">
                          <el-button type="primary" :icon="Plus" circle v-if="index == 0" @click="addBuff"/>
                          <el-button type="danger" :icon="Minus" circle v-if="index != 0" @click="delBuff(index)"/>
                        </el-col>
                      </el-row>
                    </el-form>
                </div>
                
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
                    <template v-for="(ai,i) in [1,0,0,0]">
                      <el-form-item :label="'材料'+(i+1)" class="labeldiv workspace">
                        <client-only>
                            <el-select v-model="CM_Parameter['mat'+(i+1)]" clearable :placeholder="'mat'+(i+1)" filterable remote
                                allow-create default-first-option :remote-method="remoteMethod" :loading="loading"
                                @change="generateOutput">
                                <el-option v-for="item in options" :key="item.id"
                                    :label="item.id + (item.name ? ' (' + item.name + ')' : '')" :value="item.id">
                                    <span style="vertical-align: top;">{{ item.name }}</span>
                                    <img :src="item.src" style="width:30px;object-fit: contain;display:inline-block"
                                        v-if="item.src" />
                                    <span style="float:right;color:var(--el-text-color-secondary);font-size: 13px;">{{
                                        item.id }}</span>
                                </el-option>
                            </el-select>
                        </client-only>
                      </el-form-item>
                      <el-form-item class="labeldiv el-from-item">
                        <el-label for="from">材料{{i+1}}数量</el-label>
                        <el-input-number class="input-1" v-model.number="CM_Parameter['mat'+(i+1)+'num']" :placeholder="'mat'+(i+1)+'num'"
                            :min="ai" oninput="this.value = this.value.replace(/[^0-9]/g, '');" @input="generateOutput"
                            clearable maxlength="10" type="text" show-word-limit />
                      </el-form-item>
                    </template>

                    <el-form-item label="输出物品" class="labeldiv workspace">
                        <client-only><el-select v-model="CM_Parameter.result" clearable placeholder="result" filterable
                                remote allow-create default-first-option :remote-method="remoteMethod" :loading="loading"
                                @change="generateOutput">
                                <el-option v-for="item in options" :key="item.id"
                                    :label="item.id + (item.name ? ' (' + item.name + ')' : '')" :value="item.id">
                                    <span style="vertical-align: top;">{{ item.name }}</span>
                                    <img :src="item.src" style="width:30px;object-fit: contain;display:inline-block"
                                        v-if="item.src" />
                                    <span style="float:right;color:var(--el-text-color-secondary);font-size: 13px;">{{
                                        item.id }}</span>
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
                        <el-input class="input-1" v-model.number="WSAMMO_Parameter.ID"
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
import { DocumentCopy, Plus, Minus } from '@element-plus/icons-vue'
import requests from './requests';

const loading = ref(false)
const options = ref([])

function similar(s, t, f=3) {
    if (!s || !t) {
        return 0
    }
    var l = s.length > t.length ? s.length : t.length
    var n = s.length
    var m = t.length
    var d = []
    var min = function(a, b, c) {
        return a < b ? (a < c ? a : c) : (b < c ? b : c)
    }
    var i, j, si, tj, cost
    if (n === 0) return m
    if (m === 0) return n
    for (i = 0; i <= n; i++) {
        d[i] = []
        d[i][0] = i
    }
    for (j = 0; j <= m; j++) {
        d[0][j] = j
    }
    for (i = 1; i <= n; i++) {
        si = s.charAt(i - 1)
        for (j = 1; j <= m; j++) {
            tj = t.charAt(j - 1)
            if (si === tj) {
                cost = 0
            } else {
                cost = 1
            }
            d[i][j] = min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
        }
    }
    let res = (1 - d[n][m] / l)
    return res.toFixed(f)
}

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
            //console.log(r.data)
            loading.value = false
            options.value = []
            if (!r.data || !r.data.query.results) return;
            r = r.data.query.results
            let res = []
            if (WSITEM_Parameter.ID) res.push({ id: WSITEM_Parameter.ID, name: WSITEM_Parameter.nameCn });
            //console.log(Object.values(r))
            r = Object.values(r)
            r.sort((a, b) => {return similar(b.printouts['名称'][0], query) - similar(a.printouts['名称'][0], query)})
            r.forEach(i => {
                let v = i.printouts
                let src = v['图片'][0]
                if (src.indexOf('.') === -1) src = src + '.png';
                src = 'https://hgadventure.huijiwiki.com/wiki/Special:FilePath/' + src;
                res.push({ id: v.Id[0], name: v['名称'][0], src: src });
            })
            options.value = res
        })
    } else {
        options.value = []
    }
}

const activeName = ref('WSITEM')
//工作站选择
const places = [
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
]

const WSITEM_Parameter = reactive({
    ID: 10001,
    GOBJID: '',
    nameCn: '',
    nameEn: '',
    description: '',
    iconPath: '',
    atk: '',
    quality: 1,
    maxNum: 1,
    price: '',
    Size: '',
    FposX: '',
    FposY: '',
    itemType: '',
    OHand: false,
    weaponType: '',
    demageType: '',
    STRRate: '',
    INTRate: '',
    TECRate: '',
    CloseATK: false,
    RDAngle: false,
    miniATK: '',
    AmmoID: '',
    AmmoNum: '',
    atkSpeed: '',
    MPCost: '',
    HPCost: '',
    EPCost: '',
    GCost: '',
    OLCost: '',
    DAngle: '',
    PPower: '',
    UseAType: '',
    BDType: '',
    BuildingType: '',
    LightColor: '',
    LightRange: '',
    LightIntensity: '',
    BuildHP: '',
    collider: false,
    surface: false,
    BdInSea: false,
    buffs: [''],
    buffsLV: [''],
})

//物品分类
const itemTypeGroup = [
    { 'key': '未知(礼物)', 'value': 1 },
    { 'key': '工具', 'value': 2 },
    { 'key': '武器', 'value': 3 },
    { 'key': '锄头', 'value': 4 },
    { 'key': '种子', 'value': 5 },
    { 'key': '植物', 'value': 6 },
    { 'key': '建筑', 'value': 7 },
    { 'key': '次元钱包', 'value': 8 },
    { 'key': '镐', 'value': 9 },
    { 'key': '箭', 'value': 10 },
    { 'key': '布料', 'value': 11 },
    { 'key': '食物', 'value': 12 },
    { 'key': '铲子', 'value': 13 },
    { 'key': '钓鱼杆', 'value': 14 },
    { 'key': '斧头', 'value': 15 },
    { 'key': '信息', 'value': 16 },
    { 'key': '头盔', 'value': 17 },
    { 'key': '衣服', 'value': 18 },
    { 'key': '鞋子', 'value': 19 },
    { 'key': '饰品', 'value': 20 },
    { 'key': '弹药', 'value': 21 },
    { 'key': '魔甲', 'value': 22 },
    { 'key': '全能开采工具', 'value': 23 },
    { 'key': '未知', 'value': 24 },
    { 'key': '容器', 'value': 25 },
    { 'key': '水壶', 'value': 26 },
    { 'key': '矿石', 'value': 27 },
    { 'key': '木材', 'value': 28 },
    { 'key': '召唤物', 'value': 29 },
    { 'key': '未知(效果)', 'value': 30 },
    { 'key': '魔冠', 'value': 31 },
    { 'key': '魔鞋', 'value': 32 },
    { 'key': '飞弹', 'value': 33 },
    { 'key': '轨道车', 'value': 34 },
    { 'key': '宠物', 'value': 35 },
    { 'key': '事件召唤物', 'value': 36 },
    { 'key': '投掷物', 'value': 37 },
    { 'key': '盲盒', 'value': 38 },
    { 'key': '鱼饵', 'value': 39 },
    { 'key': '肥料', 'value': 40 },
    { 'key': '未知(导线)', 'value': 41 },
    { 'key': '未知(剪线器)', 'value': 42 },
    { 'key': '陨石', 'value': 43 },
    { 'key': '未知(藏宝图)', 'value': 44 },
    { 'key': '土壤肥料', 'value': 45 },
    { 'key': '地板', 'value': 46 },
    { 'key': '技能书', 'value': 47 },
    { 'key': '时钟', 'value': 48 },
    { 'key': '特殊装备', 'value': 49 },
    { 'key': '炼金笔记', 'value': 50 },
    { 'key': '炼金物质', 'value': 51 },
    { 'key': '技能指南', 'value': 52 },
    { 'key': '伙伴', 'value': 53 },
    { 'key': '未知(帮助)', 'value': 54 },
    { 'key': '魔法', 'value': 55 },
    { 'key': '信号弹', 'value': 56 },
    { 'key': '魔导杖', 'value': 57 },
    { 'key': '魔剑', 'value': 58 },
    { 'key': '锭', 'value': 59 },
    { 'key': '护身符', 'value': 60 },
    { 'key': '附魔石', 'value': 61 },
    { 'key': '转生信物', 'value': 62 },
    { 'key': '魔饰', 'value': 63 },
    { 'key': '魔药', 'value': 64 },
    { 'key': '动物', 'value': 65 },
    { 'key': '辅助机', 'value': 66 },
    { 'key': '物质线', 'value': 67 }
]
//武器小分类
const weaponTypeGroup = [
    { 'key': '特殊', 'value': 1 },
    { 'key': '剑', 'value': 2 },
    { 'key': '短剑', 'value': 3 },
    { 'key': '赋予', 'value': 4 },
    { 'key': '照明', 'value': 5 },
    { 'key': '投掷', 'value': 6 },
    { 'key': '长枪', 'value': 7 },
    { 'key': '弓', 'value': 8 },
    { 'key': '手持盾', 'value': 9 },
    { 'key': '特殊', 'value': 10 },
    { 'key': '特殊', 'value': 11 },
    { 'key': '特殊', 'value': 12 },
    { 'key': '战斧', 'value': 13 },
    { 'key': '机关', 'value': 14 },
    { 'key': '伙伴', 'value': 15 },
    { 'key': '特殊', 'value': 16 },
    { 'key': '剑', 'value': 17 },
    { 'key': '特殊', 'value': 18 },
    { 'key': '特殊', 'value': 19 },
    { 'key': '特殊', 'value': 20 },
    { 'key': '鞭', 'value': 21 },
    { 'key': '霰弹枪', 'value': 22 },
    { 'key': '电锯', 'value': 23 },
    { 'key': '回旋镖', 'value': 24 },
    { 'key': '元素爆破', 'value': 25 },
    { 'key': '枪剑', 'value': 26 }
]
//伤害类型
const damageTypeGroup = [
    { 'key': '未知', 'value': -1 },
    { 'key': '魔法', 'value': 1 },
    { 'key': '魔物', 'value': 2 },
    { 'key': '射手', 'value': 3 },
    { 'key': '未知', 'value': 4 },
    { 'key': '恢复', 'value': 5 },
    { 'key': '元素', 'value': 6 },
    { 'key': '机械', 'value': 7 },
    { 'key': '暗伤害', 'value': 8 },
    { 'key': '元素', 'value': 9 },
    { 'key': '未知', 'value': 10 }
]
    
//补正
const RateGroup = [
    { 'key' : '无', 'value' : 0 },
    { 'key' : 'E', 'value' : 1 },
    { 'key' : 'D', 'value' : 2 },
    { 'key' : 'C', 'value' : 3 },
    { 'key' : 'B', 'value' : 4 },
    { 'key' : 'A', 'value' : 5 },
    { 'key' : 'S', 'value' : 6 },
    { 'key' : 'SS', 'value' : 7 },
    { 'key' : 'SSS', 'value' : 8 },
    { 'key' : 'MX', 'value' : 9 },
    { 'key' : 'EX', 'value' : 10 },
    { 'key' : 'GX', 'value' : 11 }
]

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

const addBuff = () => {
  WSITEM_Parameter.buffs.push('');
  WSITEM_Parameter.buffsLV.push(1);
}

const delBuff = (index) => {
  WSITEM_Parameter.buffs.splice(index, 1);
  WSITEM_Parameter.buffsLV.splice(index, 1);
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
                if (WSITEM_Parameter.itemType != 3 && 
                    (k === 'weaponType' || 
                     k === 'demageType' || 
                     k === 'STRRate' || 
                     k === 'INTRate' || 
                     k === 'TECRate' || 
                     k === 'CloseATK' || 
                     k === 'RDAngle' ||
                     k === 'miniATK' ||
                     k === 'AmmoID' ||
                     k === 'AmmoNum' ||
                     k === 'atkSpeed' || 
                     k === 'MPCost' ||
                     k === 'HPCost' ||
                     k === 'EPCost' ||
                     k === 'GCost' ||
                     k === 'OLCost' ||
                     k === 'DAngle' ||
                     k === 'PPower' ||
                     k === 'UseAType')) return;
                if (WSITEM_Parameter.itemType != 7 && 
                    (k === 'BDType' || 
                     k === 'BuildingType' || 
                     k === 'LightColor' ||
                     k === 'LightRange' ||
                     k === 'LightIntensity' ||
                     k === 'BuildHP' || 
                     k === 'collider' || 
                     k === 'surface' || 
                     k === 'BdInSea' )) return;
                if (!(WSITEM_Parameter.itemType == 12 || (WSITEM_Parameter.itemType >= 17 && WSITEM_Parameter.itemType <= 20)) &&
                     (k === 'buffs' || k === 'buffsLV')) return;
                if (typeof v === 'string') {
                    if (k === 'GOBJID') {
                        if (/^\d+$/.test(v)) {
                            return parseInt(v);
                        } else {
                            return '只能是正整数';
                        }
                    }
                    if (k === 'LightColor') {
                      return v.replace('#', '')
                    }
                    return toUnicode(v);
                }
                if (k === 'buffs' || k === 'buffsLV') {
                  return v.filter((x) => {return x != ''});
                }
                return v;
            }, 4).replace('\\\\u', '\\u')
            break
        case 'CM':
            CM_Output.value = JSON.stringify(CM_Parameter, (k, v) => {
                if (v === "" || v === 0) {
                    if (k === 'mat2num' && CM_Parameter.mat2 != '') return 1;
                    if (k === 'mat3num' && CM_Parameter.mat3 != '') return 1;
                    if (k === 'mat4num' && CM_Parameter.mat4 != '') return 1;
                }
                if (v === "") {
                    if (k === 'mat1' || k === 'result') return '必填';
                    if (k === 'mat1num' || k === 'resultnum') return 1;
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
                    if ((k === 'mat2num' && CM_Parameter.mat2 === '') || 
                        (k === 'mat3num' && CM_Parameter.mat3 === '') || 
                        (k === 'mat4num' && CM_Parameter.mat4 === '')) return;
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