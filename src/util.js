// module.exports = function say() {
//   console.log("hello world");
// };

// export default function say() {
//   console.log("hello world");
// }

export default function getData() {
  return new Promise((resolve, reject) => {
    // 设置延迟时间，体现异步操作
    setTimeout(() => {
      resolve("ok");
    }, 5000);
  });
}
