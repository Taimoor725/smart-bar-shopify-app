// app/routes/api.bars.active.jsx
import { json } from "@remix-run/node";
import { GetAllBars } from "../helpers/BarHandler";

/**
 * Returns bars mapped to include both old & new field names so theme script can
 * accept either shape. Also includes CORS headers.
 */
export async function loader({ request }) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");

  if (!shop) {
    return json({ error: "Missing shop param" }, { status: 400 });
  }

  // GetAllBars expects an object { shop } (from your BarHandler earlier)
  const bars = await GetAllBars({ shop });

  // Map DB fields to a shape the extension expects, including fallbacks
  const mapped = bars.map((bar) => {
    return {
      // identity
      id: bar.id,
      barId: bar.id,

      // text/content
      title: bar.title ?? bar.text ?? "",

      // colors — provide both keys
      bgColor: bar.bgColor ?? bar.backgroundColor ?? "#222222",
      backgroundColor: bar.bgColor ?? bar.backgroundColor ?? "#222222",
      textColor: bar.textColor ?? "#ffffff",

      // design / style
      bgDesign: bar.bgDesign ?? bar.backgroundDesign ?? "solid",
      backgroundDesign: bar.bgDesign ?? bar.backgroundDesign ?? "solid",

      // typography
      fontStyle: bar.fontStyle ?? bar.fontFamily ?? "Inter",
      fontFamily: bar.fontStyle ?? bar.fontFamily ?? "Inter",
      fontWeight: bar.fontWeight ?? "400",
      fontSize: bar.fontSize ?? "16",

      // booleans (include both names)
      sticky: typeof bar.sticky === "boolean" ? bar.sticky : !!bar.isSticky,
      isSticky: typeof bar.sticky === "boolean" ? bar.sticky : !!bar.isSticky,
      dismissible: typeof bar.dismissible === "boolean" ? bar.dismissible : !!bar.isDismissible,
      isDismissible: typeof bar.dismissible === "boolean" ? bar.dismissible : !!bar.isDismissible,
      active: typeof bar.active === "boolean" ? bar.active : !!bar.isActive,
      isActive: typeof bar.active === "boolean" ? bar.active : !!bar.isActive,

      // page targeting — keep both names used in different versions
      page: bar.page ?? bar.targetPages ?? "All Pages",
      targetPages: bar.page ?? bar.targetPages ?? "All Pages",

      // metadata
      createdAt: bar.createdAt ?? null,
      // include original DB object (optional) for debugging
      __raw: bar,
    };
  });

  // Return with permissive CORS so Shopify storefront can fetch it
  return json(mapped, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
