# CHAT GPT API
You can use chatgpt through javascript through this package.

## Features

- Send prompt and receive result

## Installation
```sh
npm install chatgpt-api --save
```

## Get your session token
Go to https://chat.openai.com/chat and log in or sign up
1. Open console with `F12`
2. Open `Application` tab > Cookies
![image](https://user-images.githubusercontent.com/36258159/205494773-32ef651a-994d-435a-9f76-a26699935dac.png)
3. Copy the value for `__Secure-next-auth.session-token` and paste it into authToken variable
4. Save the modified file to `config.json` (In the current working directory)

## How to use
```sh
import ChatBot from "chatgpt-api";

console.log(response);

async function main() {
    // check Get your session token section
    const authToken = "YOUR_AUTH_TOKEN";
    const chat = new ChatBot(authToken)
  
    try {
        let response = await chat.sendPrompt("how to make pizza");
        console.log(response);
    } catch (error) {
        // when authToken is unaithorized
        console.log(error);
    }
}
```
Response
```sh
{
  message: 'To make a pizza, you will need the following ingredients:\n' +
    '\n' +
    '- 1 pound of pizza dough\n' +
    '- 1/2 cup of tomato sauce\n' +
    '- 8 ounces of mozzarella cheese, grated\n' +
    '- your choice of toppings (such as mushrooms, onions, olives, pepperoni, etc.)\n' +
    '\n' +
    'Here are the steps to make a pizza:\n' +
    '\n' +
    '1. Preheat your oven to 450 degrees Fahrenheit (230 degrees Celsius).\n' +
    '\n' +
    '2. Roll out the pizza dough on a floured surface to your desired shape and thickness.\n' +
    '\n' +
    'Enjoy your homemade pizza!',
  id: '2f82dd65-be02-454c-97aa-b40c9c1f2a53'
}
```