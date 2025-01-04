import { divideArrayByLimit } from './mapLimit.mjs';

function checkIfArrayIncludesEmpty(arr) {
    for (let item of arr) if (item.length === 0) return true;
    return false;
}
function testDivideArrayByLimit() {
    // Test cases
    Array.prototype.chop = divideArrayByLimit;
    console.log('Test cases for map limit');
    let numberOfFailedTest = 0;
    const testOne = [1, 2, 3, 4, 5, 6, 7].chop(3);
    if (testOne.length !== 3 || checkIfArrayIncludesEmpty(testOne)) {
        console.error('Test case 1 failed');
        numberOfFailedTest++;
    }

    const testTwo = [1, 2].chop(4);
    if (testTwo.length !== 1 || checkIfArrayIncludesEmpty(testOne)) {
        console.error('Test case 2 failed');
        numberOfFailedTest++;
    }
    const testThree = [].chop(2);
    if (testThree === null || testThree.length !== 0) {
        console.error('Test case 3 failed');
        numberOfFailedTest++;
    }
    const testFourth = [1, 2, 3, 4].chop(3);
    if (testFourth.length !== 2 || checkIfArrayIncludesEmpty(testOne)) {
        console.error('Test case 4 failed');
        numberOfFailedTest++;
    }

    if (numberOfFailedTest === 0) {
        console.info('All tests passed');
    } else {
        console.error(`${numberOfFailedTest} tests failed`);
    }
}

testDivideArrayByLimit();
