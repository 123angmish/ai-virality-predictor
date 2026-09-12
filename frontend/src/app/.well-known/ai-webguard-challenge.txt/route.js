export async function GET() {
  return new Response('8e1aa838-2fe7-4d90-a1a2-46585ab25704', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache'
    }
  });
}
