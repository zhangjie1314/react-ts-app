/**
 * API 导出合集
 */
import * as BappApis from './bapp'
import * as StudioApis from './studio'

export default {
    ...BappApis,
    ...StudioApis,
}
