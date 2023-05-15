function getDate() {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 获取月份，如果小于10，则补0
    const day = today.getDate().toString().padStart(2, '0'); // 获取日期，如果小于10，则补0

    return {
        today,
        month,
        day
      };
}

export default getDate;
