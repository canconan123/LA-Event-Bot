const data = {
  chaos: [
    {
      name: "Chaos Gate",
      day: "Monday",
      time: [
        "1:00",
        "2:00",
        "3:00",
        "4:00",
        "5:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
      ],
      location: "Depends on gear score",
      message: "Chaos Gate",
    },
    {
      name: "Chaos Gate",
      day: "Tuesday",
      time: ["1:00", "2:00", "3:00", "4:00", "5:00"],
      location: "Depends on gear score",
      message: "Chaos Gate",
    },
    {
      name: "Chaos Gate",
      day: "Thursday",
      time: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
      ],
      location: "Depends on gear score",
      message: "Chaos Gate",
    },
    {
      name: "Chaos Gate",
      day: "Friday",
      time: ["1:00", "2:00", "3:00", "4:00", "5:00"],
      location: "Depends on gear score",
      message: "Chaos Gate",
    },
    {
      name: "Chaos Gate",
      day: "Saturday",
      time: [
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
      ],
      location: "Depends on gear score",
      message: "Chaos Gate",
    },
    {
      name: "Chaos Gate",
      day: "Sunday",
      time: [
        "1:00",
        "2:00",
        "3:00",
        "4:00",
        "5:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
      ],
      location: "Depends on gear score",
      message: "Chaos Gate",
    },
  ],
};
const chaosf = (time, day) => {
  var remaintime;
  data.chaos.forEach((ctime) => {
    if (day == ctime.day) {
      for (let etime of ctime.time) {
        let timec = time.split(":");
        let etimec = etime.split(":");

        if (timec[0] == etimec[0] - 1 && 60 - 20 == timec[1]) {
          remaintime = 60 - timec[1];
          break;
        } else if (timec[0] != etimec[0] - 1) {
          remaintime = null;
        }
      }
    }
  });

  return remaintime;
};

const getEventName = () => {
  return data.chaos[0].name;
};

module.exports = {
  chaosf: chaosf,
  getEventName: getEventName,
};
