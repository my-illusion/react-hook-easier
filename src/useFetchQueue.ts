import { isFunction } from './utils';
type QueueType = Function | Promise<any>;

function useFetchQueue(
  queue: QueueType[],
  max: number,
  callback?: (...args: any[]) => any,
  errCount?: number
) {
  const len: number = queue.length;
  const requestQueue: Promise<any>[] = [];
  const results: any[] = new Array(len).fill(NaN);
  let i = 0;
  let errTimes = 0;
  let flag = false;

  const fetchQueue = queue.map((item: QueueType) => {
    return function() {
      if (isFunction(item)) {
        return item();
      } else {
        return item;
      }
    };
  });

  const hanldeRequest = (fetch: Promise<any>, index) => {
    const promiseCallback = isSuccess => receive => {
      results[index] = receive;
      if (!isSuccess && errCount) {
        errTimes++;
        if (errTimes === (errCount || 0)) {
          isFunction(callback) && callback(results);
          flag = true;
          return;
        }
      }
      if (flag) return;
      const count: number =
        len - results.filter(item => Object.is(item, NaN)).length;
      if (i + 1 < len) {
        requestQueue.shift();
        hanldeRequest(fetchQueue[++i](), i);
      } else if (count === len) {
        isFunction(callback) && callback(results);
      }
    };

    const req = fetch.then(promiseCallback(true), promiseCallback(false));
    if (requestQueue.push(req) < max) {
      hanldeRequest(fetchQueue[++i](), i);
    }
  };

  hanldeRequest(fetchQueue[i](), i);
}

export default useFetchQueue;
