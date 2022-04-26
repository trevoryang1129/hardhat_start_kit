import { storeInstance } from './index'
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
@Module({
  dynamic: true,
  store: storeInstance,
  namespaced: true,
  name: 'app_state_vuex'
})
class app_state_vuex extends VuexModule {
  left_drawer_open = false
  current_user:string=""
  @Mutation
  set_left_drawer_mut (setOpen: boolean) {
    this.left_drawer_open = setOpen
  }

  @Action
  set_left_drawer (setOpen: boolean) {
    this.set_left_drawer_mut(setOpen)
  }
  @Mutation
  set_current_user_mut (setOpen: string) {
    this.current_user = setOpen
  }

  @Action
  set_current_user (setOpen: string) {
    this.set_current_user_mut(setOpen)
  }

}
export const app_state_store = getModule(app_state_vuex)
