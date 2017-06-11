"use strict";
let Modules = {};

let ItemsData = 
{
	"item_battery1": 
	{
		capacity: 2,
		image: "images/item_battery1.png"
	},
	
	"item_airtank1":
	{
		capacity: 3,
		image: "images/item_airtank1.png"
	}
}

function GetItemImagePath(item)
{
	return ItemsData[item].image;
}

function GetItemCapacity(item)
{
	return ItemsData[item].capacity;
}

function Example()
{
	let inventory = Modules.ModuleInventory;
	inventory.GetItemImagePath = GetItemImagePath;
	inventory.GetItemCapacity = GetItemCapacity;
	
	let id = inventory.Create().id;	
	inventory.Put(id, "item_battery1", 5);
	inventory.Put(id, "item_airtank1", 3);
	
	let addedItems = inventory.Put(id, "item_airtank1", 100);
	addedItems = inventory.Put(id, "item_airtank1", 100);
	
	inventory.Show(id);
	
	
	
	console.log(inventory.ToJson());
}