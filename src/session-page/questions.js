
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function compareFloats(a, b) {
  return Math.abs(a - b) < 0.00001;
}

const addPositivePositive = () => {

  const ops = [
    randomIntFromInterval(1, 10),
    randomIntFromInterval(2, 20)
  ]
  const text = `${ops[0]} + ${ops[1]} = `
  const isCorrect = (answer) => parseInt(answer) === ops[0] + ops[1];

  return {ops, text, isCorrect}
}

const addNegativePositive = () => {

  const ops = [
    randomIntFromInterval(-10, -1),
    randomIntFromInterval(2, 20)
  ]
  const text = `${ops[0]} + ${ops[1]} = `
  const isCorrect = (answer) => parseInt(answer) === ops[0] + ops[1];

  return {ops, text, isCorrect}
}

const addPositiveNegative = () => {

  const ops = [
    randomIntFromInterval(1, 10),
    randomIntFromInterval(-10, -1)
  ]
  const text = `${ops[0]} + ${ops[1]} = `
  const isCorrect = (answer) => parseInt(answer) === ops[0] + ops[1];

  return {ops, text, isCorrect}
}

const addNegativeNegative = () => {

  const ops = [
    randomIntFromInterval(-10, -1),
    randomIntFromInterval(-10, -1)
  ]
  const text = `${ops[0]} + ${ops[1]} = `
  const isCorrect = (answer) => parseInt(answer) === ops[0] + ops[1];

  return {ops, text, isCorrect}
}

const subtractPositivePositive = () => {

  const ops = [
    randomIntFromInterval(1, 20),
    randomIntFromInterval(1, 20)
  ]
  const text = `${ops[0]} - ${ops[1]} = `
  const isCorrect = (answer) => parseInt(answer) === ops[0] - ops[1];

  return {ops, text, isCorrect}
}

const subtractPositiveNegative = () => {

  const ops = [
    randomIntFromInterval(1, 20),
    randomIntFromInterval(-10, -1)
  ]
  const text = `${ops[0]} - ${ops[1]} = `
  const isCorrect = (answer) => parseInt(answer) === ops[0] - ops[1];

  return {ops, text, isCorrect}
}

const subtractNegativePositive = () => {

  const ops = [
    randomIntFromInterval(-10, -1),
    randomIntFromInterval(1, 20)
  ]
  const text = `${ops[0]} - ${ops[1]} = `
  const isCorrect = (answer) => parseInt(answer) === ops[0] - ops[1];

  return {ops, text, isCorrect}
}

const subtractNegativeNegative = () => {

  const ops = [
    randomIntFromInterval(-10, -1),
    randomIntFromInterval(-1, -1)
  ]
  const text = `${ops[0]} - ${ops[1]} = `
  const isCorrect = (answer) => parseInt(answer) === ops[0] - ops[1];

  return {ops, text, isCorrect}
}

const multPositivePositive = () => {

  const ops = [
    randomIntFromInterval(1, 10),
    randomIntFromInterval(1, 10)
  ]
  const text = `${ops[0]} x ${ops[1]} = `
  const isCorrect = (answer) => parseInt(answer) === ops[0] * ops[1];

  return {ops, text, isCorrect}
}

const multPositiveNegative = () => {

  const ops = [
    randomIntFromInterval(1, 10),
    randomIntFromInterval(-10, -1)
  ]
  const text = `${ops[0]} x ${ops[1]} = `
  const isCorrect = (answer) => parseInt(answer) === ops[0] * ops[1];

  return {ops, text, isCorrect}
}

const multNegativePositive = () => {

  const ops = [
    randomIntFromInterval(-10, -1),
    randomIntFromInterval(1, 10)
  ]
  const text = `${ops[0]} x ${ops[1]} = `
  const isCorrect = (answer) => parseInt(answer) === ops[0] * ops[1];

  return {ops, text, isCorrect}
}

const multNegativeNegative = () => {

  const ops = [
    randomIntFromInterval(-10, -1),
    randomIntFromInterval(-1, -1)
  ]
  const text = `${ops[0]} x ${ops[1]} = `
  const isCorrect = (answer) => parseInt(answer) === ops[0] * ops[1];

  return {ops, text, isCorrect}
}

const multPositivePositiveD = () => {

  const ops = [
    randomIntFromInterval(1, 10),
    randomIntFromInterval(1, 2),
    randomIntFromInterval(1, 10)
  ]
  const a = ops[0] / Math.pow(10, ops[1]);
  const b = ops[2]

  const text = `${a} x ${b} = `
  const isCorrect = (answer) => compareFloats(parseFloat(answer),  a * b);
  

  return {ops, text, isCorrect}
}

const multPositiveNegativeD = () => {

  const ops = [
    randomIntFromInterval(1, 10),
    randomIntFromInterval(1, 2),
    randomIntFromInterval(-10, 1)
  ]
  const a = ops[0] / Math.pow(10, ops[1]);
  const b = ops[2]

  const text = `${a} x ${b} = `
  const isCorrect = (answer) => compareFloats(parseFloat(answer),  a * b);
  

  return {ops, text, isCorrect}
}

const multNegativePositiveD = () => {

  const ops = [
    randomIntFromInterval(-10, -1),
    randomIntFromInterval(1, 2),
    randomIntFromInterval(1, 10)
  ]
  const a = ops[0] / Math.pow(10, ops[1]);
  const b = ops[2]

  const text = `${a} x ${b} = `
  const isCorrect = (answer) => compareFloats(parseFloat(answer),  a * b);
  

  return {ops, text, isCorrect}
}

const multNegativeNegativeD = () => {

  const ops = [
    randomIntFromInterval(-10, -1),
    randomIntFromInterval(1, 2),
    randomIntFromInterval(-10, -1)
  ]
  const a = ops[0] / Math.pow(10, ops[1]);
  const b = ops[2]

  const text = `${a} x ${b} = `
  const isCorrect = (answer) => compareFloats(parseFloat(answer),  a * b);
  

  return {ops, text, isCorrect}
}


const multPositivePositiveDD = () => {

  const ops = [
    randomIntFromInterval(1, 10),
    randomIntFromInterval(1, 2),
    randomIntFromInterval(1, 10),
    randomIntFromInterval(1, 2),
  ]
  const a = ops[0] / Math.pow(10, ops[1]);
  const b = ops[2] / Math.pow(10, ops[1])

  const text = `${a} x ${b} = `
  const isCorrect = (answer) => compareFloats(parseFloat(answer),  a * b);
  

  return {ops, text, isCorrect}
}

const multPositiveNegativeDD = () => {

  const ops = [
    randomIntFromInterval(1, 10),
    randomIntFromInterval(1, 2),
    randomIntFromInterval(-10, -1),
    randomIntFromInterval(1, 2),
  ]
  const a = ops[0] / Math.pow(10, ops[1]);
  const b = ops[2] / Math.pow(10, ops[1])

  const text = `${a} x ${b} = `
  const isCorrect = (answer) => compareFloats(parseFloat(answer),  a * b);
  

  return {ops, text, isCorrect}
}

const multNegativePositiveDD = () => {

  const ops = [
    randomIntFromInterval(-10, -1),
    randomIntFromInterval(1, 2),
    randomIntFromInterval(1, 10),
    randomIntFromInterval(1, 2),
  ]
  const a = ops[0] / Math.pow(10, ops[1]);
  const b = ops[2] / Math.pow(10, ops[1])

  const text = `${a} x ${b} = `
  const isCorrect = (answer) => compareFloats(parseFloat(answer),  a * b);
  

  return {ops, text, isCorrect}
}

const multNegativeNegativeDD = () => {

  const ops = [
    randomIntFromInterval(-10, -1),
    randomIntFromInterval(1, 2),
    randomIntFromInterval(-10, -1),
    randomIntFromInterval(1, 2),
  ]
  const a = ops[0] / Math.pow(10, ops[1]);
  const b = ops[2] / Math.pow(10, ops[1])

  const text = `${a} x ${b} = `
  const isCorrect = (answer) => compareFloats(parseFloat(answer),  a * b);
  

  return {ops, text, isCorrect}
}




const testFn = () => {
  return 1;
}

module.exports = {

  addPositivePositive,
  addNegativePositive,
  addPositiveNegative,
  addNegativeNegative,

  subtractPositivePositive,
  subtractPositiveNegative,
  subtractNegativePositive,
  subtractNegativeNegative,

  multPositivePositive,
  multPositiveNegative,
  multNegativePositive,
  multNegativeNegative,

  multPositivePositiveD,
  multPositiveNegativeD,
  multNegativePositiveD,
  multNegativeNegativeD,

  multPositivePositiveDD,
  multPositiveNegativeDD,
  multNegativePositiveDD,
  multNegativeNegativeDD,

  testFn
}