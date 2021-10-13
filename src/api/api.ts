import instance from '.'
export function getMenuList() {
  return instance({
    url: '/navlist',
    method: 'get'
  })
}
