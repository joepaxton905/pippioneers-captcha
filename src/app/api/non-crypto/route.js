export async function GET() {
    // Get VERSION from environment variables
    const ncpVersion = process.env.NCP;
    if(!ncpVersion){
      const isNcpversion = false;

      return new Response(JSON.stringify({
        isNcpversion,
        ncpVersion
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
}
const isNcpversion = true

    return new Response(JSON.stringify({
        isNcpversion,
        ncpVersion
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }