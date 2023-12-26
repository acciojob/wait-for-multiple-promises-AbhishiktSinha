//your JS code here. If required.
const tableBody = document.getElementById('output');
const loadingRow = tableBody.querySelector('#loading-row');
let totalTime = 0;
let delay = 0;

console.log('started at', totalTime);

function getRandomTime1to3() {
    return Math.ceil(Number(Math.random()*2000 + 1000).toFixed(3));
}

function createDelayedResolvePromise() {
    return new Promise(function(resolve, reject) {
        const delay = getRandomTime1to3();
        setTimeout(()=> {
            console.log(delay);
            resolve({time: delay});
        },delay);
    });
}

function createNewPromiseRow(promiseNumber, timeTaken) {
    const promiseCol = document.createElement('td');
    const timeCol = document.createElement('td');

    promiseCol.textContent = `Promise ${promiseNumber}`;
    timeCol.textContent = timeTaken/1000;

    const row = document.createElement('tr');
    row.append(promiseCol, timeCol);

    tableBody.appendChild(row);

    totalTime = Math.max(Number(timeTaken), totalTime);
}

function createTotalRow() {
    const titleCol = document.createElement('td');;
    titleCol.textContent = 'Total';

    const dataCol = document.createElement('td');
    dataCol.textContent = totalTime/1000;

    const totalRow = document.createElement('tr');
    totalRow.append(titleCol, dataCol);

    tableBody.appendChild(totalRow);
}

Promise.all([createDelayedResolvePromise(), createDelayedResolvePromise(), createDelayedResolvePromise()])
.then((resultArray)=> {
    loadingRow.classList.add('hide');

    console.log(resultArray);

    resultArray.forEach((timeObject, index)=>{
        createNewPromiseRow(index, timeObject.time);
    });

    createTotalRow();

    console.log('all done');
})