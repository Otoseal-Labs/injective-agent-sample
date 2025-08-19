import { InjectiveAgentKit, ModelProvider, createInjectiveTools } from "@otoseal/injective-agent-kit";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatCohere } from "@langchain/cohere";
import * as dotenv from "dotenv";

// Ensure environment variables are loaded
dotenv.config();

/**
 * Check for required environment variables
 */
export function checkRequiredEnvVars(): void {
    const missingVars: string[] = [];
    const requiredVars = ["COHERE_API_KEY", "PRIVATE_KEY"];
  
    requiredVars.forEach((varName) => {
      if (!process.env[varName]) {
        missingVars.push(varName);
      }
    });
  
    if (missingVars.length > 0) {
      console.error("Error: Required environment variables are not set");
      missingVars.forEach((varName) => {
        console.error(`${varName}=your_${varName.toLowerCase()}_here`);
      });
      process.exit(1);
    }
}

/**
 * Set up the Injective Agent
 */
export async function setupAgent() {
  try {
    
    const llm = new ChatCohere({
      model: "command-r-plus",
      temperature: 0,
    });
    const agentInstance = new InjectiveAgentKit(
      process.env.PRIVATE_KEY!,
      ModelProvider.COHERE,
    );
    
    const agentTools = createInjectiveTools(agentInstance);

    const memory = new MemorySaver();
    const agentConfig = { configurable: { thread_id: "Injective Agent Kit!" } };

    const agent = createReactAgent({
      llm,
      tools: agentTools,
      checkpointSaver: memory,
      messageModifier: `
        You are a lively and witty agent, designed to interact onchain using the Injective Agent Kit. 
        You have a knack for humor and enjoy making the interaction enjoyable while being efficient. 
        If there is a 5XX (internal) HTTP error code, humorously suggest the user try again later. 
        All users' wallet infos are already provided on the tool kit. If someone asks you to do something you
        can't do with your currently available tools, respond with a playful apology and encourage them to implement it
        themselves using the Injective Agent Kit repository that they can find on https://github.com/Otoseal-Labs/injective-agent-kit. Suggest they visit the Twitter account https://x.com/otoseal for more information, perhaps with a light-hearted comment about the wonders of the internet. Be concise, helpful, and sprinkle in some humor with your responses. Refrain from restating your tools' descriptions unless it is explicitly requested.
        If the user tries to exit the conversation, cheerfully inform them that by typing "bye" they can end the conversation, maybe with a friendly farewell message.

        === Formatting Rule ===
        - If the tool returns a field as a string that represents a number (e.g. "0.299999999999999999"),
          you must display the string exactly as returned. Do not round, shorten, or reformat it.
        - If the tool returns a field as a number (e.g. 12345), you can display it normally.
      `,
    });

    return { agent, config: agentConfig };
  } catch (error) {
    console.error("Failed to initialize agent:", error);
    throw error;
  }
}