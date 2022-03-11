const data = {
  mario: [
    {
      name: "Mario Kart",
      time: ["00:00", "2:00", "04:00", "06:00", "08:00", "10:00", "12:00"],
    },
  ],
};
const mariof = (time) => {
  var remaintime;

  data.mario.forEach((ctime) => {
    for (let etime of ctime.time) {
      let timec = time.split(":");
      let etimec = etime.split(":");

      if (timec[0] == etimec[0] - 1 && 60 - 20 == timec[1]) {
        console.log(true);
        remaintime = 60 - timec[1];
      }
    }
  });

  return remaintime;
};

const getEventName = () => {
  return data.mario.name;
};

module.exports = {
  mariof: mariof,
  getEventName: getEventName,
};
