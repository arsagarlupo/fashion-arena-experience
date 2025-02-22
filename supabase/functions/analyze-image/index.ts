
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
    if (!GEMINI_API_KEY) {
      throw new Error('Missing Gemini API key')
    }

    const formData = await req.formData()
    const file = formData.get('image') as File
    
    if (!file) {
      throw new Error('No image provided')
    }

    // Convert the file to base64
    const arrayBuffer = await file.arrayBuffer()
    const base64Image = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                inline_data: {
                  mime_type: file.type,
                  data: base64Image
                }
              },
              {
                text: "Describe this garment in detail, including its style, color, pattern, and any distinctive features. Also suggest what occasions it would be suitable for."
              }
            ]
          }]
        })
      }
    )

    const data = await response.json()
    
    return new Response(
      JSON.stringify(data),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
