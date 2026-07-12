import type { Category } from "@/lib/types";

export const Categories: Category[] = [
  {
    Id: "info",
    Name: "Info",
    Blurb: "mostly helper commands",
    Commands: [
      {
        Name: "/cmds",
        Description: "prints every available in-game command",
        Roles: ["EVERYONE"],
      },
      {
        Name: "/psCmds",
        Description: "prints every private server command",
        Roles: ["EVERYONE"],
      },
      {
        Name: "/serverRegion",
        Aliases: ["sr"],
        Description: "prints the current server region",
        Roles: ["EVERYONE"],
      },
      {
        Name: "/cwencing",
        Aliases: ["cwence"],
        Description: "toggles cwencing on or off (grants access to cwencer_slayer_v2.0.0)",
        Args: [
          {
            Required: true,
            Label: "<on/off>",
            Type: "on_off",
            Description: "on to enable, off to disable",
          },
        ],
        Roles: ["EVERYONE"],
      },
      {
        Name: "/mapIds",
        Description: "prints every available map id",
        Roles: ["EVERYONE"],
      },
      {
        Name: "/weatherTypes",
        Description: "prints every available weather type",
        Roles: ["EVERYONE"],
      },
      {
        Name: "/getPos",
        Description: "prints a player's x, y, z coordinates to chat",
        Args: [
          {
            Required: true,
            Label: "<player>",
            Type: "player",
            Description: "the player whose position to read",
          },
        ],
        Roles: ["EVERYONE"],
      },
      {
        Name: "/rejoin",
        Description: "makes you leave and rejoin the current server",
        Roles: ["EVERYONE"],
      },
      {
        Name: "/lagCompensationEnabled",
        Aliases: ["lagComp", "lagCompensation"],
        Description: "prints whether lag compensation is enabled",
        Roles: ["EVERYONE"],
      },
      {
        Name: "/openUpd3Rollback",
        Description: "no clue what this does",
        Roles: ["EVERYONE"],
      },
      {
        Name: "/randomlySlash",
        Description: "toggles random melee swinging",
        Roles: ["EVERYONE"],
      },
      {
        Name: "/purchases",
        Description: "prints all purchases",
        Roles: ["EVERYONE"],
      },
    ],
  },
  {
    Id: "moderation",
    Name: "Moderation",
    Blurb: "moderation management",
    Commands: [
      {
        Name: "/spawn",
        Description: "respawns a player with 2 other arguments that dont even work",
        Args: [
          {
            Required: true,
            Label: "<player>",
            Type: "player",
            Description: "the player to respawn",
          },
          {
            Required: false,
            Label: "[tpOnSpawn]",
            Type: "on_off",
            Description: "no clue what this is",
          },
          {
            Required: false,
            Label: "[hpOnSpawn]",
            Type: "number",
            Description:
              "health to give the player on respawn? (doesn't work due to you having forcefield on spawn)",
          },
        ],
        Roles: ["PS_OWNER", "MOD", "ADMIN"],
        Bugged: true,
      },
      {
        Name: "/psKick",
        Description: "kicks a player from the private server",
        Args: [
          { Required: true, Label: "<player>", Type: "player", Description: "the player to kick" },
          {
            Required: false,
            Label: "[reason]",
            Type: "string",
            Description: "optional reason shown to the kicked player",
          },
        ],
        Roles: ["PS_OWNER", "MOD", "ADMIN"],
      },
      {
        Name: "/psBan",
        Description: "bans a player from the private server",
        Args: [
          { Required: true, Label: "<player>", Type: "player", Description: "the player to ban" },
          {
            Required: false,
            Label: "[reason]",
            Type: "string",
            Description: "optional reason shown to the banned player",
          },
        ],
        Roles: ["PS_OWNER", "MOD", "ADMIN"],
      },
      {
        Name: "/psUnban",
        Description: "unbans a player by name",
        Args: [
          {
            Required: true,
            Label: "<playerName>",
            Type: "string",
            Description: "the name of the player to unban",
          },
        ],
        Roles: ["PS_OWNER", "MOD", "ADMIN"],
      },
      {
        Name: "/kick",
        Description: "kicks a player from the server",
        Args: [
          { Required: true, Label: "<player>", Type: "player", Description: "the player to kick" },
          {
            Required: true,
            Label: "<reason>",
            Type: "string",
            Description: "reason shown to the kicked player",
          },
        ],
        Roles: ["MOD", "ADMIN"],
      },
      {
        Name: "/banPlayer",
        Description: "bans a player from the game with full ban details",
        Args: [
          {
            Required: true,
            Label: "<playerNameToBan>",
            Type: "string",
            Description: "player name to ban",
          },
          {
            Required: true,
            Label: "<durationInDays>",
            Type: "number",
            Description: "how many days the ban lasts",
          },
          {
            Required: true,
            Label: "<evidence>",
            Type: "string",
            Description: "evidence supporting the ban",
          },
          {
            Required: true,
            Label: "<reason>",
            Type: "string",
            Description: "reason shown to the banned player",
          },
          {
            Required: true,
            Label: "<delayInDays>",
            Type: "number",
            Description: "days until the ban takes effect",
          },
        ],
        Roles: ["MOD", "ADMIN"],
      },
      {
        Name: "/banUserId",
        Description: "bans a roblox account by user id",
        Args: [
          {
            Required: true,
            Label: "<userIdToBan>",
            Type: "string",
            Description: "roblox user id to ban",
          },
          {
            Required: true,
            Label: "<durationInDays>",
            Type: "number",
            Description: "how many days the ban lasts",
          },
          {
            Required: true,
            Label: "<evidence>",
            Type: "string",
            Description: "evidence supporting the ban",
          },
          {
            Required: true,
            Label: "<reason>",
            Type: "string",
            Description: "reason shown to the banned player",
          },
          {
            Required: true,
            Label: "<delayInDays>",
            Type: "number",
            Description: "days until the ban takes effect",
          },
        ],
        Roles: ["MOD", "ADMIN"],
      },
      {
        Name: "/unbanUserId",
        Description: "unbans a roblox account by user id",
        Args: [
          {
            Required: true,
            Label: "<userIdToUnban>",
            Type: "string",
            Description: "roblox user id to unban",
          },
          {
            Required: true,
            Label: "<reason>",
            Type: "string",
            Description: "reason for the unban",
          },
        ],
        Roles: ["MOD", "ADMIN"],
      },
      {
        Name: "/respawn",
        Description: "respawns a player into the menu",
        Args: [
          {
            Required: true,
            Label: "<playerName>",
            Type: "player",
            Description: "the player to respawn",
          },
        ],
        Roles: ["PS_OWNER", "MOD", "ADMIN"],
      },
      {
        Name: "/givePsPerms",
        Description: "grants a player private server admin permissions",
        Args: [
          {
            Required: true,
            Label: "<player>",
            Type: "player",
            Description: "the player to grant ps admin perms to",
          },
        ],
        Roles: ["PS_OWNER", "ADMIN"],
      },
      {
        Name: "/removePsPerms",
        Description: "revokes a player's private server admin permissions",
        Args: [
          {
            Required: true,
            Label: "<playerName>",
            Type: "player",
            Description: "the player whose ps admin perms to revoke",
          },
        ],
        Roles: ["PS_OWNER", "ADMIN"],
      },
      {
        Name: "/teleport",
        Aliases: ["tp"],
        Description: "teleports one player to another player",
        Args: [
          {
            Required: true,
            Label: "<playerToTeleport>",
            Type: "player",
            Description: "the player who will be moved",
          },
          {
            Required: true,
            Label: "<playerToTeleportTo>",
            Type: "player",
            Description: "the destination player",
          },
        ],
        Roles: ["PS_OWNER", "MOD", "ADMIN", "DEV"],
      },
      {
        Name: "/teleportPos",
        Aliases: ["tpPos"],
        Description: "teleports a player to specific coordinates",
        Args: [
          {
            Required: true,
            Label: "<playerToTeleport>",
            Type: "player",
            Description: "the player to teleport",
          },
          {
            Required: true,
            Label: "<position>",
            Type: "vector3",
            Description: "coordinates in the form of x, y, z",
          },
        ],
        Roles: ["PS_OWNER", "MOD", "ADMIN", "DEV"],
      },
      {
        Name: "/switchTeam",
        Aliases: ["team"],
        Description: "moves a player to another team",
        Args: [
          { Required: true, Label: "<player>", Type: "player", Description: "the player to move" },
          {
            Required: false,
            Label: "[teamName]",
            Type: "string",
            Description: "team to switch them to. skip to toggle",
          },
        ],
        Roles: ["PS_OWNER", "MOD", "ADMIN"],
      },
      {
        Name: "/changeTeamName",
        Aliases: ["teamName"],
        Description: "renames an existing team",
        Args: [
          {
            Required: true,
            Label: "<teamNameToChange>",
            Type: "string",
            Description: "the current team name",
          },
          {
            Required: true,
            Label: "<newTeamName>",
            Type: "string",
            Description: "the new name to give the team",
          },
        ],
        Roles: ["PS_OWNER", "MOD", "ADMIN"],
      },
      {
        Name: "/view",
        Description: "spectates a player",
        Args: [
          {
            Required: true,
            Label: "<player>",
            Type: "player",
            Description: "the player to spectate",
          },
        ],
        Roles: ["MOD", "ADMIN"],
      },
      {
        Name: "/unview",
        Description: "stops spectating and return to your character",
        Roles: ["MOD", "ADMIN"],
      },
      {
        Name: "/removeFromLeaderboard",
        Description: "removes a username from a leaderboard",
        Args: [
          {
            Required: true,
            Label: "<username>",
            Type: "string",
            Description: "the username to remove",
          },
          {
            Required: true,
            Label: "<leaderboardType>",
            Type: "string",
            Description: "leaderboard key to remove them from",
          },
        ],
        Roles: ["MOD", "ADMIN"],
      },
    ],
  },
  {
    Id: "player-state",
    Name: "Player State",
    Blurb: "cmds related to da player state",
    Commands: [
      {
        Name: "/freeze",
        Description: "freezes a player in place",
        Args: [
          {
            Required: true,
            Label: "<playerName>",
            Type: "player",
            Description: "the player to freeze",
          },
        ],
        Roles: ["PS_OWNER", "MOD", "ADMIN"],
      },
      {
        Name: "/unfreeze",
        Description: "unfreezes a previously frozen player",
        Args: [
          {
            Required: true,
            Label: "<player>",
            Type: "player",
            Description: "the player to unfreeze",
          },
        ],
        Roles: ["PS_OWNER", "MOD", "ADMIN"],
      },
      {
        Name: "/fly",
        Description: "enables flying for a player",
        Args: [
          {
            Required: true,
            Label: "<player>",
            Type: "player",
            Description: "the player to enable flying for",
          },
          {
            Required: false,
            Label: "[speed]",
            Type: "number",
            Description: "optional fly speed multiplier",
          },
        ],
        Roles: ["PS_OWNER", "MOD", "ADMIN", "DEV"],
      },
      {
        Name: "/unfly",
        Description: "disables flying for a player",
        Args: [
          {
            Required: true,
            Label: "<player>",
            Type: "player",
            Description: "the player to disable flying for",
          },
        ],
        Roles: ["PS_OWNER", "MOD", "ADMIN", "DEV"],
      },
      {
        Name: "/ragdoll",
        Description: "turns a player into a ragdoll",
        Args: [
          {
            Required: true,
            Label: "<player>",
            Type: "player",
            Description: "the player to ragdoll",
          },
        ],
        Roles: ["PS_OWNER", "ADMIN", "DEV"],
      },
      {
        Name: "/unragdoll",
        Description: "restores a ragdolled player to standing",
        Args: [
          {
            Required: true,
            Label: "<player>",
            Type: "player",
            Description: "the player to restore",
          },
        ],
        Roles: ["PS_OWNER", "ADMIN", "DEV"],
      },
      {
        Name: "/invisible",
        Aliases: ["invis"],
        Description: "toggles a player's visibility",
        Args: [
          {
            Required: true,
            Label: "<player>",
            Type: "player",
            Description: "the player whose visibility to toggle",
          },
          {
            Required: true,
            Label: "<on/off>",
            Type: "on_off",
            Description: "on to hide, off to show",
          },
        ],
        Roles: ["PS_OWNER", "ADMIN", "DEV"],
      },
      {
        Name: "/giant",
        Description: "changes a player's character scale",
        Args: [
          { Required: true, Label: "<player>", Type: "player", Description: "the player to scale" },
          {
            Required: false,
            Label: "[scale]",
            Type: "number",
            Description: "scale multiplier. skip to reset",
          },
        ],
        Roles: ["PS_OWNER", "ADMIN"],
      },
      {
        Name: "/noclip",
        Description: "lets a player phase through walls",
        Args: [
          {
            Required: true,
            Label: "<player>",
            Type: "player",
            Description: "the player to noclip",
          },
        ],
        Roles: ["MOD", "ADMIN"],
      },
      {
        Name: "/clip",
        Description: "restores collisions for a noclipping player",
        Args: [
          {
            Required: true,
            Label: "<player>",
            Type: "player",
            Description: "the player to clip back",
          },
        ],
        Roles: ["MOD", "ADMIN"],
      },
      {
        Name: "/equipItem",
        Description: "equips an item onto a player",
        Args: [
          {
            Required: true,
            Label: "<playerName>",
            Type: "player",
            Description: "the player to equip the item on",
          },
          {
            Required: true,
            Label: "<itemName>",
            Type: "string",
            Description: "name of the item to equip",
          },
          {
            Required: false,
            Label: "[itemType]",
            Type: "string",
            Description: "optional item type / category",
          },
          {
            Required: false,
            Label: "[autoEquip]",
            Type: "boolean",
            Description: "whether the item is equipped automatically",
          },
        ],
        Roles: ["ADMIN", "DEV"],
      },
      {
        Name: "/setMyNetworkOwner",
        Description: "takes network ownership of a player's character",
        Args: [
          {
            Required: false,
            Label: "[player]",
            Type: "player",
            Description: "the player to take ownership of. skip for self",
          },
        ],
        Roles: ["ADMIN"],
        Bugged: true,
      },
      {
        Name: "/dismember",
        Description: "dismembers a specific part of a player's character",
        Args: [
          {
            Required: true,
            Label: "<player>",
            Type: "player",
            Description: "the player to dismember",
          },
          {
            Required: true,
            Label: "<dismembermentType>",
            Type: "string",
            Description: "type of dismemberment to apply",
          },
          {
            Required: true,
            Label: "<partName>",
            Type: "string",
            Description: "name of the character part to remove",
          },
        ],
        Roles: ["ADMIN"],
      },
      {
        Name: "/getCat",
        Description: "gives you a cat as a tool",
        Roles: ["EVERYONE"],
      },
      {
        Name: "/getGoblin",
        Description: "gives you sam_youwell's cat as a tool (his name is goblin)",
        Roles: ["EVERYONE"],
      },
      {
        Name: "/godPlayer",
        Aliases: ["god"],
        Description: "makes a player invincible",
        Args: [
          {
            Required: true,
            Label: "<playerToGod>",
            Type: "player",
            Description: "the player to make invincible",
          },
        ],
        Roles: ["DEV"],
      },
      {
        Name: "/ungodPlayer",
        Aliases: ["ungod"],
        Description: "removes a player's invincibility",
        Args: [
          {
            Required: true,
            Label: "<playerToUngod>",
            Type: "player",
            Description: "the player to ungod",
          },
        ],
        Roles: ["DEV"],
      },
    ],
  },
  {
    Id: "combat",
    Name: "Combat",
    Blurb: "combat related commands",
    Commands: [
      {
        Name: "/damage",
        Description: "deals damage to a player",
        Args: [
          {
            Required: true,
            Label: "<player>",
            Type: "player",
            Description: "the player to damage",
          },
          {
            Required: true,
            Label: "<damage>",
            Type: "number",
            Description: "amount of damage to deal",
          },
          {
            Required: false,
            Label: "[delay]",
            Type: "number",
            Description: "delay in seconds before damage applies",
          },
        ],
        Roles: ["PS_OWNER", "ADMIN"],
      },
      {
        Name: "/damageNpcs",
        Aliases: ["dmgNpcs"],
        Description: "damages nearby npcs around you",
        Args: [
          {
            Required: false,
            Label: "[damage]",
            Type: "number",
            Description: "damage per npc. defaults to a small amount",
          },
          {
            Required: false,
            Label: "[radius]",
            Type: "number",
            Description: "radius in studs. defaults to a small radius",
          },
        ],
        Roles: ["PS_OWNER", "ADMIN", "DEV"],
      },
      {
        Name: "/heal",
        Description: "restores a player's health",
        Args: [
          { Required: true, Label: "<player>", Type: "player", Description: "the player to heal" },
          {
            Required: false,
            Label: "[health]",
            Type: "number",
            Description: "amount of health to restore. skip to full-heal",
          },
        ],
        Roles: ["PS_OWNER", "ADMIN"],
      },
      {
        Name: "/health",
        Description: "sets a player's health value",
        Args: [
          {
            Required: true,
            Label: "<player>",
            Type: "player",
            Description: "the player whose health to set",
          },
          {
            Required: false,
            Label: "[health]",
            Type: "number",
            Description: "target health value. skip to reset",
          },
        ],
        Roles: ["PS_OWNER", "ADMIN"],
      },
      {
        Name: "/explode",
        Description: "creates an explosion at a player's location",
        Args: [
          {
            Required: true,
            Label: "<playerName>",
            Type: "player",
            Description: "the player at the explosion center",
          },
          {
            Required: false,
            Label: "[damage]",
            Type: "number",
            Description: "damage dealt to nearby players",
          },
          {
            Required: false,
            Label: "[radius]",
            Type: "number",
            Description: "explosion radius in studs",
          },
          {
            Required: false,
            Label: "[pressure]",
            Type: "number",
            Description: "explosion pressure (pushback force)",
          },
        ],
        Roles: ["PS_OWNER", "ADMIN"],
      },
      {
        Name: "/giveXp",
        Description: "grants xp to a player",
        Args: [
          {
            Required: true,
            Label: "<player>",
            Type: "player",
            Description: "the player to grant xp to",
          },
          { Required: true, Label: "<xp>", Type: "number", Description: "amount of xp to grant" },
        ],
        Roles: ["ADMIN"],
      },
      {
        Name: "/addSkillRequirement",
        Aliases: ["addSkillReq"],
        Description: "sets a skill requirement on the local player",
        Args: [
          {
            Required: true,
            Label: "<requirement>",
            Type: "string",
            Description: "standardkills, glorykills, finisherkills, damage, score or parries",
          },
          {
            Required: true,
            Label: "<amount>",
            Type: "integer",
            Description: "target count for the requirement",
          },
        ],
        Roles: ["PS_OWNER", "DEV"],
      },
    ],
  },
  {
    Id: "gameplay",
    Name: "Gameplay",
    Blurb: "cmds that change the gameplay",
    Commands: [
      {
        Name: "/switchMap",
        Aliases: ["map"],
        Description: "changes the current map and optionally a gamemode",
        Args: [
          {
            Required: true,
            Label: "<mapId>",
            Type: "string",
            Description: "the map id to switch to. run /mapids to see the full list",
          },
          {
            Required: false,
            Label: "[gamemodeId]",
            Type: "string",
            Description: "optional gamemode to start with",
          },
        ],
        Roles: ["PS_OWNER", "ADMIN", "DEV"],
      },
      {
        Name: "/roundTime",
        Description: "sets the round duration in seconds",
        Args: [
          {
            Required: true,
            Label: "<seconds>",
            Type: "number",
            Description: "round duration in seconds (300 = 5 minutes)",
          },
        ],
        Roles: ["PS_OWNER", "ADMIN", "DEV"],
      },
      {
        Name: "/criticalHits",
        Description: "toggles critical hit damage in the round",
        Args: [
          {
            Required: true,
            Label: "<on/off>",
            Type: "on_off",
            Description: "on to enable, off to disable",
          },
        ],
        Roles: ["PS_OWNER", "ADMIN"],
      },
      {
        Name: "/airdrops",
        Description: "toggles whether airdrops spawn during the round",
        Args: [
          {
            Required: true,
            Label: "<on/off>",
            Type: "on_off",
            Description: "on to enable, off to disable",
          },
        ],
        Roles: ["PS_OWNER", "ADMIN"],
      },
      {
        Name: "/utilityItems",
        Description: "toggles whether utility items spawn during the round",
        Args: [
          {
            Required: true,
            Label: "<on/off>",
            Type: "on_off",
            Description: "on to enable, off to disable",
          },
        ],
        Roles: ["PS_OWNER", "ADMIN"],
      },
      {
        Name: "/showUsernames",
        Description: "toggles player nameplates above characters",
        Args: [
          {
            Required: true,
            Label: "<on/off>",
            Type: "on_off",
            Description: "on to show, off to hide",
          },
        ],
        Roles: ["PS_OWNER", "ADMIN"],
      },
      {
        Name: "/enablePvp",
        Description: "enables pvp in the current round",
        Roles: ["ADMIN"],
      },
      {
        Name: "/disablePvp",
        Description: "disables pvp in the current round",
        Roles: ["ADMIN"],
      },
      {
        Name: "/toggleDisasters",
        Description: "toggles natural disasters during the round",
        Args: [
          {
            Required: true,
            Label: "<on/off>",
            Type: "on_off",
            Description: "on to enable, off to disable",
          },
        ],
        Roles: ["ADMIN"],
      },
      {
        Name: "/toggleRoactUI",
        Description: "toggles the roact ui overlay",
        Args: [
          {
            Required: true,
            Label: "<on/off>",
            Type: "on_off",
            Description: "on to show, off to hide",
          },
        ],
        Roles: ["MOD", "ADMIN"],
      },
      {
        Name: "/toggleBlacklist",
        Description: "toggles blacklist for spray decals",
        Args: [
          {
            Required: true,
            Label: "<assetId>",
            Type: "string",
            Description: "roblox asset id to blacklist or unblacklist",
          },
          {
            Required: true,
            Label: "<reason>",
            Type: "string",
            Description: "reason for the blacklist action",
          },
        ],
        Roles: ["ADMIN"],
      },
      {
        Name: "/balance",
        Description: "prints balance info to chat",
        Roles: ["ADMIN", "DEV"],
      },
    ],
  },
  {
    Id: "world",
    Name: "World",
    Blurb: "set the weather, spawn airdrops",
    Commands: [
      {
        Name: "/weather",
        Description: "changes the current weather",
        Args: [
          {
            Required: true,
            Label: "<weather>",
            Type: "string",
            Description: "weather to set. run /weathertypes for the full list",
          },
        ],
        Roles: ["PS_OWNER", "MOD", "ADMIN"],
      },
      {
        Name: "/spawnAirdrop",
        Aliases: ["airdrop"],
        Description: "spawns airdrops immediately at the given count",
        Args: [
          {
            Required: true,
            Label: "<numOfAirdrops>",
            Type: "number",
            Description: "how many airdrops to spawn",
          },
          {
            Required: false,
            Label: "[airdropType]",
            Type: "airdropType",
            Description: "optional type of airdrop to spawn",
          },
        ],
        Roles: ["PS_OWNER", "ADMIN"],
      },
      {
        Name: "/spawnResAirdrop",
        Aliases: ["resAirdrop"],
        Description: "spawns a reserved airdrop immediately",
        Args: [
          {
            Required: false,
            Label: "[reservedAirdropRewardType]",
            Type: "string",
            Description: "specific reserved airdrop reward type to spawn",
          },
        ],
        Roles: ["ADMIN", "DEV"],
      },
    ],
  },
  {
    Id: "clans",
    Name: "Clans",
    Blurb: "clan managing cmds",
    Commands: [
      {
        Name: "/verifyClan",
        Description: "marks a clan as verified",
        Args: [
          {
            Required: true,
            Label: "<clanTag>",
            Type: "string",
            Description: "tag of the clan to verify",
          },
        ],
        Roles: ["MOD", "ADMIN"],
      },
      {
        Name: "/unverifyClan",
        Description: "removes a clan's verified status",
        Args: [
          {
            Required: true,
            Label: "<clanTag>",
            Type: "string",
            Description: "tag of the clan to unverify",
          },
        ],
        Roles: ["MOD", "ADMIN"],
      },
      {
        Name: "/deleteClan",
        Description: "deletes a clan by tag",
        Args: [
          {
            Required: true,
            Label: "<clanTag>",
            Type: "string",
            Description: "tag of the clan to delete",
          },
        ],
        Roles: ["ADMIN"],
      },
      {
        Name: "/changeClanMemberRank",
        Description: "changes a member's rank inside a clan",
        Args: [
          { Required: true, Label: "<clanId>", Type: "string", Description: "id of the clan" },
          {
            Required: true,
            Label: "<userId>",
            Type: "string",
            Description: "roblox user id of the member",
          },
          {
            Required: true,
            Label: "<rankName>",
            Type: "string",
            Description: "name of the rank to assign",
          },
        ],
        Roles: ["ADMIN", "DEV"],
      },
    ],
  },
  {
    Id: "announcements",
    Name: "Announcements",
    Blurb: "announcements managing n making",
    Commands: [
      {
        Name: "/makeAnnouncement",
        Description: "posts a server-wide announcement",
        Args: [
          {
            Required: true,
            Label: "<lifetimeInMinutes>",
            Type: "number",
            Description: "how many minutes the announcement should stay up",
          },
          {
            Required: true,
            Label: "<message>",
            Type: "string",
            Description: "the announcement text",
          },
          {
            Required: false,
            Label: "[entryNumToOverride]",
            Type: "number",
            Description: "optional announcement id to replace instead of creating a new one",
          },
        ],
        Roles: ["ADMIN"],
      },
      {
        Name: "/extendAnnouncement",
        Description: "extends an existing announcement's duration",
        Args: [
          {
            Required: true,
            Label: "<entryNum>",
            Type: "number",
            Description: "id of the announcement to extend",
          },
          {
            Required: true,
            Label: "<newLifetimeInMinutes>",
            Type: "number",
            Description: "new lifetime in minutes from now",
          },
        ],
        Roles: ["ADMIN"],
      },
      {
        Name: "/removeAnnouncement",
        Description: "removes an announcement by id",
        Args: [
          {
            Required: true,
            Label: "<id>",
            Type: "string",
            Description: "id of the announcement to remove",
          },
        ],
        Roles: ["ADMIN"],
      },
      {
        Name: "/getAnnouncements",
        Description: "lists every active announcement",
        Roles: ["ADMIN"],
      },
    ],
  },
  {
    Id: "emotes",
    Name: "Emotes",
    Blurb: "emotes related stuff",
    Commands: [
      {
        Name: "/emote",
        Description: "plays an emote by name",
        Args: [
          {
            Required: true,
            Label: "<emoteName>",
            Type: "string",
            Description: "name of the emote to play. run /listemotes for the full list",
          },
        ],
        Roles: ["EVERYONE"],
      },
      {
        Name: "/listEmotes",
        Description: "lists every available emote",
        Roles: ["EVERYONE"],
      },
    ],
  },
  {
    Id: "dev",
    Name: "Development",
    Blurb: "debug tools n such",
    Commands: [
      {
        Name: "/debug_code",
        Description: "does nothing",
        Args: [
          {
            Required: false,
            Label: "[input]",
            Type: "string",
            Description: "unknown",
          },
        ],
        Roles: ["DEV"],
        Bugged: true,
      },
      {
        Name: "/checkpoint",
        Description: "command solely made to debug the hunt event checkpints",
        Args: [
          {
            Required: false,
            Label: "[checkpointNumber]",
            Type: "number",
            Description:
              "specific checkpoint to jump to (for some reason not a required argument?)",
          },
        ],
        Roles: ["ADMIN", "DEV"],
      },
      {
        Name: "/debug_crater",
        Description: "spawns a debug crater effect",
        Args: [
          {
            Required: false,
            Label: "[type]",
            Type: "string",
            Description: "crater variant to spawn",
          },
        ],
        Roles: ["DEV"],
      },
      {
        Name: "/debug_giveTempMythical",
        Description: "temporarily gives you a mythical weapon",
        Roles: ["ADMIN"],
      },
      {
        Name: "/debug_killIcon",
        Description: "displays kill icon",
        Args: [
          {
            Required: true,
            Label: "<isCrit>",
            Type: "on_off",
            Description: "on for crit icon, off for normal icon",
          },
          {
            Required: false,
            Label: "[killstreak]",
            Type: "number",
            Description: "killstreak count to display",
          },
        ],
        Roles: ["ADMIN", "DEV"],
      },
      {
        Name: "/debug_setCurrAimInfo",
        Description: "no clue what this does",
        Args: [
          {
            Required: false,
            Label: "[offset]",
            Type: "cframe",
            Description: "unknown",
          },
        ],
        Roles: ["ADMIN"],
      },
      {
        Name: "/debugGraph",
        Description:
          "by command name its supposed to toggle a debug graph ui, but it just doesn't work",
        Args: [
          {
            Required: true,
            Label: "<on/off>",
            Type: "on_off",
            Description: "on to show, off to hide",
          },
        ],
        Roles: ["ADMIN", "DEV"],
        Bugged: true,
      },
      {
        Name: "/dexExplorer",
        Description: "toggles the dark dex explorer",
        Args: [
          {
            Required: true,
            Label: "<on/off>",
            Type: "on_off",
            Description: "on to show, off to hide",
          },
        ],
        Roles: ["ADMIN", "DEV"],
      },
      {
        Name: "/packetProfiler",
        Description: 'does nothing, but prints "Loaded local script in chat"',
        Roles: ["ADMIN", "DEV"],
        Bugged: true,
      },
      {
        Name: "/printRoduxConns",
        Description: "prints rodux connections to the console",
        Args: [
          {
            Required: false,
            Label: "[alwaysPrintAll]",
            Type: "on_off",
            Description: "on to print every connection every frame",
          },
        ],
        Roles: ["ADMIN", "DEV"],
      },
      {
        Name: "/printRsState",
        Description: "prints the rodux store state to the console",
        Roles: ["DEV"],
      },
      {
        Name: "/recentUnboxes",
        Description: "prints recent unboxes for a case",
        Args: [
          {
            Required: true,
            Label: "<caseId>",
            Type: "string",
            Description: "case id to read recent unboxes from",
          },
        ],
        Roles: ["ADMIN", "DEV"],
      },
      {
        Name: "/devMenu",
        Aliases: ["debugMenu"],
        Description: "opens the developer menu",
        Roles: ["ADMIN", "DEV"],
      },
      {
        Name: "/dev_addAssists",
        Description: "adds assists to the local player's stats",
        Args: [
          { Required: true, Label: "<amount>", Type: "number", Description: "assists to add" },
        ],
        Roles: ["DEV"],
      },
      {
        Name: "/dev_addKills",
        Description: "adds kills to the local player's stats",
        Args: [{ Required: true, Label: "<amount>", Type: "number", Description: "kills to add" }],
        Roles: ["DEV"],
      },
      {
        Name: "/dev_addScore",
        Description: "adds score to the local player's stats",
        Args: [{ Required: true, Label: "<amount>", Type: "number", Description: "score to add" }],
        Roles: ["ADMIN", "DEV"],
      },
      {
        Name: "/dev_addToKillStreakForRewards",
        Description: "adds to the local player's killstreak-for-rewards counter",
        Args: [{ Required: true, Label: "<amount>", Type: "number", Description: "amount to add" }],
        Roles: ["DEV"],
      },
      {
        Name: "/dev_addToQuestProgressType",
        Description: "adds progress to a quest type on the local player",
        Args: [
          {
            Required: true,
            Label: "<progressType>",
            Type: "string",
            Description: "quest progress type key",
          },
          {
            Required: false,
            Label: "[amount]",
            Type: "number",
            Description: "amount to add. defaults to 1",
          },
        ],
        Roles: ["DEV"],
      },
      {
        Name: "/dev_destroyTools",
        Aliases: ["dev_dt"],
        Description: "destroys every tool in the local player's backpack",
        Roles: ["DEV"],
      },
      {
        Name: "/dev_giveCurrency",
        Description: "gives currency to the local player",
        Args: [
          {
            Required: true,
            Label: "<currencyName>",
            Type: "string",
            Description: "currency key to grant",
          },
          { Required: true, Label: "<amount>", Type: "number", Description: "amount to grant" },
        ],
        Roles: ["DEV"],
      },
      {
        Name: "/dev_parryDuration",
        Description: "overrides the local player's parry duration",
        Args: [
          {
            Required: false,
            Label: "[duration]",
            Type: "number",
            Description: "parry window in seconds. skip to reset",
          },
        ],
        Roles: ["DEV"],
      },
      {
        Name: "/dev_removeAllCosmetics",
        Description: "strips every cosmetic from the local player",
        Roles: ["DEV"],
      },
      {
        Name: "/dev_removeAllItems",
        Description: "strips every item from the local player",
        Roles: ["DEV"],
      },
      {
        Name: "/dev_setRating",
        Aliases: ["dev_setrating"],
        Description: "overrides the local player's rating",
        Args: [
          { Required: true, Label: "<rating>", Type: "number", Description: "rating value to set" },
        ],
        Roles: ["ADMIN", "DEV"],
      },
      {
        Name: "/dev_unlockAllCases",
        Description: "unlocks every case for the local player",
        Roles: ["DEV"],
      },
      {
        Name: "/dev_unlockAllCosmetics",
        Description: "unlocks every cosmetic for the local player",
        Roles: ["DEV"],
      },
      {
        Name: "/dev_unlockAllDisasters",
        Description: "unlocks every disaster for the local player",
        Roles: ["DEV"],
      },
      {
        Name: "/dev_unlockAllItems",
        Description: "unlocks every item for the local player",
        Roles: ["DEV"],
      },
      {
        Name: "/dev_unlockAllSpecs",
        Description: "unlocks every spec for the local player",
        Roles: ["DEV"],
      },
      {
        Name: "/debug_finish",
        Description: "triggers melee finisher",
        Roles: ["ADMIN", "DEV"],
      },
      {
        Name: "/dev_wipeData",
        Description: "is supposed to wipe player data, but as of now does nothing",
        Roles: ["DEV"],
        Bugged: true,
      },
    ],
  },
];

for (const Category of Categories) {
  Category.Commands.sort((Left, Right) =>
    Left.Name.localeCompare(Right.Name, undefined, { sensitivity: "base" }),
  );
}

export function CommandToText(Command: { Name: string }): string {
  return Command.Name;
}
