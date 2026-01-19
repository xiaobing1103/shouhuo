export class AuthService {
  // 登录
  async login(serverUrl: string, warehouse_id: string, employee_id: string, password: string) {
    // TODO: 调用登录接口
  }

  // 自动登录
  async autoLogin() {
    // TODO: 从本地读取凭证并自动登录
  }

  // 登出
  async logout() {
    // TODO: 清除本地凭证并重置状态
  }
}
