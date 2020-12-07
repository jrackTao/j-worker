## @threeword/j-worker

Web Worker Promise 化，自动销毁 worker，计算最优线程数（其实就 2 个方法）

## 安装（Install）

```bash
# npm
npm i @threeword/jui -S

# yarn
yarn add @threeword/jui
```

## 讲解文档（Hello Web Worker）

![Hello Web Worker](http://weapp-54548.oss-cn-hangzhou.aliyuncs.com/gh_7c5d4cf235cb_430.jpg)

## 使用

```tsx
import {
  createWorkerAsync,
  getOptimalCountOfThreads,
} from '@threeword/j-worker';

/** 常规使用 */
const doSomething = (e) => {
  postMessage(e.data);
};

const result = await createWorkerAsync(doSomething)('我在worker中执行');
console.log(result);

/** 手动销毁线程 */
const doSomething = (e) => {
  postMessage(e.data);
};
const worker = createWorkerAsync(doSomething, false);
const result = await worker('我在worker中执行');
console.log(result);
worker.destroy();

/** 获取最佳线程数 */
const cpuNumber = await getOptimalCountOfThreads();
console.log('最佳线程数', cpuNumber);
```

## 参与贡献

- Fork 本仓库
- 新建 Feature_xxx 分支
- 提交代码
- 新建 Pull Request
