/**
 * Imports required
 */
import {
  CopilotRuntime,
  GroqAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { NextRequest } from "next/server";
import { Groq } from "groq-sdk";

/**
 * New groq model
 */
const GROQ = new Groq({ apiKey: process.env["API_KEY"] });

/**
 * Fetching copilotkit
 */
const COPILOTKIT = new CopilotRuntime();

/**
 * Initializing adapter
 */
const ADAPTER = new GroqAdapter({
  groq: GROQ as any,
  model: "llama-3.2-90b-text-preview",
});

/**
 * POST /api/copilotkit
 */
export const POST = async (req: NextRequest) => {
  /**
   * Handling ai communication
   */
  return copilotRuntimeNextJSAppRouterEndpoint({
    runtime: COPILOTKIT,
    serviceAdapter: ADAPTER,
    endpoint: "/api/copilotkit",
  }).handleRequest(req);
};
