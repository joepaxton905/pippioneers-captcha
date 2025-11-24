export async function GET() {
    // Get VERSION from environment variables
    const version = process.env.VERSION || 'free';
    // console.log("Versionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn: ", version);
    // Determine if the user is on free tier
    const isFreeTier = version.toLowerCase() === 'free';

    // Return a JSON response with the tier information
    return new Response(JSON.stringify({
      isFreeTier,
      version
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }