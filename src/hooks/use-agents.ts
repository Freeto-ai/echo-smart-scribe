
import { useState } from 'react';
import { Agent } from '@/types/agent';

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([
    { 
      id: '1', 
      name: 'Agent 1', 
      isActive: true, 
      prompt: 'You are a helpful AI assistant. Answer questions accurately and concisely.',
      settings: { creative: true, precise: false, helpful: true } 
    },
    { 
      id: '2', 
      name: 'Agent 2', 
      isActive: false, 
      prompt: 'You are a creative AI assistant. Focus on generating innovative ideas and solutions.',
      settings: { creative: false, precise: true, helpful: true } 
    },
    { 
      id: '3', 
      name: 'Agent 3', 
      isActive: false, 
      prompt: 'You are a precise AI assistant. Prioritize accuracy and detailed explanations.',
      settings: { creative: true, precise: true, helpful: false } 
    },
  ]);

  const toggleAgentActive = (agentId: string) => {
    setAgents(agents.map(agent => ({
      ...agent,
      isActive: agent.id === agentId ? true : false
    })));
  };

  const toggleSetting = (agentId: string, setting: keyof Agent['settings']) => {
    setAgents(agents.map(agent => {
      if (agent.id === agentId) {
        return {
          ...agent,
          settings: {
            ...agent.settings,
            [setting]: !agent.settings[setting]
          }
        };
      }
      return agent;
    }));
  };

  const updateAgentPrompt = (agentId: string, prompt: string) => {
    setAgents(agents.map(agent => {
      if (agent.id === agentId) {
        return {
          ...agent,
          prompt
        };
      }
      return agent;
    }));
  };

  return {
    agents,
    toggleAgentActive,
    toggleSetting,
    updateAgentPrompt
  };
}
