import { uuid } from 'uuidv4';
import axios from 'axios';

interface IChatBotResponse {
  message: string;
  id : string;
}

class ChatBot {
  private token: string;
  private parentUUID: string;
  private conversationId: string | null = null;

  constructor(token: string) {
    this.token = token;
    this.conversationId = null;
    this.parentUUID = uuid();
  }

  public async sendPrompt(message: string): Promise<IChatBotResponse> {
    const data = {
      "action":"next",
      "messages":[{
            "id": uuid(),
            "role":"user",
            "content":{"content_type":"text","parts":[message]}
      }],
      "conversation_id": this.conversationId,
      "parent_message_id": this.parentUUID,
      "model":"text-davinci-002-render"
    };

    try {
      const response = await axios.post('https://chat.openai.com/backend-api/conversation', data, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.token,
        }
      });

      const splitData = response.data.split(/\r?\n/);
      let resultData: any = splitData[splitData.length - 7];
      resultData = resultData.replace("data: ", "");

      try {
        const json = JSON.parse(resultData);

        this.parentUUID = json.message.id;
        this.conversationId = json.conversation_id;

        const chatBotResponse: IChatBotResponse = {
          message: json.message.content.parts[0],
          id: json.message.id
        };
        
        return chatBotResponse;
      } catch (error) {
        throw error;
      }
      
    } catch (error) {
      throw error;
    }
  }
}

export default ChatBot;