// 静态评估结果 处理数据
// 计算变化
const handleStatusFn = (num1: number, num2: number, type: string) => {
    let status = 0
    if (type === '肩部倾斜' || type === '头部倾斜' || type === '下颚前伸情况') {
        status = num1 > num2 ? 0 : num1 === num2 ? -1 : 1
    } else if (type === '驼背情况') {
        // 标准值47.01
        const l = Math.abs(num1 - 47.01)
        const r = Math.abs(num2 - 47.01)
        status = l > r ? 0 : l === r ? -1 : 1
    } else if (type === '髋部倾斜' || type === 'X/O型腿情况') {
        // 标准值180
        const l = Math.abs(num1 - 180)
        const r = Math.abs(num2 - 180)
        if ((num1 >= 180 && num1 >= 180) || (num1 <= 180 && num2 <= 180)) {
            // value>0 ---->外八  ; value<0----->内八
            status = l > r ? 0 : l === r ? -1 : 1
        } else {
            // 由O型腿变成X型腿 或者由X型腿变成O型腿
            status = num1 > num2 ? 0 : 1
        }
    } else if (type === '内外八情况') {
        // 标准值0
        // 标准值180
        const l = Math.abs(num1 - 0)
        const r = Math.abs(num2 - 0)
        if ((num1 >= 0 && num1 >= 0) || (num1 <= 0 && num2 <= 0)) {
            // value>0 ---->外八  ; value<0----->内八
            status = l > r ? 0 : l === r ? -1 : 1
        } else {
            // 由O型腿变成X型腿 或者由X型腿变成O型腿
            status = num1 > num2 ? 0 : 1
        }
    }

    return status
}
// 处理肩部倾斜数据 兼容旧数据
const handleJBQXDataFn = (data: any) => {
    let num = 0
    let txt = ''
    // 旧数据 左侧
    if (data.jbqxqkR) {
        num = data.jbqxqk
        txt = data.jbqxqkR
    } else {
        // 新数据 分左右
        if (data.jbqxqklR) {
            num = data.jbqxqkl2
            txt = data.jbqxqklR
        } else {
            num = data.jbqxqkr2
            txt = data.jbqxqkrR
        }
    }
    return { num, txt }
}
// 处理头部倾斜数据 兼容旧数据
const handleTBQXDataFn = (data: any) => {
    let num = 0
    let txt = ''
    // 旧数据 左侧
    if (data.tbqxqkR) {
        num = data.tbqxqk
        txt = data.tbqxqkR
    } else {
        // 新数据 分左右
        if (data.tbqxqklR) {
            num = data.tbqxqkl2
            txt = data.tbqxqklR
        } else {
            num = data.tbqxqkr2
            txt = data.tbqxqkrR
        }
    }
    return { num, txt }
}
export default {
    // 处理肩部倾斜
    handleJBQX(d1: any, d2: any) {
        const t1 = handleJBQXDataFn(d1)
        const t2 = handleJBQXDataFn(d2)
        return [{ desc: '肩部倾斜', t1, t2, status: handleStatusFn(t1.num, t2.num, '肩部倾斜') }]
    },
    // 处理内外八情况
    handleNWB(d1: any, d2: any) {
        return [
            {
                desc: '左脚偏移',
                t1: { num: d1.nwbqkl, txt: d1.nwbqklR },
                t2: { num: d2.nwbqkl, txt: d2.nwbqklR },
                status: handleStatusFn(d1.nwbqkl, d2.nwbqkl, '内外八情况'),
            },
            {
                desc: '右脚偏移',
                t1: { num: d1.nwbqkr, txt: d1.nwbqkrR },
                t2: { num: d2.nwbqkr, txt: d2.nwbqkrR },
                status: handleStatusFn(d1.nwbqkr, d2.nwbqkr, '内外八情况'),
            },
        ]
    },
    // 处理 X/O型腿情况
    handleXOL(d1: any, d2: any) {
        return [
            {
                desc: '左腿偏移',
                t1: { num: d1.qjqkxol, txt: d1.qjqkxolR },
                t2: { num: d2.qjqkxol, txt: d2.qjqkxolR },
                status: handleStatusFn(d1.qjqkxol, d2.qjqkxol, 'X/O型腿情况'),
            },
            {
                desc: '右腿偏移',
                t1: { num: d1.qjqkxor, txt: d1.qjqkxorR },
                t2: { num: d2.qjqkxor, txt: d2.qjqkxorR },
                status: handleStatusFn(d1.qjqkxor, d2.qjqkxor, 'X/O型腿情况'),
            },
        ]
    },
    // 处理 髋部倾斜情况
    handleKBQX(d1: any, d2: any) {
        return [
            {
                desc: '髋部倾斜',
                t1: { num: d1.sbqxqk, txt: d1.sbqxqkR },
                t2: { num: d2.sbqxqk, txt: d2.sbqxqkR },
                status: handleStatusFn(d1.sbqxqk, d2.sbqxqk, '髋部倾斜'),
            },
        ]
    },
    // 处理 驼背情况
    handleTB(d1: any, d2: any) {
        return [
            {
                desc: '驼背情况',
                t1: { num: d1.tbqk, txt: d1.tbqkR },
                t2: { num: d2.tbqk, txt: d2.tbqkR },
                status: handleStatusFn(d1.tbqk, d2.tbqk, '驼背情况'),
            },
        ]
    },
    // 处理 头部倾斜情况
    handleTBQX(d1: any, d2: any) {
        const t1 = handleTBQXDataFn(d1)
        const t2 = handleTBQXDataFn(d2)
        return [{ desc: '头部倾斜', t1, t2, status: handleStatusFn(t1.num, t2.num, '头部倾斜') }]
    },
    // 处理 下颚前伸情况
    handleXEQS(d1: any, d2: any) {
        return [
            {
                desc: '下颚前伸情况',
                t1: { num: d1.xeqsqk, txt: d1.xeqsqkR },
                t2: { num: d2.xeqsqk, txt: d2.xeqsqkR },
                status: handleStatusFn(d1.xeqsqk, d2.xeqsqk, '下颚前伸情况'),
            },
        ]
    },
}
