import { system, world, Entity, Player } from '@minecraft/server'

world.afterEvents.itemUse.subscribe(({ source, itemStack }) => {
  if (itemStack.typeId === "redstone:tungsten_detector") {
    // Ray cast from the player's position in the view direction
    const entities = source.getEntitiesFromViewDirection(); // Specify the range (in blocks) as needed

    // Count the total number of entities and the number of players
    const players = entities.filter(e => e.typeId === 'minecraft:player');
    source.sendMessage(`Total entities in view: ${entities.length}`);
  }
});