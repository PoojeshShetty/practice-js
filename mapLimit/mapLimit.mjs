/*
mapLimit(coll, limit, callbackopt)
*/

/*

mapLimit([1, 2, 3, 4, 5], 3, function (num, callback) {
  setTimeout(function () {
    num = num * 2;
    console.log(num);
    callback(null, num);
  }, 2000);
});

numPromise
  .then((result) => console.log("success:" + result))
  .catch(() => console.log("no success"));

Output:
// first batch
2
4
6
// second batch
8
10
"success:2,4,6,8,10"

*/

export function divideArrayByLimit(limit = null) {
    let arr = [...this];
    if (limit === null) {
        return arr;
    }
    let newArr = [];
    for (let i = 0; i < arr.length; i += limit) {
        newArr.push(arr.slice(i, i + limit));
    }
    return newArr;
}

Array.prototype.chop = divideArrayByLimit;

export function mapLimitv2(arr, limit, fn) {
    return new Promise((resolve, reject) => {
        const chopped = arr.chop(limit);
        // final should be promise
        const final = chopped.reduce((a, b) => {
            return a.then((prev) => {
                return new Promise((resolve, reject) => {
                    let result = [];
                    let completed = 0;
                    b.forEach((item) => {
                        fn(item, (error, value) => {
                            if (error) reject(error);
                            else {
                                result.push(value);
                                completed++;
                                if (completed === b.length)
                                    resolve([...prev, ...result]);
                            }
                        });
                    });
                });
            });
        }, Promise.resolve([]));

        final
            .then((item) => console.log('Success executed ', item))
            .catch((err) => console.log('Error occurred ', err));
    });
}

const mapLimit = (arr, limit, fn) => {
    return new Promise((resolve, reject) => {
        let chopped = arr.chop(limit);

        const final = chopped.reduce((a, b) => {
            return a.then((val) => {
                return new Promise((resolve, reject) => {
                    const promises = [];
                    for (const e of b) {
                        promises.push(
                            new Promise((resolve, reject) => {
                                fn(e, (error, value) => {
                                    if (error) {
                                        reject(error);
                                    } else {
                                        resolve(value);
                                    }
                                });
                            })
                        );
                    }

                    Promise.all(promises)
                        .then((results) => resolve([...val, ...results]))
                        .catch(reject);
                });
            });
        }, Promise.resolve([]));

        final.then((result) => resolve(result)).catch((e) => reject(e));
    });
};

let numPromise = mapLimitv2(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    3,
    function (num, callback) {
        setTimeout(function () {
            num = num * 2;
            console.log({ num, og: num / 2 });
            callback(null, num);
        }, 2000);
    }
);

numPromise
    .then((result) => console.log('success:' + result))
    .catch((error) => console.log('no success', error));
