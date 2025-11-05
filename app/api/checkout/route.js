export async function POST(request) {
  try {
    const { items = [], customer = {} } = await request.json()
    // Simulate processing
    await new Promise(r => setTimeout(r, 300))
    if (!items.length) {
      return new Response(JSON.stringify({ ok: false, message: 'Empty cart' }), { status: 400 })
    }
    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`
    return Response.json({ ok: true, orderId })
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, message: 'Invalid request' }), { status: 400 })
  }
}
