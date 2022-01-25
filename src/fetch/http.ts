import 'whatwg-fetch'
import Kara from 'ai-jssdk'

function timer(time: number, message: string): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(message)
    }, time * 1000)
  })
}

/**
 *
 * @param obj
 * @param message
 */
function assertNull(obj: any, message: string) {
  if (obj == null) {
    throw new Error(message)
  }
  if (obj == undefined) {
    throw new Error(message)
  }
  if (typeof obj == 'string' && obj == '') {
    throw new Error(message)
  }
}

function toUrlEncoded(obj: any) {
  return Object.keys(obj)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]))
    .join('&')
}

function trim(str: string) {
  return str.replace(/^\/+/, '').replace(/\/+$/, '')
}

function parseData(res: Response) {
  if (!(res instanceof Response)) {
    return res
  }
  let type = res.headers.get('Content-Type')
  if (!type) {
    return res
  }
  if (type.includes('json')) {
    return res.json()
  }
  if (type.includes('text/plain')) {
    return res.text()
  }
  if (type.includes('arrayBuffer')) {
    return res.arrayBuffer()
  }
  if (type.includes('form-data')) {
    return res.formData()
  }
  if (type.includes('octet-stream')) {
    let filename = res.headers.get('filename')
    return filename
      ? res.blob().then((blob) => {
          return { blob, filename }
        })
      : res.blob()
  }
  return res
}

type withUndefined<T> = T | undefined
enum Credentials {
  include = 'include',
  omit = 'omit',
  sameOrigin = 'same-origin',
}

enum Mode {
  cores = 'cors',
  navigate = 'navigate',
  noCores = 'no-cors',
  sameOrigin = 'same-origin',
}

enum Cache {
  default = 'default',
  force = 'force-cache',
  noCache = 'no-cache',
  noStore = 'no-store',
  onlyIfCached = 'only-if-cached',
  relaod = 'reload',
}

class Http {
  private _base: string
  private _version: string = 'v1.0.0'
  private _token: string

  private _messages: Map<string, HttpMessage>

  private _maxRefeshCount = 5
  private _represhCalllBacks: Function[] = []
  private _represhFailCalllBacks: Function[] = []
  private _refreshing = false

  constructor() {
    this._messages = new Map()
  }

  setBase(base: string): this {
    assertNull(base, '请求地址为空')
    this._base = base
    return this
  }

  setVersion(version: string): this {
    this._version = version
    return this
  }

  getToken(): string {
    return this._token
  }
  setToken(token: string): this {
    if (/^bearer/.test(token)) {
      this._token = token
    } else {
      this._token = `bearer ${token}`
    }
    return this
  }

  private async refreshToken() {
    if (this._refreshing) {
      return new Promise((resolve, reject) => {
        this._represhCalllBacks.push(resolve)
        this._represhFailCalllBacks.push(reject)
      })
    }
    this._refreshing = true
    try {
      let v = await Promise.race([Kara.refreshToken(), timer(15, 'token 过期，请退出重试')])

      this.setToken(v.token)
      this._represhCalllBacks.forEach((f) => f('success'))
      this._represhCalllBacks = []
    } catch (e) {
      this._represhFailCalllBacks.forEach((f) => f('fail'))
      this._represhFailCalllBacks = []
    } finally {
      this._refreshing = false
      this._represhCalllBacks = []
    }
    // Promise.race([kara.refreshToken(), timer(15, "token 过期，请退出重试")]).then(v => {
    //   return this.setToken(v.token).send(message)
    // }).catch(() => {
    //   throw new Error("token 过期，请退出重试")
    // })
  }

  private status(res: Response) {
    let key = btoa(res.url)
    let message = this._messages.get(key) as any
    this._messages.delete(key)
    if (res.ok) {
      return res
    }
    if (res.status != 401) {
      return res
    }
    if (this._maxRefeshCount < 0) {
      return Promise.reject('token 过期，请退出重试')
    }
    this._maxRefeshCount -= 1
    return this.refreshToken()
      .then((v) => this.send(message))
      .catch((v) => Promise.reject('token 过期，请退出重试'))
  }

  private makeup(message: HttpMessage) {
    let base = trim(message._base || this._base)
    let version = trim(message._version || this._version)
    let path = trim(message._path)
    assertNull(base, '请求路径为空')
    assertNull(path, '请求路径为空')
    let _url = `${base}/${version}/${path}`
    this._messages.set(btoa(_url), message)
    return fetch(_url, message.init)
      .then((r) => this.status(r))
      .then(parseData)
  }

  async send(message: HttpMessage): Promise<any> {
    if (this._token) {
      message.header({
        Authorization: this._token,
      })
    }
    if (message._timeout) {
      return Promise.race([this.makeup(message), timer(message._timeout, '请求超时')])
    }

    return this.makeup(message)
  }
}

class HttpMessage {
  _path: string
  _base: withUndefined<string>
  _version: withUndefined<string>
  _token = true
  _params?: Record<string, any>
  _timeout: withUndefined<number>

  init: RequestInit = {}

  constructor(path: string) {
    assertNull(path, '请求路径为空')
    this._path = path
  }

  base(base: string): this {
    this._base = base
    return this
  }

  version(version: string): this {
    this._version = version
    return this
  }

  token(token: boolean): this {
    this._token = token
    return this
  }

  timeout(time: number): this {
    this._timeout = time
    return this
  }

  params(params: Record<string, any>): this {
    this._params = params
    return this
  }

  body(body: BodyInit): this {
    this.init.body = body
    return this
  }

  cache(cache: Cache): this {
    this.init.cache = cache
    return this
  }

  header(params: Record<string, string>): this {
    if (!this.init.headers) {
      this.init.headers = {}
    }
    let old = this.init.headers
    this.init.headers = {
      ...old,
      ...params,
    }
    return this
  }

  jsonHeader(): this {
    return this.header({
      'Content-Type': 'application/json',
    })
  }

  credentials(credentials: Credentials): this {
    this.init.credentials = credentials
    return this
  }

  keepLive(live: boolean): this {
    this.init.keepalive = live
    return this
  }

  mode(mode: Mode): this {
    this.init.mode = mode
    return this
  }

  get() {
    this.init.method = 'GET'
    if (this._params) {
      let encoded = toUrlEncoded(this._params)
      this._path = this._path.indexOf('?') > -1 ? `${this._path}&${encoded}` : `${this._path}?${encoded}`
    }
    return this.start()
  }

  post() {
    this.init.method = 'POST'
    if (!this.init.body) {
      return this.start()
    }
    let type = this.init.headers && this.init.headers['Content-Type']
    if (type == 'application/json') {
      this.init.body = JSON.stringify(this.init.body)
    } else if (type == 'application/x-www-form-urlencoded') {
      this.init.body = toUrlEncoded(this.init.body)
    }
    return this.start()
  }

  // upload() {
  //   let data = new FormData();
  //   return this.start();
  // }
  private start() {
    return defaultHttp.send(this)
  }
}

const defaultHttp = new Http()

export const Message = (path: string) => {
  return new HttpMessage(path)
}

export default defaultHttp
