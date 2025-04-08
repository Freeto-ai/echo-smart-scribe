
export interface AgentSettings {
  creative: boolean;
  precise: boolean;
  helpful: boolean;
}

export interface Agent {
  id: string;
  name: string;
  isActive: boolean;
  prompt: string;
  settings: AgentSettings;
}
