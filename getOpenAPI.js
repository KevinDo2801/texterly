export async function getOpenAI(userInput) {
    const API_ENDPOINT = 'https://api.openai.com/v1/edits'

    const API_KEY = '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'

    const data = {
        model: 'text-davinci-edit-001',
        input: userInput,
        instruction: 'Format text and Fix the spelling mistakes, not add anything',
        temperature: .55,
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(data),
    }

    try {
        const response = await fetch(API_ENDPOINT, options)
        const data = await response.json()
        const responseAI = data.choices[0].text.trim()
        return responseAI
    } catch (error) {
        return null
    }
}
