/*
Implement a function in JavaScript that takes a list of async functions as input and a callback function and executes the async tasks in parallel that is all at once and invokes the callback after every task is executed.

Example

*/

const promiseExample = (val) => () =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (val === 5) reject(val);
            else resolve('val of timeout is ' + val);
        }, val * 1000);
    });

const inputValuesv1 = [
    promiseExample(3),
    promiseExample(1),
    promiseExample(2),
    promiseExample(5),
];

const inputValuesv2 = [
    promiseExample(3),
    promiseExample(1),
    promiseExample(2),
    promiseExample(5),
];

function arrayAsyncExecuteEnd(arr, callback) {
    let result = [];
    let errors = [];

    let completed = 0;
    arr.forEach((item) => {
        item().then((val) => result.push(val))
            .catch((err) => errors.push(err))
            .finally(() => {
                completed++;
                if (completed === arr.length) {
                    callback(errors, result);
                }
            });
    });
}

function arrayAsyncExecuteEndEachTask(arr, callback) {
    arr.forEach((item) =>
        item()
            .then((val) => callback(null, val))
            .catch((err) => callback(err))
    );
}

arrayAsyncExecuteEnd(inputValuesv1, (err, res) => {
    console.error(err);
    console.log(res)
})

arrayAsyncExecuteEndEachTask(inputValuesv2, (err, res) => {
    if (err) console.log('Error is ', err);
    else console.log({ res });
});
