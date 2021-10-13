import Mock from 'mockjs'
const navList = function() {
  return {
    code: 0,
    data: [
      {
        path: '/menu1',
        name: '业务中心',
        iconCls: 'el-icon-message', //图标样式class
        children: [
          {
            path: '/menu1/sub1',
            name: '用户列表'
          },
          {
            path: '/menu1/sub2',
            name: '收入明细'
          }
        ]
      },
      {
        path: '/menu2',
        name: '系统设置',
        children: [
          {
            path: '/menu2/sub1',
            name: '官网设置'
          }
        ]
      }
    ]
  }
}
// 格式： Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/navlist', 'get', navList)
export default Mock
