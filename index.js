const onmessage = function (e) {
  var min = 2;

  function generationPrimes(start, range) {
    let primes = [];
    let isPrime = true;
    let end = start + range;

    for(let i = start; i <= end; i++) {
      for(let j = min; j < Math.sqrt(end); j++) {
        if(i !== j && i % j === 0) {
          isPrime = false;
          break;
        }
      }

      if(isPrime) {
        primes.push(i);
      }

      isPrime = true
    }

    return primes;
  }

  var result = generationPrimes(...e.data);
  postMessage(result)
}

/**
 * 创建一个工作线程worker
 * @param {url | function} carrier JS URL | function
 * @param {bool} autoDestroy  是否自动销毁worker 默认开启
 * @returns (args) => Promise
 */
export const createWorkerAsync = (carrier, autoDestroy = true) => {

  let workerJS = carrier;

  if(typeof carrier == 'function') {
    workerJS = URL.createObjectURL(new Blob(['onmessage=' + carrier]))
  }
  var worker = new Worker(workerJS);

  const func = (args) => new Promise((resolve, reject) => {
    worker.postMessage(args);

    worker.onmessage = e => {
      resolve(e.data);
      /** 自动销毁 */
      if(autoDestroy) {
        worker.terminate();
      }
    }

    worker.onerror = e => {
      reject(e);
    }
  })

  /** 销毁方法 可手动销毁 */
  func.destroy = () => worker.terminate();

  return func;
}

/**
 * 获取线程数最优数量
 * @param {number} defaultCount 初始线程数 默认：4
 * @param {number} defaultMax 最大计算量 默认：10e6
 */
export const getOptimalCountOfThreads = async (defaultCount = 2, defaultMax = 1e6) => {
  let count = defaultCount;
  let useTime = Infinity;

  const min = 2;
  const max = defaultMax;

  while(count++) {
    const range = Math.ceil((max - min) / count);

    let workers = new Array(count).fill(0).map((o, i) => createWorkerAsync(onmessage)([min + i * range, range]))

    const startTime = Date.now();
    await Promise.all(workers)
    const newUseTime = Date.now() - startTime;

    if(newUseTime > useTime) {
      return count - 1
    }

    useTime = newUseTime;
  }
}