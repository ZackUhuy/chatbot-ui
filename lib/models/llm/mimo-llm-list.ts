import { LLM } from "@/types"

const MIMO_PLATFORM_LINK = "https://token-plan-sgp.xiaomimimo.com"

// Mimo Models
const MIMO_V2_5: LLM = {
  modelId: "mimo-v2.5",
  modelName: "Mimo v2.5",
  provider: "mimo",
  hostedId: "mimo-v2.5",
  platformLink: MIMO_PLATFORM_LINK,
  imageInput: false
}

export const MIMO_LLM_LIST: LLM[] = [MIMO_V2_5]
