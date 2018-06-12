export default ({ store, route, redirect }) => {
  const isAuthen = store.getters['user/isAuthen'];
  const need2Authen = route.meta.some(item => item.requiresAuth) || false;

  if (need2Authen && !isAuthen) {
    return redirect('/authens/login')
  } 
  
  return redirect('')
}