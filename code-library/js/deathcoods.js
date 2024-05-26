import { world, system, Player } from "@minecraft/server";

world.afterEvents.entityDie.subscribe(event => {
	if (event.deadEntity.typeId == 'minecraft:player') {
		const player = event.deadEntity;
		player.sendMessage(`§a${player.nameTag} §rdied at: §l§e${Math.round(player.location.x)}, ${Math.round(player.location.y)}, ${Math.round(player.location.z)}`)
	}
}
) 