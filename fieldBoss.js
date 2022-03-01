const data = {
  fieldBoss: [
    {
      name: "Field Boss Spawn",
      day: "Monday",
      time: [
        "1:00",
        "2:00",
        "3:00",
        "4:00",
        "5:00",
      ],
      location: "Depends on gear score",
      message: "Field Boss Spawn",
    },
    {
      name: "Field Boss Spawn",
      day: "Tuesday",
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
      message: "Field Boss Spawn",
    },
    {
      name: "Field Boss Spawn",
      day: "Wednesday",
      time: ["1:00", "2:00", "3:00", "4:00", "5:00"],
      location: "Depends on gear score",
      message: "Field Boss Spawn",
    },
    {
      name: "Field Boss Spawn",
      day: "Friday",
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
      message: "Field Boss Spawn",
    },
    {
      name: "Field Boss Spawn",
      day: "Saturday",
      time: ["1:00", "2:00", "3:00", "4:00", "5:00"],
      location: "Depends on gear score",
      message: "Field Boss Spawn",
    },
    {
      name: "Field Boss Spawn",
      day: "Sunday",
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
      message: "Field Boss Spawn",
    },
  ],
};
const fieldBossf = (time, day) => {
  var remaintime;
  data.fieldBoss.forEach((ctime) => {
    if (day == ctime.day) {
      for (let etime of ctime.time) {
        let timec = time.split(":");
        let etimec = etime.split(":");

        if (timec[0] == etimec[0] - 1 && 60 - 20 <= timec[1]) {
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
  return data.fieldBoss[0].name;
};

module.exports = {
  fieldBossf: fieldBossf,
  getEventName: getEventName,
};
