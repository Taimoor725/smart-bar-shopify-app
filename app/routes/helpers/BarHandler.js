import { json } from "@remix-run/node"; 
import db from "../../db.server";

export async function CreateNewBar({ shop, data }) {
  const cleanedData = {
    ...data,
    sticky: data.sticky === "true",
    active: data.active === "true",
    dismissible: data.dismissible === "true",
  };

  const bar = await db.bar.create({
    data: {
      ...cleanedData,
      shop,
    },
  });

  return json({ success: true, message: "Bar Created successfully" });
}

export async function GetAllBars({ shop }) {
  const bars = await db.bar.findMany({
    where: { shop },
    orderBy: { id: "desc" }, 
  });

  return bars;
}

export async function DeleteBar(id) {
  await db.bar.delete({where:{id:id  }})
  return json({ success: true, message: "Bar deleted successfully" });
}

export async function UpdateData(data) {

  const cleanedData = {
    ...data,
    id:Number(data.id),
    sticky: data.sticky === "true",
    active: data.active === "true",
    dismissible: data.dismissible === "true",
  };

  await db.bar.update({
    where : {id:cleanedData.id} ,
    data : cleanedData
  })

  return json({success: true, message: "Bar updated successfully"})
} 

export async function ToggleActiveBar(id, active) {
  await db.bar.update({
    where: { id: Number(id) },
    data: { active },
  });

  return json({ success: true, message: `Bar ${active ? "activated" : "deactivated"} successfully` });
}