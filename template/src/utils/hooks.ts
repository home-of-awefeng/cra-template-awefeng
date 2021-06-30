

// 获取url query的值
export function useQuery() {
  var after = window.location.search
  if(after.indexOf('?') === -1) return null //如果url中没有传参直接返回空

  //key存在先通过search取值如果取不到就通过hash来取
  after = after.substr(1) || window.location.hash.split("?")[1]
  const kvs = after.split("&")
  const res: any = {}
  kvs.forEach(item => {
    const temp = item.split("=")
    res[temp[0]] = temp[1]
  })
  return res
}
