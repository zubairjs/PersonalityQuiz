const API_KEY =
  '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';

const hobbyInput = document.getElementById('hobby');
const characterInput = document.getElementById('character');
const plansInput = document.getElementById('plans');
const resultDiv = document.getElementById('result');

async function getPersonality() {
  const favHobby = hobbyInput.value;
  const leastFavCharacter = characterInput.value;
  const plans = plansInput.value;

  resultDiv.innerHTML = 'Loading...';
  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'openai/gpt-oss-120b',
      messages: [
        {
          role: 'user',
          content: `You are a personality quiz engine based on a deck of cards. Based only on the answers below, assign ONE personality: - Suit: Hearts, Diamonds, Clubs, or Spades - Type: Ace, King, Queen, Jack, or Joker Answers: Tomorrow's plan: ${plans} Favorite hobby: ${favHobby} Least favorite character: ${leastFavCharacter} Give: 1) The final card (e.g. "Queen of Hearts") 2) A brief 2-3 sentence explanation Rules: - Be decisive (no multiple options) - Keep it short - Output plain text only - No formatting, no lists, no emojis`,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  console.log({ response });
  const personalityMessage = response.data.choices[0].message.content;
  resultDiv.innerHTML = personalityMessage;
}
