require("dotenv").config();

const { Client, Intents } = require("discord.js");

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);

//import functions
let chaosf = require("./chaos");
let fieldBossf = require("./fieldBoss");
let ghostShipf = require("./ghostShip");
let merchantf = require("./merchant");
let intervaliid;

//idobejct;
var idobject = {};
const client = new Client({
  intents: myIntents,
});

const prefix = "~";
let channelid = "811432705446510612";
let guildid = "947415388235399179";
let channelid2 = "947415388235399179";

client.once("ready", () => {
  console.log("Bot online");
});

function fn10minutes() {
  const guild = client.guilds.cache.get(guildid);

  var currentDate = new Date();
  var psttime = currentDate.toLocaleString("en-US", {
    hourCycle: "h24",
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit",
  });

  var pstday = currentDate.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "long",
  });

  var psttime12 = currentDate.toLocaleString("en-US", {
    hourCycle: "h12",
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit",
  });

  psttime12 = psttime12.replace(/AM|PM/, "");

  //chaos timer
  var timechaos = chaosf.chaosf(psttime, pstday);

  let chaosid = idobject[chaosf.getEventName()];

  console.log(timechaos);
  if (timechaos != null) {
    guild.channels.cache
      .get(channelid)
      .send(
        "<@&" +
          chaosid +
          ">" +
          " there will be a chaos gate in " +
          timechaos +
          " minutes."
      );
  }

  //Field Boss timer
  var timefieldBoss = fieldBossf.fieldBossf(psttime, pstday);

  let fieldBossid = idobject[fieldBossf.getEventName()];

  console.log(timefieldBoss);
  if (timefieldBoss != null) {
    guild.channels.cache
      .get(channelid2)
      .send(
        "<@&" +
          fieldBossid +
          ">" +
          " there will be a field boss in " +
          timefieldBoss +
          " minutes."
      );
  }

  //Ghost Ship timer
  var timeghostShip = ghostShipf.ghostShipf(psttime, pstday);

  let ghostShipid = idobject[ghostShipf.getEventName()];

  console.log(timeghostShip);
  if (timeghostShip != null) {
    guild.channels.cache
      .get(channelid2)
      .send(
        "<@&" +
          ghostShipid +
          ">" +
          " there will be a ghost ship in " +
          timeghostShip +
          " minutes."
      );
  }

  //merchant timer

  var timeMerchant = merchantf.merchantf(psttime12);

  if (timeMerchant != null) {
    timeMerchant.forEach((mers) => {
      let merchantid = idobject[mers.schedule];

      var string = "";
      for (var j = 0; j < mers.merchantname.length; j++) {
        string += mers.merchantname[j] + "\n";
      }
      guild.channels.cache
        .get(channelid2)
        .send(
          "<@&" +
            merchantid +
            ">" +
            " there will be merchants spawn in " +
            mers.remaintime +
            " minutes at locations: " +
            "\n" +
            "**" +
            string +
            "**"
        );
    });
  }
}

client.on("messageCreate", (message) => {
  const guildss = client.guilds.cache.get(guildid);
  var merchants = merchantf.getEventName();

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === "createroles" && message.author.id == message.guild.ownerId) {
    createroles(message);
  } else if (
    command === "generateroleid" &&
    message.author.id == message.guild.ownerId
  ) {
    Object.keys(idobject).forEach((k) => delete idobject[k]);
    message.guild.roles.cache.forEach(
      (role) => (idobject[role.name] = role.id)
    );

    guildss.channels.cache.get(channelid).send("Alarm Start");

    clearInterval(intervaliid);
    intervaliid = setInterval(fn10minutes, 600000);
  }

  //getroles
  //chaos
  else if (command === "chaosgate") {
    if (
      message.member.roles.cache.some(
        (role) => role.name == chaosf.getEventName()
      )
    ) {
      guildss.channels.cache.get(channelid).send("Role already exist");
      return;
    } else {
      let role = message.guild.roles.cache.find(
        (role) => role.name == chaosf.getEventName()
      );
      message.member.roles.add(role);
      guildss.channels.cache
        .get(channelid)
        .send("**" + chaosf.getEventName() + "**" + " added.");
    }
  }

  //Field Boss
  else if (command === "fieldboss") {
    if (
      message.member.roles.cache.some(
        (role) => role.name == fieldBossf.getEventName()
      )
    ) {
      guildss.channels.cache.get(channelid).send("Role already exist");
      return;
    } else {
      let role = message.guild.roles.cache.find(
        (role) => role.name == fieldBossf.getEventName()
      );
      message.member.roles.add(role);
      guildss.channels.cache
        .get(channelid)
        .send("**" + fieldBossf.getEventName() + "**" + " added.");
    }
  }

  //Ghost Ship
  else if (command === "ghostship") {
    if (
      message.member.roles.cache.some(
        (role) => role.name == ghostShipf.getEventName()
      )
    ) {
      guildss.channels.cache.get(channelid).send("Role already exist");
      return;
    } else {
      let role = message.guild.roles.cache.find(
        (role) => role.name == ghostShipf.getEventName()
      );
      message.member.roles.add(role);
      guildss.channels.cache
        .get(channelid)
        .send("**" + ghostShipf.getEventName() + "**" + " added.");
    }
  }

  //merchant schedule 1
  else if (command === "ms1") {
    if (message.member.roles.cache.some((role) => role.name == merchants[0])) {
      guildss.channels.cache.get(channelid).send("Role already exist.");
      return;
    } else {
      let role = message.guild.roles.cache.find(
        (role) => role.name == merchants[0]
      );
      message.member.roles.add(role);
      guildss.channels.cache
        .get(channelid)
        .send("**" + merchants[0] + "**" + " added.");
    }
  }
  //merchant schedule 2
  else if (command === "ms2") {
    if (message.member.roles.cache.some((role) => role.name == merchants[1])) {
      guildss.channels.cache.get(channelid).send("Role already exist.");
      return;
    } else {
      let role = message.guild.roles.cache.find(
        (role) => role.name == merchants[1]
      );
      message.member.roles.add(role);
      guildss.channels.cache
        .get(channelid)
        .send("**" + merchants[1] + "**" + " added.");
    }
  }
  //merchant schedule 3
  else if (command === "ms3") {
    if (message.member.roles.cache.some((role) => role.name == merchants[2])) {
      guildss.channels.cache.get(channelid).send("Role already exist.");
      return;
    } else {
      let role = message.guild.roles.cache.find(
        (role) => role.name == merchants[2]
      );
      message.member.roles.add(role);
      guildss.channels.cache
        .get(channelid)
        .send("**" + merchants[2] + "**" + " added.");
    }
  }

  //removing roles

  //chaos
  else if (command === "rmchaosgate") {
    if (
      !message.member.roles.cache.some(
        (role) => role.name == chaosf.getEventName()
      )
    ) {
      guildss.channels.cache.get(channelid).send("You don't have this role.");
      return;
    } else {
      let role = message.guild.roles.cache.find(
        (role) => role.name == chaosf.getEventName()
      );
      message.member.roles.remove(role);
      guildss.channels.cache
        .get(channelid)
        .send("**" + chaosf.getEventName() + "**" + " removed.");
    }
  }

  //Field Boss
  else if (command === "rmfieldboss") {
    if (
      !message.member.roles.cache.some(
        (role) => role.name == fieldBossf.getEventName()
      )
    ) {
      guildss.channels.cache.get(channelid).send("You don't have this role.");
      return;
    } else {
      let role = message.guild.roles.cache.find(
        (role) => role.name == fieldBossf.getEventName()
      );
      message.member.roles.remove(role);
      guildss.channels.cache
        .get(channelid)
        .send("**" + fieldBossf.getEventName() + "**" + " removed.");
    }
  }

  //Ghost Ship
  else if (command === "rmghostship") {
    if (
      !message.member.roles.cache.some(
        (role) => role.name == ghostShipf.getEventName()
      )
    ) {
      guildss.channels.cache.get(channelid).send("You don't have this role.");
      return;
    } else {
      let role = message.guild.roles.cache.find(
        (role) => role.name == ghostShipf.getEventName()
      );
      message.member.roles.remove(role);
      guildss.channels.cache
        .get(channelid)
        .send("**" + ghostShipf.getEventName() + "**" + " removed.");
    }
  }

  //merchant schedule 1
  else if (command === "rmms1") {
    if (!message.member.roles.cache.some((role) => role.name == merchants[0])) {
      guildss.channels.cache.get(channelid).send("You don't have this role.");
      return;
    } else {
      let role = message.guild.roles.cache.find(
        (role) => role.name == merchants[0]
      );
      message.member.roles.remove(role);
      guildss.channels.cache
        .get(channelid)
        .send("**" + merchants[0] + "**" + " removed.");
    }
  }
  //merchant schedule 2
  else if (command === "rmms2") {
    if (!message.member.roles.cache.some((role) => role.name == merchants[1])) {
      guildss.channels.cache.get(channelid).send("You don't have this role.");
      return;
    } else {
      let role = message.guild.roles.cache.find(
        (role) => role.name == merchants[1]
      );
      message.member.roles.remove(role);
      guildss.channels.cache
        .get(channelid)
        .send("**" + merchants[1] + "**" + " removed.");
    }
  }
  //merchant schedule 3
  else if (command === "rmms3") {
    if (!message.member.roles.cache.some((role) => role.name == merchants[2])) {
      guildss.channels.cache.get(channelid).send("You don't have this role.");
      return;
    } else {
      let role = message.guild.roles.cache.find(
        (role) => role.name == merchants[2]
      );
      message.member.roles.remove(role);
      guildss.channels.cache
        .get(channelid)
        .send("**" + merchants[2] + "**" + " removed.");
    }
  }
});

//creating roles for server
const createroles = (message) => {
  //chaos role
  if (
    message.guild.roles.cache.find((role) => role.name == chaosf.getEventName())
  ) {
    console.log("role exist");
  } else {
    message.guild.roles
      .create({
        name: chaosf.getEventName(),
        color: "#c90076",
      })
      .catch(console.error);
  }

  //Field Boss role
  if (
    message.guild.roles.cache.find(
      (role) => role.name == fieldBossf.getEventName()
    )
  ) {
    console.log("role exist");
  } else {
    message.guild.roles
      .create({
        name: fieldBossf.getEventName(),
        color: "#00FF00",
      })
      .catch(console.error);
  }

  //Ghost Ship role
  if (
    message.guild.roles.cache.find(
      (role) => role.name == ghostShipf.getEventName()
    )
  ) {
    console.log("Role exist");
  } else {
    message.guild.roles
      .create({
        name: ghostShipf.getEventName(),
        color: "#808080",
      })
      .catch(console.error);
  }

  var merchants = merchantf.getEventName();
  for (var i = 0; i < merchants.length; i++) {
    if (message.guild.roles.cache.find((role) => role.name == merchants[i])) {
      console.log("Role exist");
    } else {
      message.guild.roles
        .create({
          name: merchants[i],
          color: "#FFFF00",
        })
        .catch(console.error);
    }
  }
  return false;
};

client.login(process.env.BOT_TOKEN);
