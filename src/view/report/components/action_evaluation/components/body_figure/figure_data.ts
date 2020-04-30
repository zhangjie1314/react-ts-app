// 人体构造成分数据
const imgUrl = (name: string) => {
    return require(`../../../../../../assets/img/jirou/${name}.png`)
}
export const figureData = {
    // 人体正面位置点
    upDomList: [
        {
            sel: false,
            className: 'rightArm',
            reportArrName: ['右肩偏高'],
            position: '正右肩问题',
            imgList: [
                [
                    // 过度激活
                    {
                        positionName: '斜方肌',
                        imgName: imgUrl('54xfj'),
                    },
                    {
                        positionName: '冈上',
                        imgName: imgUrl('14gs'),
                    },
                    {
                        positionName: '肩胛提肌',
                        imgName: imgUrl('26jjtj'),
                    },
                    {
                        positionName: '小圆肌',
                        imgName: imgUrl('53xyj'),
                    },
                ],
                [
                    // 激活不足
                    {
                        positionName: '前锯肌',
                        imgName: imgUrl('45qjj'),
                    },
                    {
                        positionName: '菱形肌下',
                        imgName: imgUrl('35lxjx'),
                    },
                ],
                [
                    // 指令混乱
                    {
                        positionName: '斜方肌',
                        imgName: imgUrl('54xfj'),
                    },
                    {
                        positionName: '冈上',
                        imgName: imgUrl('14gs'),
                    },
                    {
                        positionName: '肩胛提肌',
                        imgName: imgUrl('26jjtj'),
                    },
                    {
                        positionName: '小圆肌',
                        imgName: imgUrl('53xyj'),
                    },
                    {
                        positionName: '前锯肌',
                        imgName: imgUrl('53xyj'),
                    },
                    {
                        positionName: '菱形肌下',
                        imgName: imgUrl('35lxjx'),
                    },
                ],
            ],
            show: false,
        },
        {
            sel: false,
            className: 'leftArm',
            reportArrName: ['左肩偏高'],
            position: '正左肩问题',
            imgList: [
                [
                    // 过度激活
                    {
                        positionName: '斜方肌',
                        imgName: imgUrl('54xfj'),
                    },
                    {
                        positionName: '冈上',
                        imgName: imgUrl('14gs'),
                    },
                    {
                        positionName: '肩胛提肌',
                        imgName: imgUrl('26jjtj'),
                    },
                    {
                        positionName: '小圆肌',
                        imgName: imgUrl('53xyj'),
                    },
                ],
                [
                    // 激活不足
                    {
                        positionName: '前锯肌',
                        imgName: imgUrl('45qjj'),
                    },
                    {
                        positionName: '菱形肌下',
                        imgName: imgUrl('35lxjx'),
                    },
                ],
                [
                    // 指令混乱
                    {
                        positionName: '斜方肌',
                        imgName: imgUrl('54xfj'),
                    },
                    {
                        positionName: '冈上',
                        imgName: imgUrl('14gs'),
                    },
                    {
                        positionName: '肩胛提肌',
                        imgName: imgUrl('26jjtj'),
                    },
                    {
                        positionName: '小圆肌',
                        imgName: imgUrl('53xyj'),
                    },
                    {
                        positionName: '前锯肌',
                        imgName: imgUrl('45qjj'),
                    },
                    {
                        positionName: '菱形肌下',
                        imgName: imgUrl('35lxjx'),
                    },
                ],
            ],
            show: false,
        },
        {
            sel: false,
            className: 'rightKnee',
            reportArrName: ['右膝内扣', '右膝外翻'],
            position: '正右膝问题',
            imgList: [
                [
                    // 过度激活
                    {
                        positionName: '内收肌群（右）',
                        imgName: imgUrl('40nsjqy'),
                    },
                    {
                        positionName: '股二头肌短头（右）',
                        imgName: imgUrl('17getjdty'),
                    },
                    {
                        positionName: '阔筋膜张肌（右）',
                        imgName: imgUrl('31kjmzjy'),
                    },
                    {
                        positionName: '股外侧肌（右）',
                        imgName: imgUrl('19gwcjy'),
                    },
                    {
                        positionName: '臀中肌（右）',
                        imgName: imgUrl('50tzjy'),
                    },
                    {
                        positionName: '臀大肌（右）',
                        imgName: imgUrl('48tdjy'),
                    },
                    {
                        positionName: '股内侧斜肌（右）',
                        imgName: imgUrl('66gncxjy'),
                    },
                ],
                [
                    // 激活不足
                    {
                        positionName: '内收肌群（右）',
                        imgName: imgUrl('40nsjqy'),
                    },
                    {
                        positionName: '股二头肌短头（右）',
                        imgName: imgUrl('17getjdty'),
                    },
                    {
                        positionName: '阔筋膜张肌（右）',
                        imgName: imgUrl('31kjmzjy'),
                    },
                    {
                        positionName: '股外侧肌（右）',
                        imgName: imgUrl('19gwcjy'),
                    },
                    {
                        positionName: '臀中肌（右）',
                        imgName: imgUrl('50tzjy'),
                    },
                    {
                        positionName: '臀大肌（右）',
                        imgName: imgUrl('48tdjy'),
                    },
                    {
                        positionName: '股内侧斜肌（右）',
                        imgName: imgUrl('66gncxjy'),
                    },
                ],
                [
                    // 指令混乱
                    {
                        positionName: '内收肌群（右）',
                        imgName: imgUrl('40nsjqy'),
                    },
                    {
                        positionName: '股二头肌短头（右）',
                        imgName: imgUrl('17getjdty'),
                    },
                    {
                        positionName: '阔筋膜张肌（右）',
                        imgName: imgUrl('31kjmzjy'),
                    },
                    {
                        positionName: '股外侧肌（右）',
                        imgName: imgUrl('19gwcjy'),
                    },
                    {
                        positionName: '臀中肌（右）',
                        imgName: imgUrl('50tzjy'),
                    },
                    {
                        positionName: '臀大肌（右）',
                        imgName: imgUrl('48tdjy'),
                    },
                    {
                        positionName: '股内侧斜肌（右）',
                        imgName: imgUrl('66gncxjy'),
                    },
                ],
            ],
            show: false,
        },
        {
            sel: false,
            className: 'leftKnee',
            reportArrName: ['左膝内扣', '左膝外翻'],
            position: '正左膝问题',
            imgList: [
                [
                    // 过度激活
                    {
                        positionName: '内收肌群（左）',
                        imgName: imgUrl('41nsjqz'),
                    },
                    {
                        positionName: '股二头肌短头（左）',
                        imgName: imgUrl('18getjdtz'),
                    },
                    {
                        positionName: '阔筋膜张肌（左）',
                        imgName: imgUrl('32kjmzjz'),
                    },
                    {
                        positionName: '股外侧肌（左）',
                        imgName: imgUrl('20gwcjz'),
                    },
                    {
                        positionName: '臀中肌（左）',
                        imgName: imgUrl('51tzjz'),
                    },
                    {
                        positionName: '臀大肌（左）',
                        imgName: imgUrl('49tdjz'),
                    },
                    {
                        positionName: '股内侧斜肌（左）',
                        imgName: imgUrl('65gncxjz'),
                    },
                ],
                [
                    // 激活不足
                    {
                        positionName: '内收肌群（左）',
                        imgName: imgUrl('41nsjqz'),
                    },
                    {
                        positionName: '股二头肌短头（左）',
                        imgName: imgUrl('18getjdtz'),
                    },
                    {
                        positionName: '阔筋膜张肌（左）',
                        imgName: imgUrl('32kjmzjz'),
                    },
                    {
                        positionName: '股外侧肌（左）',
                        imgName: imgUrl('20gwcjz'),
                    },
                    {
                        positionName: '臀中肌（左）',
                        imgName: imgUrl('51tzjz'),
                    },
                    {
                        positionName: '臀大肌（左）',
                        imgName: imgUrl('49tdjz'),
                    },
                    {
                        positionName: '股内侧斜肌（左）',
                        imgName: imgUrl('65gncxjz'),
                    },
                ],
                [
                    // 指令混乱
                    {
                        positionName: '内收肌群（左）',
                        imgName: imgUrl('41nsjqz'),
                    },
                    {
                        positionName: '股二头肌短头（左）',
                        imgName: imgUrl('18getjdtz'),
                    },
                    {
                        positionName: '阔筋膜张肌（左）',
                        imgName: imgUrl('32kjmzjz'),
                    },
                    {
                        positionName: '股外侧肌（左）',
                        imgName: imgUrl('20gwcjz'),
                    },
                    {
                        positionName: '臀中肌（左）',
                        imgName: imgUrl('51tzjz'),
                    },
                    {
                        positionName: '臀大肌（左）',
                        imgName: imgUrl('49tdjz'),
                    },
                    {
                        positionName: '股内侧斜肌（左）',
                        imgName: imgUrl('65gncxjz'),
                    },
                ],
            ],
            show: false,
        },
        {
            sel: false,
            className: 'rightFoot',
            reportArrName: ['右足外摆', '右足扁平足', '右足拇指外翻', '左右足外摆', '左右扁平足', '左右拇指外翻'],
            position: '正右足问题',
            show: false,
            imgList: [
                [
                    // 过度激活
                    {
                        positionName: '比目鱼肌',
                        imgName: imgUrl('2bmyj'),
                    },
                    {
                        positionName: '外侧腓肠肌',
                        imgName: imgUrl('52wcfcj'),
                    },
                    {
                        positionName: '股二头肌短头（右）',
                        imgName: imgUrl('17getjdty'),
                    },
                    {
                        positionName: '胫骨前肌',
                        imgName: imgUrl('27jgqj'),
                    },
                    {
                        positionName: '拇长伸肌',
                        imgName: imgUrl('38mcsj'),
                    },
                ],
                [
                    // 激活不足
                    {
                        positionName: '内侧腓肠肌',
                        imgName: imgUrl('39ncfcj'),
                    },
                    {
                        positionName: '腘绳肌',
                        imgName: imgUrl('21gsj'),
                    },
                    {
                        positionName: '股薄肌',
                        imgName: imgUrl('16gbj'),
                    },
                    {
                        positionName: '缝匠肌',
                        imgName: imgUrl('8fjj'),
                    },
                    {
                        positionName: '拇展肌',
                        imgName: imgUrl('36mzj'),
                    },
                    {
                        positionName: '趾短屈肌',
                        imgName: imgUrl('63cdqj'),
                    },
                ],
                [
                    // 指令混乱
                    {
                        positionName: '比目鱼肌',
                        imgName: imgUrl('2bmyj'),
                    },
                    {
                        positionName: '外侧腓肠肌',
                        imgName: imgUrl('52wcfcj'),
                    },
                    {
                        positionName: '股二头肌短头（右）',
                        imgName: imgUrl('17getjdty'),
                    },
                    {
                        positionName: '胫骨前肌',
                        imgName: imgUrl('27jgqj'),
                    },
                    {
                        positionName: '拇长伸肌',
                        imgName: imgUrl('38mcsj'),
                    },
                    {
                        positionName: '内侧腓肠肌',
                        imgName: imgUrl('39ncfcj'),
                    },
                    {
                        positionName: '腘绳肌',
                        imgName: imgUrl('21gsj'),
                    },
                    {
                        positionName: '股薄肌',
                        imgName: imgUrl('16gbj'),
                    },
                    {
                        positionName: '缝匠肌',
                        imgName: imgUrl('8fjj'),
                    },
                    {
                        positionName: '拇展肌',
                        imgName: imgUrl('36mzj'),
                    },
                    {
                        positionName: '趾短屈肌',
                        imgName: imgUrl('63cdqj'),
                    },
                ],
            ],
        },
        {
            sel: false,
            className: 'leftFoot',
            reportArrName: ['左足外摆', '左足扁平足', '左足拇指外翻', '左右足外摆', '左右扁平足', '左右拇指外翻'],
            position: '正左足问题',
            imgList: [
                [
                    // 过度激活
                    {
                        positionName: '比目鱼肌',
                        imgName: imgUrl('2bmyj'),
                    },
                    {
                        positionName: '外侧腓肠肌',
                        imgName: imgUrl('52wcfcj'),
                    },
                    {
                        positionName: '股二头肌短头（左）',
                        imgName: imgUrl('18getjdtz'),
                    },
                    {
                        positionName: '股二头肌短头（右）',
                        imgName: imgUrl('17getjdty'),
                    },
                    {
                        positionName: '胫骨前肌',
                        imgName: imgUrl('27jgqj'),
                    },
                    {
                        positionName: '拇长伸肌',
                        imgName: imgUrl('38mcsj'),
                    },
                ],
                [
                    // 激活不足
                    {
                        positionName: '内侧腓肠肌',
                        imgName: imgUrl('39ncfcj'),
                    },
                    {
                        positionName: '腘绳肌',
                        imgName: imgUrl('21gsj'),
                    },
                    {
                        positionName: '股薄肌',
                        imgName: imgUrl('16gbj'),
                    },
                    {
                        positionName: '缝匠肌',
                        imgName: imgUrl('8fjj'),
                    },
                    {
                        positionName: '拇展肌',
                        imgName: imgUrl('36mzj'),
                    },
                    {
                        positionName: '趾短屈肌',
                        imgName: imgUrl('63cdqj'),
                    },
                ],
                [
                    // 指令混乱
                    {
                        positionName: '比目鱼肌',
                        imgName: imgUrl('2bmyj'),
                    },
                    {
                        positionName: '外侧腓肠肌',
                        imgName: imgUrl('52wcfcj'),
                    },
                    {
                        positionName: '股二头肌短头（左）',
                        imgName: imgUrl('18getjdtz'),
                    },
                    {
                        positionName: '股二头肌短头（右）',
                        imgName: imgUrl('17getjdty'),
                    },
                    {
                        positionName: '胫骨前肌',
                        imgName: imgUrl('27jgqj'),
                    },
                    {
                        positionName: '拇长伸肌',
                        imgName: imgUrl('38mcsj'),
                    },
                    {
                        positionName: '内侧腓肠肌',
                        imgName: imgUrl('39ncfcj'),
                    },
                    {
                        positionName: '腘绳肌',
                        imgName: imgUrl('21gsj'),
                    },
                    {
                        positionName: '股薄肌',
                        imgName: imgUrl('16gbj'),
                    },
                    {
                        positionName: '缝匠肌',
                        imgName: imgUrl('8fjj'),
                    },
                    {
                        positionName: '拇展肌',
                        imgName: imgUrl('36mzj'),
                    },
                    {
                        positionName: '趾短屈肌',
                        imgName: imgUrl('63cdqj'),
                    },
                ],
            ],
            show: false,
        },
    ],

    // 人体背面位置点
    backDomList: [
        {
            sel: false,
            className: 'backHeader',
            reportArrName: ['头部偏左', '头部偏右'],
            position: '背面头部',
            imgList: [
                [
                    // 过度激活
                    {
                        positionName: '胸小肌',
                        imgName: imgUrl('60xxj'),
                    },
                    {
                        positionName: '斜方肌上侧',
                        imgName: imgUrl('55xfjsc'),
                    },
                    {
                        positionName: '胸锁乳突肌',
                        imgName: imgUrl('59xsrtj'),
                    },
                ],
                [
                    // 激活不足
                ],
                [
                    // 指令混乱
                    {
                        positionName: '胸小肌',
                        imgName: imgUrl('60xxj'),
                    },
                    {
                        positionName: '斜方肌上侧',
                        imgName: imgUrl('55xfjsc'),
                    },
                    {
                        positionName: '胸锁乳突肌',
                        imgName: imgUrl('59xsrtj'),
                    },
                ],
            ],
            show: false,
        },
        {
            sel: false,
            className: 'leftShoulder',
            reportArrName: ['左肩偏高', '左手臂不受控制外展', '左右手臂不受控制外展'],
            position: '背面左肩',
            imgList: [
                [
                    // 过度激活
                    {
                        positionName: '斜方肌上侧',
                        imgName: imgUrl('55xfjsc'),
                    },
                    {
                        positionName: '斜角肌上',
                        imgName: imgUrl('57xjjs'),
                    },
                    {
                        positionName: '肩胛提肌',
                        imgName: imgUrl('26jjtj'),
                    },
                    {
                        positionName: '冈下',
                        imgName: imgUrl('15gx'),
                    },
                    {
                        positionName: '大圆肌',
                        imgName: imgUrl('3dyj'),
                    },
                    {
                        positionName: '小圆肌',
                        imgName: imgUrl('53xyj'),
                    },
                ],
                [
                    // 激活不足
                    {
                        positionName: '斜方肌下',
                        imgName: imgUrl('56xfjxc'),
                    },
                    {
                        positionName: '菱形肌',
                        imgName: imgUrl('34lxj'),
                    },
                    {
                        positionName: '斜方肌',
                        imgName: imgUrl('54xfj'),
                    },
                    {
                        positionName: '三角肌',
                        imgName: imgUrl('46sjj'),
                    },
                ],
                [
                    // 指令混乱
                    {
                        positionName: '斜方肌上侧',
                        imgName: imgUrl('55xfjsc'),
                    },
                    {
                        positionName: '斜角肌上',
                        imgName: imgUrl('57xjjs'),
                    },
                    {
                        positionName: '肩胛提肌',
                        imgName: imgUrl('26jjtj'),
                    },
                    {
                        positionName: '冈下',
                        imgName: imgUrl('15gx'),
                    },
                    {
                        positionName: '大圆肌',
                        imgName: imgUrl('3dyj'),
                    },
                    {
                        positionName: '小圆肌',
                        imgName: imgUrl('53xyj'),
                    },
                    {
                        positionName: '斜方肌下',
                        imgName: imgUrl('56xfjxc'),
                    },
                    {
                        positionName: '菱形肌',
                        imgName: imgUrl('34lxj'),
                    },
                    {
                        positionName: '斜方肌',
                        imgName: imgUrl('54xfj'),
                    },
                    {
                        positionName: '三角肌',
                        imgName: imgUrl('46sjj'),
                    },
                ],
            ],
            show: false,
        },
        {
            sel: false,
            className: 'rightShoulder',
            reportArrName: ['右肩偏高', '右手臂不受控制外展', '左右手臂不受控制外展'],
            position: '背面右肩',
            imgList: [
                [
                    // 过度激活
                    {
                        positionName: '斜方肌上侧',
                        imgName: imgUrl('55xfjsc'),
                    },
                    {
                        positionName: '斜角肌上',
                        imgName: imgUrl('57xjjs'),
                    },
                    {
                        positionName: '肩胛提肌',
                        imgName: imgUrl('26jjtj'),
                    },
                    {
                        positionName: '冈下',
                        imgName: imgUrl('15gx'),
                    },
                    {
                        positionName: '大圆肌',
                        imgName: imgUrl('3dyj'),
                    },
                    {
                        positionName: '小圆肌',
                        imgName: imgUrl('53xyj'),
                    },
                ],
                [
                    // 激活不足
                    {
                        positionName: '斜方肌下',
                        imgName: imgUrl('56xfjxc'),
                    },
                    {
                        positionName: '菱形肌',
                        imgName: imgUrl('34lxj'),
                    },
                    {
                        positionName: '斜方肌',
                        imgName: imgUrl('54xfj'),
                    },
                    {
                        positionName: '三角肌',
                        imgName: imgUrl('46sjj'),
                    },
                ],
                [
                    // 指令混乱
                    {
                        positionName: '斜方肌上侧',
                        imgName: imgUrl('55xfjsc'),
                    },
                    {
                        positionName: '斜角肌上',
                        imgName: imgUrl('57xjjs'),
                    },
                    {
                        positionName: '肩胛提肌',
                        imgName: imgUrl('26jjtj'),
                    },
                    {
                        positionName: '冈下',
                        imgName: imgUrl('15gx'),
                    },
                    {
                        positionName: '大圆肌',
                        imgName: imgUrl('3dyj'),
                    },
                    {
                        positionName: '小圆肌',
                        imgName: imgUrl('53xyj'),
                    },
                    {
                        positionName: '斜方肌下',
                        imgName: imgUrl('56xfjxc'),
                    },
                    {
                        positionName: '菱形肌',
                        imgName: imgUrl('34lxj'),
                    },
                    {
                        positionName: '斜方肌',
                        imgName: imgUrl('54xfj'),
                    },
                    {
                        positionName: '三角肌',
                        imgName: imgUrl('46sjj'),
                    },
                ],
            ],
            show: false,
        },
        {
            sel: false,
            className: 'leftScapula',
            reportArrName: [
                '左肩胛骨外翻',
                '左手食指与隆椎距离远',
                '左肩胛上提',
                '左肩胛外翻',
                '左右肩胛骨外翻',
                '左右肩胛外翻',
                '左右肩胛上提',
            ],
            position: '左肩胛骨',
            imgList: [
                [
                    // 过度激活
                    {
                        positionName: '冈上',
                        imgName: imgUrl('14gs'),
                    },
                    {
                        positionName: '冈下',
                        imgName: imgUrl('15gx'),
                    },
                    {
                        positionName: '胸小肌',
                        imgName: imgUrl('60xxj'),
                    },
                    {
                        positionName: '胸大肌',
                        imgName: imgUrl('58xdj'),
                    },
                    {
                        positionName: '大圆肌',
                        imgName: imgUrl('3dyj'),
                    },
                    {
                        positionName: '小圆肌',
                        imgName: imgUrl('53xyj'),
                    },
                    {
                        positionName: '斜方肌',
                        imgName: imgUrl('54xfj'),
                    },
                    {
                        positionName: '肩胛提肌',
                        imgName: imgUrl('26jjtj'),
                    },
                ],
                [
                    // 激活不足
                    {
                        positionName: '斜方肌下',
                        imgName: imgUrl('56xfjxc'),
                    },
                    {
                        positionName: '菱形肌',
                        imgName: imgUrl('34lxj'),
                    },
                    {
                        positionName: '前锯肌',
                        imgName: imgUrl('45qjj'),
                    },
                    {
                        positionName: '菱形肌下',
                        imgName: imgUrl('35lxjx'),
                    },
                ],
                [
                    // 指令混乱
                    {
                        positionName: '冈上',
                        imgName: imgUrl('14gs'),
                    },
                    {
                        positionName: '冈下',
                        imgName: imgUrl('15gx'),
                    },
                    {
                        positionName: '胸小肌',
                        imgName: imgUrl('60xxj'),
                    },
                    {
                        positionName: '胸大肌',
                        imgName: imgUrl('58xdj'),
                    },
                    {
                        positionName: '大圆肌',
                        imgName: imgUrl('3dyj'),
                    },
                    {
                        positionName: '小圆肌',
                        imgName: imgUrl('53xyj'),
                    },
                    {
                        positionName: '斜方肌',
                        imgName: imgUrl('54xfj'),
                    },
                    {
                        positionName: '肩胛提肌',
                        imgName: imgUrl('26jjtj'),
                    },
                    {
                        positionName: '斜方肌下',
                        imgName: imgUrl('56xfjxc'),
                    },
                    {
                        positionName: '菱形肌',
                        imgName: imgUrl('34lxj'),
                    },
                    {
                        positionName: '前锯肌',
                        imgName: imgUrl('45qjj'),
                    },
                    {
                        positionName: '菱形肌下',
                        imgName: imgUrl('35lxjx'),
                    },
                ],
            ],
            show: false,
        },
        {
            sel: false,
            className: 'rightScapula',
            reportArrName: [
                '右肩胛骨外翻',
                '右手食指与隆椎距离远',
                '右肩胛上提',
                '右肩胛外翻',
                '左右肩胛骨外翻',
                '左右肩胛外翻',
                '左右肩胛上提',
            ],
            position: '右肩胛骨',
            imgList: [
                [
                    // 过度激活
                    {
                        positionName: '冈上',
                        imgName: imgUrl('14gs'),
                    },
                    {
                        positionName: '冈下',
                        imgName: imgUrl('15gx'),
                    },
                    {
                        positionName: '胸小肌',
                        imgName: imgUrl('60xxj'),
                    },
                    {
                        positionName: '胸大肌',
                        imgName: imgUrl('58xdj'),
                    },
                    {
                        positionName: '大圆肌',
                        imgName: imgUrl('3dyj'),
                    },
                    {
                        positionName: '小圆肌',
                        imgName: imgUrl('53xyj'),
                    },
                    {
                        positionName: '斜方肌',
                        imgName: imgUrl('54xfj'),
                    },
                    {
                        positionName: '肩胛提肌',
                        imgName: imgUrl('26jjtj'),
                    },
                ],
                [
                    // 激活不足
                    {
                        positionName: '斜方肌下',
                        imgName: imgUrl('56xfjxc'),
                    },
                    {
                        positionName: '菱形肌',
                        imgName: imgUrl('34lxj'),
                    },
                    {
                        positionName: '前锯肌',
                        imgName: imgUrl('45qjj'),
                    },
                    {
                        positionName: '菱形肌下',
                        imgName: imgUrl('35lxjx'),
                    },
                ],
                [
                    // 指令混乱
                    {
                        positionName: '冈上',
                        imgName: imgUrl('14gs'),
                    },
                    {
                        positionName: '冈下',
                        imgName: imgUrl('15gx'),
                    },
                    {
                        positionName: '胸小肌',
                        imgName: imgUrl('60xxj'),
                    },
                    {
                        positionName: '胸大肌',
                        imgName: imgUrl('58xdj'),
                    },
                    {
                        positionName: '大圆肌',
                        imgName: imgUrl('3dyj'),
                    },
                    {
                        positionName: '小圆肌',
                        imgName: imgUrl('53xyj'),
                    },
                    {
                        positionName: '斜方肌',
                        imgName: imgUrl('54xfj'),
                    },
                    {
                        positionName: '肩胛提肌',
                        imgName: imgUrl('26jjtj'),
                    },
                    {
                        positionName: '斜方肌下',
                        imgName: imgUrl('56xfjxc'),
                    },
                    {
                        positionName: '菱形肌',
                        imgName: imgUrl('34lxj'),
                    },
                    {
                        positionName: '前锯肌',
                        imgName: imgUrl('45qjj'),
                    },
                    {
                        positionName: '菱形肌下',
                        imgName: imgUrl('35lxjx'),
                    },
                ],
            ],
            show: false,
        },
        {
            sel: false,
            className: 'leftAbdomen',
            reportArrName: ['腰部两侧（多裂肌下段）变宽变硬'],
            position: '背面腰部两侧',
            imgList: [
                [
                    // 过度激活
                    {
                        positionName: '腰方肌',
                        imgName: imgUrl('62yfj'),
                    },
                    {
                        positionName: '腰大肌',
                        imgName: imgUrl('61ydj'),
                    },
                ],
                [
                    // 激活不足
                    {
                        positionName: '竖脊肌',
                        imgName: imgUrl('68sjj'),
                    },
                    {
                        positionName: '多裂肌下',
                        imgName: imgUrl('64dljx'),
                    },
                ],
                [
                    // 指令混乱
                    {
                        positionName: '腰方肌',
                        imgName: imgUrl('62yfj'),
                    },
                    {
                        positionName: '腰大肌',
                        imgName: imgUrl('61ydj'),
                    },
                    {
                        positionName: '竖脊肌',
                        imgName: imgUrl('68sjj'),
                    },
                    {
                        positionName: '多裂肌下',
                        imgName: imgUrl('64dljx'),
                    },
                ],
            ],
            show: false,
        },
        {
            sel: false,
            className: 'rightAbdomen',
            reportArrName: ['腰部两侧（多裂肌下段）变宽变硬'],
            position: '背面腰部两侧',
            imgList: [
                [
                    // 过度激活
                    {
                        positionName: '腰方肌',
                        imgName: imgUrl('62yfj'),
                    },
                    {
                        positionName: '腰大肌',
                        imgName: imgUrl('61ydj'),
                    },
                ],
                [
                    // 激活不足
                    {
                        positionName: '竖脊肌',
                        imgName: imgUrl('68sjj'),
                    },
                    {
                        positionName: '多裂肌下',
                        imgName: imgUrl('64dljx'),
                    },
                ],
                [
                    // 指令混乱
                    {
                        positionName: '腰方肌',
                        imgName: imgUrl('62yfj'),
                    },
                    {
                        positionName: '腰大肌',
                        imgName: imgUrl('61ydj'),
                    },
                    {
                        positionName: '竖脊肌',
                        imgName: imgUrl('68sjj'),
                    },
                    {
                        positionName: '多裂肌下',
                        imgName: imgUrl('64dljx'),
                    },
                ],
            ],
            show: false,
        },
        {
            sel: false,
            className: 'leftFoot',
            reportArrName: ['左脚脚跟内斜', '左脚脚跟外斜'],
            position: '背左足',
            imgList: [
                [
                    // 过度激活
                    {
                        positionName: '拇长屈肌',
                        imgName: imgUrl('37mcqj'),
                    },
                    {
                        positionName: '拇展肌',
                        imgName: imgUrl('36mzj'),
                    },
                    {
                        positionName: '比目鱼肌',
                        imgName: imgUrl('2bmyj'),
                    },
                    {
                        positionName: '腓骨长肌',
                        imgName: imgUrl('7fgcj'),
                    },
                    {
                        positionName: '腓骨短肌',
                        imgName: imgUrl('6fgdj'),
                    },
                ],
                [
                    // 激活不足
                ],
                [
                    // 指令混乱
                    {
                        positionName: '拇长屈肌',
                        imgName: imgUrl('37mcqj'),
                    },
                    {
                        positionName: '拇展肌',
                        imgName: imgUrl('36mzj'),
                    },
                    {
                        positionName: '比目鱼肌',
                        imgName: imgUrl('2bmyj'),
                    },
                    {
                        positionName: '腓骨长肌',
                        imgName: imgUrl('7fgcj'),
                    },
                    {
                        positionName: '腓骨短肌',
                        imgName: imgUrl('6fgdj'),
                    },
                ],
            ],
            show: false,
        },
        {
            sel: false,
            className: 'rightFoot',
            reportArrName: ['右脚脚跟内斜', '右脚脚跟外斜'],
            position: '背右足',
            imgList: [
                [
                    // 过度激活
                    {
                        positionName: '拇长屈肌',
                        imgName: imgUrl('37mcqj'),
                    },
                    {
                        positionName: '拇展肌',
                        imgName: imgUrl('36mzj'),
                    },
                    {
                        positionName: '比目鱼肌',
                        imgName: imgUrl('2bmyj'),
                    },
                    {
                        positionName: '腓骨长肌',
                        imgName: imgUrl('7fgcj'),
                    },
                    {
                        positionName: '腓骨短肌',
                        imgName: imgUrl('6fgdj'),
                    },
                ],
                [
                    // 激活不足
                ],
                [
                    // 指令混乱
                    {
                        positionName: '拇长屈肌',
                        imgName: imgUrl('37mcqj'),
                    },
                    {
                        positionName: '拇展肌',
                        imgName: imgUrl('36mzj'),
                    },
                    {
                        positionName: '比目鱼肌',
                        imgName: imgUrl('2bmyj'),
                    },
                    {
                        positionName: '腓骨长肌',
                        imgName: imgUrl('7fgcj'),
                    },
                    {
                        positionName: '腓骨短肌',
                        imgName: imgUrl('6fgdj'),
                    },
                ],
            ],
            show: false,
        },
    ],
}
