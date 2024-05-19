import { SUPABASE_URL } from "$env/static/private";
import supabase from "$lib/db";

export async function POST({ request }) {
    const fd = await request.json();

    if (fd.table_id === 0) {
        if (fd.table_mode === 0) {
            const { error } = await supabase.from("menu").insert({
                img_url: fd.img_url,
                name: fd.menu_name,
                price: fd.menu_price,
                category_id: fd.category_id,
            });
        } else if (fd.table_mode === 1) {
            const { error_0 } = await supabase
                .from("menu")
                .delete()
                .eq("img_url", fd.remove_id);

            const basePath = `${SUPABASE_URL}/storage/v1/object/public/menu-images/`;
            const filename = fd.remove_id.replace(basePath, "");

            const { error_1 } = await supabase.storage
                .from("menu-images")
                .remove([filename]);
        } else {
            console.error("Incorrect table_mode!");
        }
    } else if (fd.table_id === 1) {
        if (fd.table_mode === 0) {
            const { error } = await supabase.from("categories").insert({
                name: fd.category_name,
                amount: fd.category_amount,
            });
        } else if (fd.table_mode === 1) {
            // Remove all images
            const { data, error_0 } = await supabase
                .from("menu")
                .select("*")
                .eq("category_id", fd.remove_id);

            let imagesToRemove = [];
            for (const item of data) {
                const basePath = `${SUPABASE_URL}/storage/v1/object/public/menu-images/`;
                const filename = item.img_url.replace(basePath, "");

                imagesToRemove.push(filename);
            }

            const { error_1 } = await supabase.storage
                .from("menu-images")
                .remove(imagesToRemove);

            // Remove all items
            const { error_2 } = await supabase
                .from("categories")
                .delete()
                .eq("id", fd.remove_id);

            const { error_3 } = await supabase
                .from("menu")
                .delete()
                .eq("category_id", fd.remove_id);
        } else {
            console.error("Incorrect table_mode!");
        }
    } else {
        console.error("Incorrect table_id!");
    }

    return new Response(null, { status: 200 });
}
