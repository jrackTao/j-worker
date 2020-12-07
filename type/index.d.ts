/**
 * 创建一个工作线程worker
 * @param {url | function} carrier JS URL | function
 * @param {bool} autoDestroy  是否自动销毁worker 默认开启
 * @returns (args) => Promise
 */
declare function createWorkerAsync(carrier: string | function, autoDestroy: boolean): (args: any) => Promise

/**
 * 获取线程数最优数量
 * @param {number} defaultCount 初始线程数 默认：4
 * @param {number} defaultMax 最大计算量   默认：10e6
 */
declare function getOptimalCountOfThreads(defaultCount: number, defaultMax: number): (args: any) => Promise
