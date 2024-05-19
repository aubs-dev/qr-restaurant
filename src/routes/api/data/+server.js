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
            // TODO: Images aren't removed?
            const { error_1 } = await supabase.storage
                .from("menu-images")
                .remove([fd.remove_id]);
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
            const { error_0 } = await supabase
                .from("categories")
                .delete()
                .eq("id", fd.remove_id);

            // TODO: This doesn't delete the image associated with the item
            const { error_1 } = await supabase
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
