"use strict";

(function () 
{
	let modules = Modules;
	const moduleName = "ModuleInventory";
	if (modules.hasOwnProperty(moduleName))
		throw new Error("Already have " + moduleName + " in Modules");
	
	let m = {};
	modules[moduleName] = m;
	
	let data = {}; // Serializable
	data.idCounter = 0;
	data.inventories = {};
	
	m.Get = function(id)
	{
		return data.inventories[id];
	};
	
	m.ToJson = function()
	{
		return JSON.stringify(data);
	};
	
	function SetDefaultValue(options, key, value)
	{
		if (options[key] === undefined)
			options[key] = value;
	}
	
	function InventoryContentUpdated(id)
	{
		let inv = m.Get(id);
		
		let capacity = 0;
		for (let item in inv.items)
		{
			let v = m.GetItemCapacity(item);
			capacity += v * inv.items[item].count;
		}
		
		inv.capacity.current = capacity;
	}
	
	m.Create = function(options)
	{
		if (options === undefined)
			options = {};
	
		SetDefaultValue(options, "capacityFull", 100);
	
		let inv = {};
		inv.id = data.idCounter;
		data.idCounter++;
		
		inv.items = {};
		
		inv.capacity = {};
		inv.capacity.current = 0;
		inv.capacity.full = options.capacityFull;
		
		data.inventories[inv.id] = inv;
		
		return inv;
	};
	
	m.Put = function(id, item, count)
	{
		let inv = m.Get(id);
		
		let itemData = inv.items[item];
		if (itemData === undefined)
		{
			itemData = {};
			itemData.count = 0;
			inv.items[item] = itemData;
		}
		
		let capacityItem = m.GetItemCapacity(item);		
		let capacityLeft = inv.capacity.full - inv.capacity.current;
		let itemsToAdd = Math.floor(capacityLeft / capacityItem);
		
		if (itemsToAdd > count)
			itemsToAdd = count;
		
		itemData.count += itemsToAdd;
		
		InventoryContentUpdated(id);
		
		return itemsToAdd;
	};
	
	m.Show = function(id)
	{
		let inv = m.Get(id);
	};
}());