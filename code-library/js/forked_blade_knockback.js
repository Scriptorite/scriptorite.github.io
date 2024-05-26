import { system, world, Entity, Player } from '@minecraft/server'

world.afterEvents.entityHitEntity.subscribe((event) => {
	let damagingEntity = event.damagingEntity;
	const player = event.damagingEntity
	if ((damagingEntity.typeId == 'minecraft:player' && damagingEntity.getComponent('inventory').container.getItem(player.selectedSlot).typeId == 'redstone:forked_blade') == true) {
		const entity = event.hitEntity;
		entity.clearVelocity();
		entity.applyImpulse({ x: 0, y: 0.8, z: 0 });
	}
})