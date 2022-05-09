const data = {
  merchant: [
    {
      name: "Merchant Schedule 1",
      time: ["01:30", "04:30", "05:30", "07:30", "08:30", "11:30"],
      locationAndName: [
        "Lucas in Yudia",
        "Morris in East Luterra",
        "Mac in Anikka",
        "Jeffrey in Shushire",
        "Dorella in Feiton",
      ],
    },
    {
      name: "Merchant Schedule 2",
      time: ["12:30", "02:30", "05:30", "06:30", "08:30", "09:30"],
      locationAndName: [
        "Malone in West Luterra",
        "Burt in East Luterra",
        "Oliver in Tortoyk",
        "Nox in Arthetine",
        "Aricer in Rohendel",
        "Rayni in Punika",
      ],
    },
    {
      name: "Merchant Schedule 3",
      time: ["12:30", "03:30", "04:20", "06:30", "07:30", "10:30"],
      locationAndName: [
        "Ben in Rethramis",
        "Peter in North Vern",
        "Laitir in Yorn",
        "Evan in South Vern",
      ],
    },
  ],
};
const merchantf = (time) => {
  var remaintime;
  var merchantlist = [];
  data.merchant.forEach((ctime) => {
    for (let etime of ctime.time) {
      let timec = time.split(":");
      let etimec = etime.split(":");

      if (timec[0] == etimec[0] && 30 - 10 == timec[1]) {
        console.log(true);
        let timeobj = {};
        remaintime = 30 - timec[1];
        timeobj["schedule"] = ctime.name;
        timeobj["remaintime"] = remaintime;
        timeobj["merchantname"] = ctime.locationAndName;
        merchantlist.push(timeobj);
      }
    }
  });

  return merchantlist;
};

const getEventName = () => {
  var eventNames = [];
  data.merchant.forEach((mers) => {
    eventNames.push(mers.name);
  });
  return eventNames;
};

module.exports = {
  merchantf: merchantf,
  getEventName: getEventName,
};
