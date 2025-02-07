const circuitBreaker = (fn, failureCount, timeThreshold) => {
    let functionFailureCnt = 0;
    let isClosed = false;
    let timeSinceLastFailure = 0;

    return function (...args) {
        if (isClosed) {
            if (Date.now() - timeSinceLastFailure > timeThreshold) {
                // threashold has passed and now circuit can be opened
                isClosed = false;
            } else {
                console.log('circuit is closed');
                return;
            }
        }
        try {
            const result = fn(...args);
            functionFailureCnt = 0;
            return result;
        } catch (err) {
            console.log({ err });
            functionFailureCnt++;
            timeSinceLastFailure = Date.now();
            if (functionFailureCnt >= failureCount) {
                isClosed = true;
            }
        }
    };
};
