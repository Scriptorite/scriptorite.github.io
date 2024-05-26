import { ActionFormData, MessageFormData, ModalFormData } from "@minecraft/server-ui";
import { world, system } from "@minecraft/server"
import { obtainquest } from "./obtainquestfunction.js"

world.afterEvents.itemUse.subscribe(event => {
  if (event.itemStack.typeId === "redstone:scroll_quest") {
    const player = event.source
    //form code
    let form = new ActionFormData();
    form.title("§l§hClass Quest Scroll");
    form.body("§hClass Quests, §fto start your journey in class questing!");
    form.button("§l§dCLASS - Mining", "textures/blocks/cobblestone");
    form.button("§l§dCLASS - Mage", "textures/items/evocation_hat");

    form.show(player).then(r => {
      if (r.canceled) return;

      let response = r.selection;
      switch (response) {
        case 0:
          obtainquest("§l§dCLASS - Mining", "Obtain a stone pickaxe, start mining! §lReward: Mining Quest Scroll", "minecraft:stone_pickaxe", 1, "redstone:mining_quest", 1, player, true, false)
          break;

        case 1:
          obtainquest("§l§dCLASS - Mage", "Get 8 books, learn to be a master of magicks! §lReward: Mage Quest Scroll", "minecraft:book", 8, "redstone:mage_quest", 1, player, true, false)
          break;

        case 2:

          break;

        case 3:

          break;

        case 4:

          break;

        default:
      }
    }).catch(e => {
      console.error(e, e.stack);
    });
  };
});