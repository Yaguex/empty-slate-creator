import openai from './src/openaiClient'; // Adjust the path if necessary

async function testOpenAI() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say hello to ChatGPT!" }],
    });

    console.log('Response from OpenAI:', response.choices[0].message.content);
  } catch (error) {
    console.error('Error with OpenAI Client:', error);
  }
}

testOpenAI();