const data = {
  mario: [
    {
      name: "Mario Kart",
      time: ["2:00", "4:00", "6:00", "8:00", "10:00", "12:00"],
    },
  ],
};
const mariof = (time) => {
  var remaintime;

  let mdata = data.mario[0];

  for (let etime of mdata.time) {
    let timec = time.split(":");
    let etimec = etime.split(":");
   
    if (timec[0] == etimec[0] - 1 && 60 - 20 == timec[1]) {
     
      remaintime = 60 - timec[1];

    }
  }

  return remaintime;
};

const getEventName = () => {
  return data.mario[0].name;
};

module.exports = {
  mariof: mariof,
  getEventName: getEventName,
};
