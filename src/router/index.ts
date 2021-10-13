import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/menu1',
    component: Home,
    name: '业务中心',
    meta: {
      iconCls: 'el-icon-message' //图标样式class
    },
    children: [
      {
        path: 'sub1',
        component: () => import('@/views/menu1/sub1.vue'),
        name: '用户列表'
      },
      {
        path: 'sub2',
        component: () => import('@/views/menu1/sub2.vue'),
        name: '收入明细'
      }
    ]
  },
  {
    path: '/menu2',
    component: Home,
    name: '系统设置',
    // iconCls: 'el-icon-message',
    children: [
      {
        path: 'sub1',
        component: () => import('@/views/menu2/sub1.vue'),
        name: '官网设置'
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
