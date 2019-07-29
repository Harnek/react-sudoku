function convertTime(time) {
    let s = String(time % 60);
    if (s.length === 1) {
      s = `0${time % 60}`;
    }
  
    if (time < 10) {
      return `Time 0:${s}`;
    }
    if (time < 60) {
      return `Time 0:${s}`;
    }
  
    if (time < 3600) {
      return `Time ${Math.floor(time / 60)}:${s}`;
    }
  
    return `99:59`;
}

export default convertTime;