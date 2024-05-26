import { MessageFormData, ActionFormData } from "@minecraft/server-ui";
import { world, system, Player, ItemStack } from "@minecraft/server";
import * as minecraft_main_server from "@minecraft/server";

function obtainquest(title, body, type, amount, reward, rewardamount, constplayer, notstoryline, decrementstack) {
  var form
  let meetrequirement = "no"
  const player = constplayer
  if (player.getDynamicProperty('mte_startedquest') === undefined) {
    player.setDynamicProperty('mte_startedquest', "no")
  }
  if (player.getDynamicProperty('mte_questcooldown') === true) {
    player.sendMessage("§l§cQuest cooldown, please wait...")
    system.runTimeout(() => {
      player.setDynamicProperty('mte_questcooldown', false)
    }, 320);
  }
  if (player.getDynamicProperty('mte_startedquest') === "yes" && player.getDynamicProperty('mte_currentquestname') !== title) {
    player.sendMessage("§l§cPlease complete your current quest, " + player.getDynamicProperty('mte_currentquestname'))
  }
  else if (player.getDynamicProperty('mte_startedquest') !== undefined) {

    if (player.getDynamicProperty('mte_startedquest') === "no" && player.getDynamicProperty('mte_questcooldown') !== true) {
      form = new MessageFormData();
      form.title(title)
      form.body(body)
      form.button1("§l§cDecline")
      form.button2("§l§aAccept")
    }
    else if (player.getDynamicProperty('mte_startedquest') === "yes") {
      form = new ActionFormData();
      form.title(title + " - §lIN PROGRESS")
      form.body(body)
      form.button("§l§aCheck for completion", "textures/ui/filledStar")
      form.button("§l§cAbort quest", "textures/ui/cross_no")
      form.button("§cBack", "textures/ui/back_no")
    }
    form.show(player).then(r => {
      if (r.selection === 0 && player.getDynamicProperty('mte_startedquest') === "no") {
        player.sendMessage("Denied quest")
        return;
      }

      if (player.getDynamicProperty('mte_startedquest') === "yes" && player.getDynamicProperty('mte_currentquestname') === title) {
        if (player.runCommand('testfor @s[hasitem={item=' + type + ' , quantity =' + amount + '..}]').successCount) {
          meetrequirement = "yes"
        }
      }
      let response = r.selection
      switch (response) {
        case 0:
          if (meetrequirement == "no") {
            player.sendMessage("You did not get the items, quest is still in progress")
            return;
          }

          else if (meetrequirement == "yes") {
            player.sendMessage("§l§aCompleted quest! §dYou have been given " + reward)
            player.runCommandAsync("give @s " + reward + " " + rewardamount);
            player.runCommandAsync("particle redstone:confetti ~ ~ ~");
            player.runCommandAsync("playsound redstone.complete_quest");
            player.setDynamicProperty('mte_startedquest', "no");
            player.setDynamicProperty('mte_questcooldown', true);
            if (decrementstack == true) {
              let equipment = player.getComponent("minecraft:equippable");
              let item = equipment.getEquipment(minecraft_main_server.EquipmentSlot.Mainhand);
              if (item.amount === 1) player.getComponent('equippable').setEquipment('Mainhand', undefined);
              else {
                item.amount--;
                player.getComponent('equippable').setEquipment('Mainhand', item)
              };
            }
            if (notstoryline == false) {
              player.sendMessage("Congrats! §lYou've completed our first and only storyline! We must thank you for playing our mod, without you this project would be wasted effort :) §aDo watch out for future updates!")
            }
            return;
          }
          break;

        case 1:
          if (player.getDynamicProperty('mte_startedquest') === "yes") {
            player.sendMessage("§l§cAborted " + title);
            player.setDynamicProperty('mte_startedquest', "aborted");
          }
          break;

        case 2:
          player.sendMessage("§lClosed the scroll")
          break;

        default:
      }

      if ((r.selection === 1 && player.getDynamicProperty('mte_startedquest') === "no") == true) {
        player.sendMessage("§aQuest accepted, " + body);
        player.setDynamicProperty('mte_startedquest', "yes");
        player.setDynamicProperty('mte_currentquestname', title);
      }
      if (player.getDynamicProperty('mte_startedquest') === "aborted") {
        player.setDynamicProperty('mte_startedquest', "no")
      }
    }
    ).catch(e => {
      console.error(e, e.stack);
    });
  };
}

export { obtainquest };