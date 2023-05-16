const getDate= () => {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 获取月份，如果小于10，则补0
    const day = today.getDate().toString().padStart(2, '0'); // 获取日期，如果小于10，则补0

    return {
        today,
        month,
        day
      };
}

const daysBetween = (date) => {
  const oneDayMs = 86400000; // 一天的毫秒数
  const today = new Date(); // 获取当前日期对象
  const targetDate = new Date(date); // 将目标日期字符串转换为日期对象
  const diffMs = targetDate.getTime() - today.getTime(); // 计算两个日期之间的毫秒数差值
  const diffDays = Math.ceil(diffMs / oneDayMs); // 将毫秒数差值转换为天数，并向上取整
  return diffDays;
};

export {getDate,daysBetween};
