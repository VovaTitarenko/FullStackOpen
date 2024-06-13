function checkRestOperator(...numbers) {
  function sumOrHui(args) {
    if (args.length === 1) {
      return 'Hui!';
    } else {
      console.log(typeof numbers, Array.isArray(numbers));
      return args.reduce((sum, item) => (sum += item), 0);
    }
  }
  const randomArr = ['h', 'u', 'i'];
  console.log(sumOrHui(numbers), randomArr);
}

checkRestOperator(1, 2, 3);
