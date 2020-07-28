const Discord = require("discord.js");
const toHex = require("colornames")

module.exports = {
    name: "createrole",
    description: "Creates A new role in the guild",
    run: async (client, message, args) => {
        const name = args.slice(2).join(" ")
        const regex = !/[^a-zA-Z0-9]+/g.test(name)
        if (!message.member.hasPermission("MANAGE_ROLES")) {
        return message.channel.send("You don't have enough Permissions")
        }
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
        return message.channel.send("I don't have enough permissions to do this")
        }
        if (!name) {
        return message.channel.send("You need to specify a name for the role")
        }
        if (!args[1]) {
        return message.channel.send("You need to specify a color for the role")
        }
        if (toHex(args[1]) === undefined) {
        return message.channel.send("That is not a valid role color")
        }
        if (regex === false) {
        return message.channel.send("That is not valid role name. It can contain only letters and numbers")
        }
        if (name.length > 100) {
        return message.channel.send("Your role can't be more than 100 characters long")
        }
        message.guild.roles.create({
            data: {
                name: name,
                color: toHex(args[1])
            }
        })
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL())
        .setColor("RANDOM")
        .setDescription(`
**Role:** ${name}
**Action:** New Role Created
**Role Color:** ${args[1]} - ${toHex(args[1])}
**Channel:** ${message.channel}
**Time:** ${moment().format['llll']}
      `)
   message.channel.send(embed);
    }
}