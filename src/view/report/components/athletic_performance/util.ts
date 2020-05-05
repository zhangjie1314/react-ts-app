import _ from 'lodash'
const utils = {
    // 处理评价等级
    handleLevelTxt(str: string): string {
        return str ? str.split(':')[0] : ''
    },
    // 处理标题
    handleContentTxt(str: string): string {
        return str ? str.split(':-')[1] : '数据有误'
    },
    // 处理部位标题
    handleTitleTxt(str: string): string {
        if (!str) return ''
        return str.split(':')[0].split('·')[1]
    },
    // 处理警告提示
    handleWarningTxt(str: string): string {
        return str ? str.split(':')[1] : ''
    },
    // 删除对象key值
    delObjKeyVelFunc(data: any) {},
}

export default {
    // 处理新规则数据
    handleNewDataFunc(data: any, typesArr: any[]): any[] {
        let reslut: any[] = []
        // 力量
        let powerArr = [
            {
                level: utils.handleLevelTxt(data.jfR), // 评价等级
                content: utils.handleContentTxt(data.jfVd), // 标题
                title: utils.handleTitleTxt(data.jfVd), // 部位标题(爆发力)
                warning: utils.handleWarningTxt(data.jfR), // 部位警告提示
                count: {
                    type: 1,
                    number: data.jf,
                }, // 数量
                display: data.jfR, // 是否显示
                desc: data.jfS, // 评价评语
            }, // 卷腹
            {
                level: utils.handleLevelTxt(data.jstjR),
                content: utils.handleContentTxt(data.jstjVd),
                zl: data.jstjZl,
                title: utils.handleTitleTxt(data.jstjVd),
                warning: utils.handleWarningTxt(data.jstjR),
                count: {
                    type: 1,
                    number: data.jstjCount,
                },
                display: data.jstjR,
                desc: data.jstjS, // 评价评语
            }, // 肩上推举
            {
                level: utils.handleLevelTxt(data.pbwtR),
                zl: data.pbwtZl,
                title: utils.handleTitleTxt(data.pbwtVd),
                warning: utils.handleWarningTxt(data.pbwtR),
                content: utils.handleContentTxt(data.pbwtVd),
                count: {
                    type: 1,
                    number: data.pbwtCount,
                },
                display: data.pbwtR,
                desc: data.pbwtS, // 评价评语
            }, // 平板卧推
            {
                level: utils.handleLevelTxt(data.sbxxssR),
                title: utils.handleTitleTxt(data.sbxxssVd),
                warning: utils.handleWarningTxt(data.sbxxssR),
                zl: data.sbxxssZl,
                content: utils.handleContentTxt(data.sbxxssVd),
                count: {
                    type: 1,
                    number: data.sbxxssCount,
                },
                display: data.sbxxssR,
                desc: data.sbxxssS, // 评价评语
            }, // 手臂向心收缩(二头肌)
            {
                level: utils.handleLevelTxt(data.sbxxssZl2r),
                zl: data.sbxxssZl2,
                title: utils.handleTitleTxt(data.sbxxssZl2vd),
                warning: utils.handleWarningTxt(data.sbxxssZl2r),
                content: utils.handleContentTxt(data.sbxxssZl2vd),
                count: {
                    type: 1,
                    number: data.sbxxssCount2,
                },
                display: data.sbxxssZl2r,
                desc: data.sbxxssZl2s, // 评价评语
            }, // 手臂向心收缩(三头肌)
            {
                level: utils.handleLevelTxt(data.ztfzylR),
                zl: data.ztfzylZl,
                title: utils.handleTitleTxt(data.ztfzylVd),
                warning: utils.handleWarningTxt(data.ztfzylR),
                content: utils.handleContentTxt(data.ztfzylVd),
                count: {
                    type: 1,
                    number: data.ztfzylCount,
                },
                display: data.ztfzylR,
                desc: data.ztfzylS, // 评价评语
            }, // 直体负重硬拉
            {
                level: utils.handleLevelTxt(data.fzsdR),
                zl: data.fzsdZl,
                title: utils.handleTitleTxt(data.fzsdVd),
                warning: utils.handleWarningTxt(data.fzsdR),
                content: utils.handleContentTxt(data.fzsdVd),
                count: {
                    type: 1,
                    number: data.fzsdCount,
                },
                display: data.fzsdR,
                desc: data.fzsdS, // 评价评语
            }, // 负重深蹲
            {
                level: utils.handleLevelTxt(data.ldtyR),
                content: utils.handleContentTxt(data.ldtyVd),
                title: utils.handleTitleTxt(data.ldtyVd),
                warning: utils.handleWarningTxt(data.ldtyR),
                count: {
                    type: 2,
                    number: data.ldty,
                },
                display: data.ldtyR,
                desc: data.ldtyS, // 评价评语
            }, // 立定跳远
            {
                level: utils.handleLevelTxt(data.rmsdR),
                content: utils.handleContentTxt(data.rmsdVd),
                title: utils.handleTitleTxt(data.rmsdVd),
                warning: utils.handleWarningTxt(data.rmsdR),
                count: {
                    type: 5,
                    number: data.rmsd,
                },
                display: data.rmsdR,
                desc: data.rmsdS, // 评价评语
            }, // 1RM深蹲
            {
                level: utils.handleLevelTxt(data.rmwtR),
                content: utils.handleContentTxt(data.rmwtVd),
                title: utils.handleTitleTxt(data.rmwtVd),
                warning: utils.handleWarningTxt(data.rmwtR),
                count: {
                    type: 5,
                    number: data.rmwt,
                },
                display: data.rmwtR,
                desc: data.rmwtS, // 评价评语
            }, // 1RM卧推
        ]
        // 筛选出有效信息的数据
        powerArr = powerArr.filter(item => item.display)
        // 删除最大肌力 多组状态下的title warning 字段
        let rArr: any[] = []
        powerArr.map((item: any) => {
            if (item.title === '最大肌力') {
                rArr.push(item)
            }
            if (rArr.length > 1) {
                delete item.title
                delete item.warning
            }
            return item
        })
        // 敏捷
        let agileArr = [
            {
                level: utils.handleLevelTxt(data.jqR),
                content: utils.handleContentTxt(data.jqVd),
                title: utils.handleTitleTxt(data.jqVd),
                warning: utils.handleWarningTxt(data.jqR),
                count: {
                    type: 1,
                    number: data.jqCount,
                },
                display: data.jqR,
                desc: data.jqS, // 评价评语
            }, // 接球
            {
                level: utils.handleLevelTxt(data.mfR),
                content: utils.handleContentTxt(data.mfVd),
                title: utils.handleTitleTxt(data.mfVd),
                warning: utils.handleWarningTxt(data.mfR),
                count: {
                    type: 1,
                    number: data.mfCount,
                },
                display: data.mfR,
                desc: data.mfS, // 评价评语
            }, // 模范动作
            {
                level: utils.handleLevelTxt(data.tcsR),
                content: utils.handleContentTxt(data.tcsVd),
                title: utils.handleTitleTxt(data.tcsVd),
                warning: utils.handleWarningTxt(data.tcsR),
                count: {
                    type: 3,
                    number: data.tcs,
                },
                display: data.tcsR,
                desc: data.tcsS, // 评价评语
            }, // T测试
            {
                level: utils.handleLevelTxt(data.lbxtR),
                content: utils.handleContentTxt(data.lbxtVd),
                title: utils.handleTitleTxt(data.lbxtVd),
                warning: utils.handleWarningTxt(data.lbxtR),
                count: {
                    type: 3,
                    number: data.lbxt,
                },
                display: data.lbxtR,
                desc: data.lbxtS, // 评价评语
            }, // 六边形跳测试 ,
        ]
        // 筛选出有效信息的数据
        agileArr = agileArr.filter(item => item.display)
        // 平衡性
        let balanceArr = [
            {
                level: utils.handleLevelTxt(data.djbyzlR),
                content: utils.handleContentTxt(data.djbyzlVd),
                title: utils.handleTitleTxt(data.djbyzlVd),
                warning: utils.handleWarningTxt(data.djbyzlR),
                count: {
                    type: 3,
                    number: data.djbyzl,
                },
                display: data.djbyzlR,
                desc: data.djbyzlS, // 评价评语
            }, // 单脚闭眼站立
        ]
        // 筛选出有效信息的数据
        balanceArr = balanceArr.filter(item => item.display)
        // 组合最终数据列表
        const arr = _.cloneDeep(typesArr)
        arr.forEach((item: any) => {
            if (item.name === '力量') {
                item.list = powerArr
                reslut.push(item)
            }
            if (item.name === '敏捷') {
                item.list = agileArr
                reslut.push(item)
            }
            if (item.name === '平衡') {
                item.list = balanceArr
                reslut.push(item)
            }
        })
        return reslut
    },
    // 处理旧数据
    handleOldDataFunc(data: any, typesArr: any[]): any[] {
        const reslut: any[] = []
        // 力量
        let powerArr = [
            {
                level: utils.handleLevelTxt(data.jfR), // 评价等级
                content: utils.handleContentTxt(data.jfVd), // 标题
                title: utils.handleTitleTxt(data.jfVd), // 部位标题(爆发力)
                warning: utils.handleWarningTxt(data.jfR), // 部位警告提示
                count: {
                    type: 1,
                    number: data.jf,
                }, // 数量
                display: data.jfR, // 是否显示
                desc: data.jfS, // 评价评语
            }, // 卷腹
            {
                level: utils.handleLevelTxt(data.jstjR),
                content: utils.handleContentTxt(data.jstjVd),
                zl: data.jstjZl,
                title: utils.handleTitleTxt(data.jstjVd),
                warning: utils.handleWarningTxt(data.jstjR),
                count: {
                    type: 1,
                    number: data.jstjCount,
                },
                display: data.jstjR,
                desc: data.jstjS, // 评价评语
            }, // 肩上推举
            {
                level: utils.handleLevelTxt(data.pbwtR),
                zl: data.pbwtZl,
                title: utils.handleTitleTxt(data.pbwtVd),
                warning: utils.handleWarningTxt(data.pbwtR),
                content: utils.handleContentTxt(data.pbwtVd),
                count: {
                    type: 1,
                    number: data.pbwtCount,
                },
                display: data.pbwtR,
                desc: data.pbwtS, // 评价评语
            }, // 平板卧推
            {
                level: utils.handleLevelTxt(data.sbxxssR),
                title: utils.handleTitleTxt(data.sbxxssVd),
                warning: utils.handleWarningTxt(data.sbxxssR),
                zl: data.sbxxssZl,
                content: utils.handleContentTxt(data.sbxxssVd),
                count: {
                    type: 1,
                    number: data.sbxxssCount,
                },
                display: data.sbxxssR,
                desc: data.sbxxssS, // 评价评语
            }, // 手臂向心收缩(二头肌)
            {
                level: utils.handleLevelTxt(data.sbxxssZl2r),
                zl: data.sbxxssZl2,
                title: utils.handleTitleTxt(data.sbxxssZl2vd),
                warning: utils.handleWarningTxt(data.sbxxssZl2r),
                content: utils.handleContentTxt(data.sbxxssZl2vd),
                count: {
                    type: 1,
                    number: data.sbxxssCount2,
                },
                display: data.sbxxssZl2r,
                desc: data.sbxxssZl2s, // 评价评语
            }, // 手臂向心收缩(三头肌)
            {
                level: utils.handleLevelTxt(data.ztfzylR),
                zl: data.ztfzylZl,
                title: utils.handleTitleTxt(data.ztfzylVd),
                warning: utils.handleWarningTxt(data.ztfzylR),
                content: utils.handleContentTxt(data.ztfzylVd),
                count: {
                    type: 1,
                    number: data.ztfzylCount,
                },
                display: data.ztfzylR,
                desc: data.ztfzylS, // 评价评语
            }, // 直体负重硬拉
            {
                level: utils.handleLevelTxt(data.fzsdR),
                zl: data.fzsdZl,
                title: utils.handleTitleTxt(data.fzsdVd),
                warning: utils.handleWarningTxt(data.fzsdR),
                content: utils.handleContentTxt(data.fzsdVd),
                count: {
                    type: 1,
                    number: data.fzsdCount,
                },
                display: data.fzsdR,
                desc: data.fzsdS, // 评价评语
            }, // 负重深蹲
            {
                level: utils.handleLevelTxt(data.ldtyR),
                content: utils.handleContentTxt(data.ldtyVd),
                title: utils.handleTitleTxt(data.ldtyVd),
                warning: utils.handleWarningTxt(data.ldtyR),
                count: {
                    type: 2,
                    number: data.ldty,
                },
                display: data.ldtyR,
                desc: data.ldtyS, // 评价评语
            }, // 立定跳远
        ]
        // 筛选出有填有效信息的数据
        powerArr = powerArr.filter(item => item.display)
        // 删除最大肌力 多组状态下的title warning 字段
        let rArr: any[] = []
        powerArr.map((item: any) => {
            if (item.title === '最大肌力') {
                rArr.push(item)
            }
            console.log(rArr.length)
            if (rArr.length > 1) {
                delete item.title
                delete item.warning
            }
            return item
        })
        // 敏捷
        let agileArr = [
            {
                level: utils.handleLevelTxt(data.djbyzlR),
                content: utils.handleContentTxt(data.djbyzlVd),
                title: utils.handleTitleTxt(data.djbyzlVd),
                warning: utils.handleWarningTxt(data.djbyzlR),
                count: {
                    type: 3,
                    number: data.djbyzl,
                },
                display: data.djbyzlR,
                desc: data.djbyzlS, // 评价评语
            }, // 单脚闭眼站立
            {
                level: utils.handleLevelTxt(data.jqR),
                content: utils.handleContentTxt(data.jqVd),
                title: utils.handleTitleTxt(data.jqVd),
                warning: utils.handleWarningTxt(data.jqR),
                count: {
                    type: 1,
                    number: data.jqCount,
                },
                display: data.jqR,
                desc: data.jqS, // 评价评语
            }, // 接球
            {
                level: utils.handleLevelTxt(data.mfR),
                content: utils.handleContentTxt(data.mfVd),
                title: utils.handleTitleTxt(data.mfVd),
                warning: utils.handleWarningTxt(data.mfR),
                count: {
                    type: 1,
                    number: data.mfCount,
                },
                display: data.mfR,
                desc: data.mfS, // 评价评语
            }, // 模范动作
        ]
        // 筛选出有填有效信息的数据
        agileArr = agileArr.filter(item => item.display)
        // 柔韧
        let pliantArr = [
            {
                level: utils.handleLevelTxt(data.zwtqqR),
                content: utils.handleContentTxt(data.zwtqqVd),
                title: utils.handleTitleTxt(data.zwtqqVd),
                warning: utils.handleWarningTxt(data.zwtqqR),
                count: {
                    type: 2,
                    number: data.zwtqq,
                },
                // display: data.zwtqq,
                display: data.zwtqqR,
                desc: data.zwtqqS, // 评价评语
            }, // 坐立体前屈
            {
                level: utils.handleLevelTxt(data.jbcsdzR),
                content: utils.handleContentTxt(data.jbcsdzVd),
                title: utils.handleTitleTxt(data.jbcsdzVd),
                warning: utils.handleWarningTxt(data.jbcsdzR),
                count: {
                    type: 2,
                    number: data.jbcsdz,
                },
                // display: data.jbcsdz,
                display: data.jbcsdzR,
                desc: data.jbcsdzS, // 评价评语
            }, // 肩部测试动作
            {
                level: utils.handleLevelTxt(data.sjcsdzR),
                content: utils.handleContentTxt(data.sjcsdzVd),
                title: utils.handleTitleTxt(data.sjcsdzVd),
                warning: utils.handleWarningTxt(data.sjcsdzR),
                count: {
                    type: 2,
                    number: data.sjcsdz,
                },
                // display: data.sjcsdz,
                display: data.sjcsdzR,
                desc: data.sjcsdzS, // 评价评语
            }, // 胸椎测试动作
            {
                level: utils.handleLevelTxt(data.thjqcsdzR),
                content: utils.handleContentTxt(data.thjqcsdzVd),
                title: utils.handleTitleTxt(data.thjqcsdzVd),
                warning: utils.handleWarningTxt(data.thjqcsdzR),
                count: {
                    type: 4,
                    number: data.thjqcsdz,
                },
                // display: data.thjqcsdz,
                display: data.thjqcsdzR,
                desc: data.thjqcsdzS, // 评价评语
            }, // 腿后肌群测试动作
            {
                level: utils.handleLevelTxt(data.jgcsdzR),
                content: utils.handleContentTxt(data.jgcsdzVd),
                title: utils.handleTitleTxt(data.jgcsdzVd),
                warning: utils.handleWarningTxt(data.jgcsdzR),
                count: {
                    type: 4,
                    number: data.jgcsdz,
                },
                // display: data.jgcsdz,
                display: data.jgcsdzR,
                desc: data.jgcsdzS, // 评价评语
            }, // 脚踝测试动作
        ]
        // 筛选出有填有效信息的数据
        pliantArr = pliantArr.filter(item => item.display)
        // 组合最终数据列表
        const arr = _.cloneDeep(typesArr)
        arr.forEach((item: any) => {
            if (item.name === '力量') {
                item.list = powerArr
                reslut.push(item)
            }
            if (item.name === '敏捷') {
                item.list = agileArr
                reslut.push(item)
            }
            if (item.name === '平衡') {
                item.name = '柔韧'
                item.list = pliantArr
                reslut.push(item)
            }
        })
        return reslut
    },
    // 处理类别条目数据
    handleTypesListFunc(originData: any[], typesArr: any[]): any[] {
        const reslut: any[] = []
        // 处理原数组
        let originArr = _.cloneDeep(originData)
        if (originArr.length === 1) {
            originArr.concat([
                {
                    name: '　',
                    val: 20,
                },
                {
                    name: ' ',
                    val: 20,
                },
            ])
        } else if (originArr.length === 2) {
            originArr.concat([
                {
                    name: ' ',
                    val: 0,
                },
            ])
        }
        let newOriginArr: any[] = []
        originArr.forEach((item: any[]) => {
            let arr: any[] = []
            item.forEach((itm: any) => {
                // 过滤掉 协调能力 反应能力
                if (['协调能力', '反应能力'].indexOf(itm.name) === -1) {
                    arr.push(itm)
                }
            })
            newOriginArr.push(arr)
        })
        // 处理合并
        const arr = _.cloneDeep(typesArr)
        arr.forEach((item: any, idx: number) => {
            item.list = newOriginArr[idx]
            reslut.push(item)
        })
        return reslut
    },
}
