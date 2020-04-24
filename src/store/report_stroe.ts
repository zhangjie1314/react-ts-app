import { observable, action } from 'mobx'

export default class ReportStore {
    // 版本号
    @observable version: string = ''
    @action setVersion(id: string) {
        this.version = id
    }
    // 教练ID
    @observable coachId: string = ''
    @action setCoachId(id: string) {
        this.coachId = id
    }
    // 会员ID
    @observable memberId: string = ''
    @action setMemberId(id: string) {
        this.memberId = id
    }
    // tab显示ID 0/1/2/3/4/6 代表报告菜单ID
    @observable tabsId: number = 6
    @action setTabsId(id: number) {
        this.tabsId = id
    }
    // 是否为独立教练 1 是 0 否
    @observable isDlCoach: number = 1
    @action setIsDlCoach(res: number) {
        this.isDlCoach = res
    }
    // 是否通过分享的连接打开 1 是 0 否
    @observable isShare: number = 0
    @action setIsShare(res: number) {
        this.isShare = res
    }
    // 是否为工作室 1 是 0 否
    @observable isFromStudio: number = 0
    @action setIsFromStudio(res: number) {
        this.isFromStudio = res
    }
    // 用户信息
    @observable userInfos: object = {}
    @action setUserInfos(res: any) {
        this.userInfos = res
    }
}
