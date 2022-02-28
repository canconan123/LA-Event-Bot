require("dotenv").config();

const { Client, Intents } = require("discord.js");

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);

//import functions
let chaosf = require("./chaos");

//idobejct;
var idobject = {};
const client = new Client({
  intents: myIntents,
});

const prefix = "~";
let channelid = "947415388235399179";
let guildid = "811432705446510612";

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
          "there will be a chaos gate in " +
          timechaos +
          " minutes."
      );
  }
}

client.on("messageCreate", (message) => {
  const guildss = client.guilds.cache.get(guildid);
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

    guildss.channels.cache.get(channelid).send("Alram Start");
    setInterval(fn10minutes, 600000);
  }

  //getroles
  else if (command === "chaosgate") {
    if (
      message.member.roles.cache.some(
        (role) => role.name == chaosf.getEventName()
      )
    ) {
      guildss.channels.cache.get(channelid).send("Role Alreasdy Exist");
      return;
    } else {
      message.member.roles.add(idobject[chaosf.getEventName()]);
    }
  }
});

const createroles = (message) => {
  //chaos role
  if (message.guild.roles.cache.find((role) => role.name == "Chaos Gate")) {
    console.log("role exist");
    return false;
  } else {
    message.guild.roles
      .create({
        name: chaosf.getEventName(),
        color: "#c90076",
      })
      .catch(console.error);
  }
};

client.login(process.env.BOT_TOKEN);
