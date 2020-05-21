import _ from 'lodash'

// 计算变化
const getSportStatus = (d1: any, d2: any) => {
    const txt1 = d1.txt
    const num1 = d1.num
    const txt2 = d2.txt
    const num2 = d2.num
    if (_.isEmpty(String(num1)) || _.isEmpty(String(num2))) return -1
    // 评价相同
    if (txt1 === txt2) {
        const l_v = Number(num1)
        const r_v = Number(num2)
        return l_v > r_v ? 0 : l_v < r_v ? 1 : -1
    }
    // 评价不同
    const rank_arr = ['很差', '较差', '合格', '较好', '优秀']
    const v_l = rank_arr.findIndex((item) => item === txt1)
    const v_r = rank_arr.findIndex((item) => item === txt2)
    return v_l > v_r ? 0 : v_l < v_r ? 1 : -1
}
// 数组排空
const isArrEmp = (arr: any) => {
    return arr.filter((el: any) => el)
}

/* 处理单个数据
 * type 子类标题
 * d1 对比数据1 d2 对比数据2
 * numKey 数值的key
 * txtKey 文案的key
 * sufix 旧有数据 （看不懂 应该兼容作用）
 * unit 单位
 */
const handleSpanFn = (
    type: string,
    d1: any,
    d2: any,
    numKey: string,
    txtKey: string,
    sufixKey: string,
    unit?: string
) => {
    const t1 = {
        num: d1[numKey] !== null ? d1[numKey] : '',
        txt: d1[txtKey] ? d1[txtKey].split(':')[0] : '',
        sufix: d1[sufixKey] ? `${d1[sufixKey]}kg` : '',
    }
    const t2 = {
        num: d2[numKey] !== null ? d2[numKey] : '',
        txt: d2[txtKey] ? d2[txtKey].split(':')[0] : '',
        sufix: d2[sufixKey] ? `${d2[sufixKey]}kg` : '',
    }
    if (!_.isEmpty(String(t1.num)) || !_.isEmpty(String(t2.num))) {
        return { subTitle: type, t1, t2, status: getSportStatus(t1, t2), unit: unit ? unit : '' }
    }
}

export default {
    // 处理 力量类
    handleStrength(d1: any, d2: any) {
        let arr = []
        if (!_.isEmpty(isArrEmp([handleSpanFn('卷腹', d1, d2, 'jf', 'jfR', '')]))) {
            arr.push({
                desc: '最大肌耐力',
                subList: isArrEmp([handleSpanFn('卷腹', d1, d2, 'jf', 'jfR', '')]),
            })
        }
        let ar = isArrEmp([
            handleSpanFn('肩上推举', d1, d2, 'jstjCount', 'jstjR', 'jstjZl'),
            handleSpanFn('平板卧推', d1, d2, 'pbwtCount', 'pbwtR', 'pbwtZl'),
            handleSpanFn('弘二头肌-手臂向心收缩', d1, d2, 'sbxxssCount', 'sbxxssR', 'sbxxssZl'),
            handleSpanFn('弘三头肌-手臂向心收缩', d1, d2, 'sbxxssCount2', 'sbxxssZl2r', 'sbxxssZl2'),
            handleSpanFn('直体负重硬拉', d1, d2, 'ztfzylCount', 'ztfzylR', 'ztfzylZl'),
            handleSpanFn('负重深蹲', d1, d2, 'fzsdCount', 'fzsdR', 'fzsdZl'),
            handleSpanFn('1RM深蹲', d1, d2, 'rmsd', 'rmsdR', '', 'kg'),
            handleSpanFn('1RM卧推', d1, d2, 'rmwt', 'rmwtR', '', 'kg'),
        ])
        if (!_.isEmpty(ar)) {
            arr.push({
                desc: '最大肌力',
                subList: ar,
            })
        }
        if (!_.isEmpty(isArrEmp([handleSpanFn('立定跳远', d1, d2, 'ldty', 'ldtyR', '', 'cm')]))) {
            arr.push({
                desc: '爆发力',
                subList: isArrEmp([handleSpanFn('立定跳远', d1, d2, 'ldty', 'ldtyR', '', 'cm')]),
            })
        }
        return arr
    },

    // 处理 敏捷类
    handleQuick(d1: any, d2: any) {
        let arr = []
        let ar = isArrEmp([
            handleSpanFn('接球', d1, d2, 'jqCount', 'jqR', ''),
            handleSpanFn('T测试', d1, d2, 'tcs', 'tcsR', '', 's'),
            handleSpanFn('六边形跳', d1, d2, 'lbxt', 'lbxtR', '', 's'),
        ])
        if (!_.isEmpty(ar)) {
            arr.push({
                desc: '反应能力',
                subList: ar,
            })
        }
        if (!_.isEmpty(isArrEmp([handleSpanFn('模仿动作', d1, d2, 'mfCount', 'mfR', '')]))) {
            arr.push({
                desc: '协调能力',
                subList: isArrEmp([handleSpanFn('模仿动作', d1, d2, 'mfCount', 'mfR', '')]),
            })
        }
        return arr
    },
    // 处理 柔韧类
    handleFlexible(d1: any, d2: any) {
        let arr = []
        if (!_.isEmpty(isArrEmp([handleSpanFn('坐位体前屈', d1, d2, 'zwtqq', 'zwtqqR', '', 'cm')]))) {
            arr.push({
                desc: '柔韧性',
                subList: isArrEmp([handleSpanFn('坐位体前屈', d1, d2, 'zwtqq', 'zwtqqR', '', 'cm')]),
            })
        }
        let ar = isArrEmp([
            handleSpanFn('肩部测试动作', d1, d2, 'jbcsdz', 'jbcsdzR', '', 'cm'),
            handleSpanFn('胸椎测试动作', d1, d2, 'sjcsdz', 'sjcsdzR', '', 'cm'),
            handleSpanFn('腿后肌群测试动作', d1, d2, 'thjqcsdz', 'thjqcsdzR', '', '°'),
            handleSpanFn('脚踝测试动作', d1, d2, 'jgcsdz', 'jgcsdzR', '', '°'),
        ])
        if (!_.isEmpty(ar)) {
            ar.push({
                desc: '关节灵活度',
                subList: ar,
            })
        }
        return arr
    },
    // 处理 平衡类
    handleBalance(d1: any, d2: any) {
        let arr = []
        if (!_.isEmpty(isArrEmp([handleSpanFn('单脚闭眼站立', d1, d2, 'djbyzl', 'djbyzlR', '', 's')]))) {
            arr.push({
                desc: '平衡能力',
                subList: isArrEmp([handleSpanFn('单脚闭眼站立', d1, d2, 'djbyzl', 'djbyzlR', '', 's')]),
            })
        }
        return arr
    },
}
