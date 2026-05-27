// import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// Deno.serve(async (req: Request) => {
//   const { name } = await req.json();
//   const data = {
//     message: `Hello ${name || 'World'}!`,
//     timestamp: new Date().toISOString(),
//   };

//   return new Response(JSON.stringify(data), {
//     headers: { 'Content-Type': 'application/json' },
//   });
// });
