// 人体图组件
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Carousel, WingBlank } from 'antd-mobile'
import BfStyle from './index.module.scss'
import frontImg from '@assets/img/front3.0.png'
import backImg from '@assets/img/back3.0.png'

export default class BodyFigure extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            frontIdx: null,
            backIdx: null,
            masclesIdx: 0,
            mascles: [],
            isShow: null,
            dotStyle: { width: '4px', height: '4px', bottom: '10px' },
        }
    }
    static defaultProps = { params: {} }
    static propType = { params: PropTypes.object }
    // 点击节点
    clickDomFn(e: any, obj: any, idx: number, type: string) {
        e.stopPropagation()
        const { params } = this.props
        let { frontIdx, backIdx, mascles, masclesIdx, isShow } = this.state
        switch (type) {
            case 'front':
                isShow = 'front'
                frontIdx = idx
                mascles = [...params.front[idx].imglist]
                break
            case 'back':
                isShow = 'back'
                backIdx = idx
                mascles = [...params.back[idx].imglist]
                break
            default:
                frontIdx = null
                backIdx = null
                masclesIdx = 0
                mascles = []
                isShow = null
                break
        }
        this.setState({ frontIdx, backIdx, mascles, masclesIdx, isShow })
    }
    // 点击取消
    clickCancelFn = () => {
        this.setState({ isShow: null, frontIdx: null, backIdx: null })
    }
    componentDidMount() {
        this.props.onRef('bodyFigure', this)
    }
    render() {
        const { params } = this.props
        return (
            <div className={BfStyle.figureBox} onClick={this.clickCancelFn}>
                {/* 正面 */}
                <div
                    className={`${BfStyle.front} ${BfStyle.modules} ${
                        this.state.isShow === 'front'
                            ? BfStyle.toFace
                            : this.state.isShow === 'back'
                            ? BfStyle.outFace
                            : ''
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
                                          onClick={(e) => {
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
                        this.state.isShow === 'back'
                            ? BfStyle.toFace
                            : this.state.isShow === 'front'
                            ? BfStyle.outFace
                            : ''
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
                                          onClick={(e) => {
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
                <div
                    className={`${BfStyle.mascles} ${
                        this.state.isShow === 'front' || this.state.isShow === 'back' ? BfStyle.show : ''
                    }`}
                >
                    <WingBlank style={{ height: '100%', position: 'relative' }}>
                        <Carousel
                            style={{ touchAction: 'none', paddingTop: '10px' }}
                            dots={false}
                            cellSpacing={10}
                            slideWidth={0.9}
                            frameOverflow='visible'
                            dotStyle={this.state.dotStyle}
                            dotActiveStyle={this.state.dotStyle}
                            beforeChange={(from, to) => {}}
                            afterChange={(index: number) => {
                                this.setState({ masclesIdx: index })
                            }}
                        >
                            {this.state.mascles.map((itm: any, idx: number) => (
                                <div className={BfStyle.img} key={idx}>
                                    <img src={itm.imgName} alt='' />
                                    <p>{itm.positionName}</p>
                                </div>
                            ))}
                        </Carousel>
                        <div className={BfStyle.dots}>
                            {this.state.mascles.map((itm: any, idx: number) => (
                                <div
                                    key={idx}
                                    className={`${BfStyle._dot} ${this.state.masclesIdx === idx ? BfStyle.active : ''}`}
                                ></div>
                            ))}
                        </div>
                    </WingBlank>
                </div>
            </div>
        )
    }
}
