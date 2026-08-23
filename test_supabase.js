const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
async function test() {
  const res = await fetch(`${url}/rest/v1/rpc/hybrid_search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': key, 'Authorization': `Bearer ${key}` },
    body: JSON.stringify({ query_embedding: new Array(1536).fill(0), query_text: "test", match_count: 5 })
  });
  console.log(res.status, await res.text());
}
test();
