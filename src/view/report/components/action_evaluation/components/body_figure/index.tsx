// 人体图组件
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BfStyle from './index.module.scss'
// import swiper from 'swiper/dist/js/swiper.min.js'
// import swStyle from 'swiper/dist/css/swiper.min.css'
import frontImg from '@assets/img/front3.0.png'
import backImg from '@assets/img/back3.0.png'

interface fblObjType {
    num?: number
    pj?: string
    bmi?: string
    jb?: number
    photo?: string
}
export default class BodyFigure extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            frontIdx: null,
            backIdx: null,
            mascles: [],
            isShow: null,
        }
    }
    static defaultProps = { params: {} }
    static propType = { params: PropTypes.object }

    clickDomFn(e: any, obj: any, idx: number, type: string) {
        e.stopPropagation()
        const { params } = this.props
        let { frontIdx, backIdx, mascles, isShow } = this.state
        if (type === 'front') {
            isShow = 'front'
            frontIdx = idx
            mascles = [...params.front[idx].imglist]
        } else {
            isShow = 'back'
            backIdx = idx
            mascles = [...params.back[idx].imglist]
        }
        this.setState({ frontIdx, backIdx, mascles, isShow })
    }
    clickCancelFn = () => {
        let { isShow } = this.state
        isShow = null
        this.setState({ isShow })
    }
    componentDidMount() {
        // var mySwiper: any = new swiper('.swiper-container', {
        //     // autoplay: true,
        //     pagination: {
        //         el: '.swiper-pagination',
        //     },
        // })
    }
    render() {
        const { params } = this.props
        return (
            <div className={BfStyle.figureBox} onClick={this.clickCancelFn}>
                {/* 正面 */}
                <div
                    className={`${BfStyle.front} ${BfStyle.modules} ${
                        this.state.isShow === null
                            ? ''
                            : this.state.isShow === 'front'
                            ? BfStyle.toFace
                            : BfStyle.outFace
                    }`}
                >
                    <div className={BfStyle.figureImg}>
                        <img src={frontImg} alt='人体图前' />
                        {params.front !== undefined
                            ? params.front.map((item: any, idx: number) => {
                                  return (
                                      <div
                                          key={idx}
                                          className={`${BfStyle.dots} ${BfStyle[item.className]}`}
                                          onClick={e => {
                                              this.clickDomFn(e, item, idx, 'front')
                                          }}
                                      >
                                          <span className={BfStyle.mask}></span>
                                          <span
                                              className={`${BfStyle.dot} ${
                                                  idx === this.state.frontIdx ? BfStyle.red : ''
                                              }`}
                                          ></span>
                                      </div>
                                  )
                              })
                            : ''}
                    </div>
                </div>
                {/* 背面 */}
                <div
                    className={`${BfStyle.back} ${BfStyle.modules} ${
                        this.state.isShow === null
                            ? ''
                            : this.state.isShow === 'back'
                            ? BfStyle.toFace
                            : BfStyle.outFace
                    }`}
                >
                    <div className={BfStyle.figureImg}>
                        <img src={backImg} alt='人体图后' />
                        {params.back !== undefined
                            ? params.back.map((item: any, idx: number) => {
                                  return (
                                      <div
                                          key={idx}
                                          className={`${BfStyle.dots} ${BfStyle[item.className]}`}
                                          onClick={e => {
                                              this.clickDomFn(e, item, idx, 'back')
                                          }}
                                      >
                                          <span className={BfStyle.mask}></span>
                                          <span
                                              className={`${BfStyle.dot} ${
                                                  idx === this.state.backIdx ? BfStyle.red : ''
                                              }`}
                                          ></span>
                                      </div>
                                  )
                              })
                            : ''}
                    </div>
                </div>
                {/* 肌肉图 */}
                <div className={`${BfStyle.mascles} ${this.state.isShow !== null ? BfStyle.show : ''}`}>
                    <div className={BfStyle['swiper-container']}>
                        <div className={BfStyle['swiper-wrapper']}>
                            <div className={BfStyle['swiper-slide']}>Slide 1</div>
                            <div className={BfStyle['swiper-slide']}>Slide 2</div>
                            <div className={BfStyle['swiper-slide']}>Slide 3</div>
                        </div>
                        <div className={BfStyle['swiper-pagination']}></div>
                    </div>
                </div>
            </div>
        )
    }
}
